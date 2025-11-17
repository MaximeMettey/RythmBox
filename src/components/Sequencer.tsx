import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { InstrumentRow } from './InstrumentRow';
import { Pattern, INSTRUMENTS } from '../types';

interface SequencerProps {
  pattern: Pattern;
  currentStep: number;
  onToggleStep: (instrumentIndex: number, stepIndex: number) => void;
}

export const Sequencer: React.FC<SequencerProps> = ({
  pattern,
  currentStep,
  onToggleStep,
}) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.container}>
      <View>
        {INSTRUMENTS.map((instrument, instrumentIndex) => (
          <InstrumentRow
            key={instrument.id}
            name={instrument.name}
            color={instrument.color}
            steps={pattern.steps[instrumentIndex]}
            currentStep={currentStep}
            onToggleStep={(stepIndex) => onToggleStep(instrumentIndex, stepIndex)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
});
