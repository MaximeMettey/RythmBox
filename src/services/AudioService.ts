import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

export class AudioService {
  private sounds: Map<string, Sound> = new Map();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        // Configuration pour réduire la latence
        interruptionModeIOS: 1, // DoNotMix
        interruptionModeAndroid: 1, // DoNotMix
      });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  async loadSound(id: string, source: any): Promise<void> {
    try {
      const { sound } = await Audio.Sound.createAsync(
        source,
        {
          shouldPlay: false,
          isLooping: false,
          progressUpdateIntervalMillis: 1000, // Minimal updates
        },
        null, // No status updates
        false // Don't download in background
      );
      this.sounds.set(id, sound);
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
    }
  }

  async playSound(id: string): Promise<void> {
    try {
      const sound = this.sounds.get(id);
      if (sound) {
        // Méthode optimisée : fire-and-forget pour réduire la latence au maximum
        // On ne bloque pas avec await, on lance les commandes immédiatement
        sound.setPositionAsync(0).catch(() => {});
        sound.playAsync().catch(() => {});
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

export const audioService = new AudioService();
