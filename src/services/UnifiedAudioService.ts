import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { midiSynthService } from './MidiSynthService';

export type AudioMode = 'midi' | 'wav';

/**
 * Service audio unifié qui gère à la fois les sons MIDI synthétiques et les fichiers WAV
 */
export class UnifiedAudioService {
  private sounds: Map<string, Sound> = new Map();
  private isInitialized = false;
  private currentMode: AudioMode = 'midi'; // Mode MIDI par défaut
  private wavSoundsLoaded = false;

  async initialize(mode: AudioMode = 'midi') {
    if (this.isInitialized && this.currentMode === mode) return;

    try {
      this.currentMode = mode;

      if (mode === 'midi') {
        await midiSynthService.initialize();
      } else {
        // Initialiser l'audio pour les fichiers WAV
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }

      this.isInitialized = true;
      console.log(`Unified Audio Service initialized in ${mode} mode`);
    } catch (error) {
      console.error('Failed to initialize unified audio:', error);
    }
  }

  async switchMode(mode: AudioMode) {
    if (this.currentMode === mode) return;

    console.log(`Switching audio mode from ${this.currentMode} to ${mode}`);
    this.currentMode = mode;

    if (mode === 'midi') {
      await midiSynthService.initialize();
    }
  }

  getMode(): AudioMode {
    return this.currentMode;
  }

  async loadSound(id: string, source: any): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync(source);
      this.sounds.set(id, sound);
      this.wavSoundsLoaded = true;
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
    }
  }

  async loadAllWavSounds(soundSources: Map<string, any>): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      for (const [id, source] of soundSources.entries()) {
        await this.loadSound(id, source);
      }
      console.log(`Loaded ${soundSources.size} WAV sounds`);
    } catch (error) {
      console.error('Failed to load WAV sounds:', error);
    }
  }

  hasWavSounds(): boolean {
    return this.wavSoundsLoaded && this.sounds.size > 0;
  }

  async playSound(id: string): Promise<void> {
    try {
      if (this.currentMode === 'midi') {
        await midiSynthService.playSound(id);
      } else {
        const sound = this.sounds.get(id);
        if (sound) {
          await sound.replayAsync();
        } else {
          console.warn(`WAV sound not loaded for ${id}, falling back to MIDI`);
          await midiSynthService.playSound(id);
        }
      }
    } catch (error) {
      console.error(`Failed to play sound ${id}:`, error);
    }
  }

  async unloadAll(): Promise<void> {
    for (const [id, sound] of this.sounds.entries()) {
      try {
        await sound.unloadAsync();
      } catch (error) {
        console.error(`Failed to unload sound ${id}:`, error);
      }
    }
    this.sounds.clear();
    this.wavSoundsLoaded = false;
    midiSynthService.dispose();
  }

  async unloadSound(id: string): Promise<void> {
    const sound = this.sounds.get(id);
    if (sound) {
      try {
        await sound.unloadAsync();
        this.sounds.delete(id);
      } catch (error) {
        console.error(`Failed to unload sound ${id}:`, error);
      }
    }
  }
}

export const unifiedAudioService = new UnifiedAudioService();
