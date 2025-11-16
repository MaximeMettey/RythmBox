import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Text } from 'react-native';
import { unifiedAudioService, AudioMode } from './src/services/UnifiedAudioService';
import { storageService } from './src/services/StorageService';
import { useDrumMachine } from './src/hooks/useDrumMachine';
import { Sequencer } from './src/components/Sequencer';
import { Controls } from './src/components/Controls';
import { PresetSelector } from './src/components/PresetSelector';
import { PatternManager } from './src/components/PatternManager';
import { AudioModeToggle } from './src/components/AudioModeToggle';
import { PRESETS, getEmptyPattern } from './src/presets';
import { Pattern } from './src/types';

export default function App() {
  const [savedPatterns, setSavedPatterns] = useState<Pattern[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [audioMode, setAudioMode] = useState<AudioMode>('midi');
  const [hasWavSounds, setHasWavSounds] = useState(false);

  const {
    state,
    togglePlay,
    stop,
    setTempo,
    toggleStep,
    setPattern,
    clearPattern,
  } = useDrumMachine(getEmptyPattern(), 120);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize audio in MIDI mode by default
        await unifiedAudioService.initialize('midi');

        // Try to load WAV samples if they exist
        // Uncomment and use these lines when you have WAV files:
        /*
        const soundSources = new Map([
          ['kick', require('./assets/sounds/kick.wav')],
          ['snare', require('./assets/sounds/snare.wav')],
          ['hihat', require('./assets/sounds/hihat.wav')],
          ['clap', require('./assets/sounds/clap.wav')],
          ['tom', require('./assets/sounds/tom.wav')],
          ['cymbal', require('./assets/sounds/cymbal.wav')],
        ]);
        await unifiedAudioService.loadAllWavSounds(soundSources);
        setHasWavSounds(unifiedAudioService.hasWavSounds());
        */

        // Load saved patterns
        const patterns = await storageService.loadPatterns();
        setSavedPatterns(patterns);

        // Load saved settings
        const settings = await storageService.loadSettings();
        setTempo(settings.tempo);

        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsReady(true); // Continue anyway
      }
    };

    initialize();

    return () => {
      unifiedAudioService.unloadAll();
    };
  }, []);

  const handleSavePattern = async (name: string) => {
    try {
      const newPattern: Pattern = {
        ...state.pattern,
        id: `custom-${Date.now()}`,
        name,
      };
      await storageService.savePattern(newPattern);
      const patterns = await storageService.loadPatterns();
      setSavedPatterns(patterns);
    } catch (error) {
      console.error('Failed to save pattern:', error);
    }
  };

  const handleLoadPattern = (pattern: Pattern) => {
    setPattern(pattern);
  };

  const handleDeletePattern = async (patternId: string) => {
    try {
      await storageService.deletePattern(patternId);
      const patterns = await storageService.loadPatterns();
      setSavedPatterns(patterns);
    } catch (error) {
      console.error('Failed to delete pattern:', error);
    }
  };

  const handleSelectPreset = (preset: any) => {
    setPattern(preset.pattern);
    setTempo(preset.tempo);
  };

  const handleTempoChange = async (tempo: number) => {
    setTempo(tempo);
    await storageService.saveTempo(tempo);
  };

  const handleAudioModeChange = async (mode: AudioMode) => {
    await unifiedAudioService.switchMode(mode);
    setAudioMode(mode);
  };

  if (!isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading RythmBox...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>RythmBox</Text>
          <Text style={styles.subtitle}>Beat Maker</Text>

          <AudioModeToggle
            currentMode={audioMode}
            hasWavSounds={hasWavSounds}
            onModeChange={handleAudioModeChange}
          />

          <PresetSelector
            presets={PRESETS}
            onSelectPreset={handleSelectPreset}
          />

          <Controls
            isPlaying={state.isPlaying}
            tempo={state.tempo}
            onTogglePlay={togglePlay}
            onStop={stop}
            onTempoChange={handleTempoChange}
            onClear={clearPattern}
          />

          <Sequencer
            pattern={state.pattern}
            currentStep={state.currentStep}
            onToggleStep={toggleStep}
          />

          <PatternManager
            currentPattern={state.pattern}
            savedPatterns={savedPatterns}
            onSavePattern={handleSavePattern}
            onLoadPattern={handleLoadPattern}
            onDeletePattern={handleDeletePattern}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});
