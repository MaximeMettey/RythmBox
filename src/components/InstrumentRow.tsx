import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StepButton } from './StepButton';
import { STEPS } from '../types';

interface InstrumentRowProps {
  name: string;
  color: string;
  steps: boolean[];
  currentStep: number;
  onToggleStep: (stepIndex: number) => void;
}

export const InstrumentRow: React.FC<InstrumentRowProps> = ({
  name,
  color,
  steps,
  currentStep,
  onToggleStep,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <View style={[styles.colorIndicator, { backgroundColor: color }]} />
        <Text style={styles.label}>{name}</Text>
      </View>
      <View style={styles.stepsContainer}>
        {steps.map((active, index) => (
          <StepButton
            key={index}
            active={active}
            current={currentStep === index}
            color={color}
            onPress={() => onToggleStep(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stepsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
