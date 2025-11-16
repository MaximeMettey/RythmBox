import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Preset } from '../types';

interface PresetSelectorProps {
  presets: Preset[];
  onSelectPreset: (preset: Preset) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  presets,
  onSelectPreset,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presets</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.presetsContainer}>
          {presets.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              style={styles.presetButton}
              onPress={() => onSelectPreset(preset)}
            >
              <Text style={styles.presetName}>{preset.name}</Text>
              <Text style={styles.presetGenre}>{preset.genre}</Text>
              <Text style={styles.presetTempo}>{preset.tempo} BPM</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  presetsContainer: {
    flexDirection: 'row',
  },
  presetButton: {
    backgroundColor: '#2a2a3e',
    padding: 16,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  presetName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  presetGenre: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  presetTempo: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
  },
});
