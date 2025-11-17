import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface ControlsProps {
  isPlaying: boolean;
  tempo: number;
  onTogglePlay: () => void;
  onStop: () => void;
  onTempoChange: (tempo: number) => void;
  onClear: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  tempo,
  onTogglePlay,
  onStop,
  onTempoChange,
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, isPlaying && styles.playingButton]}
          onPress={onTogglePlay}
        >
          <Text style={styles.buttonText}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={onStop}
        >
          <Text style={styles.buttonText}>⏹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={onClear}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tempoContainer}>
        <Text style={styles.tempoLabel}>Tempo: {Math.round(tempo)} BPM</Text>
        <Slider
          style={styles.slider}
          minimumValue={40}
          maximumValue={200}
          value={tempo}
          onValueChange={onTempoChange}
          minimumTrackTintColor="#4ECDC4"
          maximumTrackTintColor="#2a2a3e"
          thumbTintColor="#4ECDC4"
        />
      </View>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  playingButton: {
    backgroundColor: '#FF6B6B',
  },
  stopButton: {
    backgroundColor: '#FFA07A',
  },
  clearButton: {
    backgroundColor: '#6C5CE7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tempoContainer: {
    marginTop: 8,
  },
  tempoLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
