import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface StepButtonProps {
  active: boolean;
  current: boolean;
  color: string;
  onPress: () => void;
}

export const StepButton: React.FC<StepButtonProps> = ({ active, current, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        active && { backgroundColor: color },
        current && styles.current,
      ]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2a2a3e',
    margin: 2,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  current: {
    borderColor: '#fff',
    borderWidth: 2,
  },
});
