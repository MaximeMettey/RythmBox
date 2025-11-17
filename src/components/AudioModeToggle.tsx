import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AudioMode } from '../services/UnifiedAudioService';

interface AudioModeToggleProps {
  currentMode: AudioMode;
  hasWavSounds: boolean;
  onModeChange: (mode: AudioMode) => void;
}

export const AudioModeToggle: React.FC<AudioModeToggleProps> = ({
  currentMode,
  hasWavSounds,
  onModeChange,
}) => {
  const isMidiAvailable = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mode Audio</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            styles.leftButton,
            currentMode === 'midi' && styles.activeButton,
            !isMidiAvailable && styles.disabledButton,
          ]}
          onPress={() => isMidiAvailable && onModeChange('midi')}
          disabled={!isMidiAvailable}
        >
          <Text
            style={[
              styles.toggleText,
              currentMode === 'midi' && styles.activeText,
              !isMidiAvailable && styles.disabledText,
            ]}
          >
            🎹 MIDI
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            styles.rightButton,
            currentMode === 'wav' && styles.activeButton,
            !hasWavSounds && styles.disabledButton,
          ]}
          onPress={() => hasWavSounds && onModeChange('wav')}
          disabled={!hasWavSounds}
        >
          <Text
            style={[
              styles.toggleText,
              currentMode === 'wav' && styles.activeText,
              !hasWavSounds && styles.disabledText,
            ]}
          >
            🔊 WAV
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        {currentMode === 'midi'
          ? 'Sons synthétiques générés en temps réel'
          : 'Samples audio réalistes'}
      </Text>

      {!isMidiAvailable && (
        <Text style={styles.warning}>
          ⚠️ Mode MIDI disponible uniquement sur Web. Sur mobile, utilisez le mode WAV.
        </Text>
      )}

      {!hasWavSounds && (
        <Text style={styles.info}>
          ℹ️ Pour utiliser le mode WAV, ajoutez des fichiers audio dans assets/sounds/
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2a2a3e',
    alignItems: 'center',
  },
  leftButton: {
    borderRightWidth: 0.5,
    borderRightColor: '#3a3a4e',
  },
  rightButton: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#3a3a4e',
  },
  activeButton: {
    backgroundColor: '#4ECDC4',
  },
  disabledButton: {
    opacity: 0.5,
  },
  toggleText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  disabledText: {
    color: '#555',
  },
  description: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  info: {
    color: '#FFA07A',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  warning: {
    color: '#FFD700',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
});
