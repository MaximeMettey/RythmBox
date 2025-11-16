import { useState, useEffect, useRef } from 'react';
import { Pattern, DrumMachineState, STEPS } from '../types';
import { unifiedAudioService } from '../services/UnifiedAudioService';

export const useDrumMachine = (initialPattern: Pattern, initialTempo: number) => {
  const [state, setState] = useState<DrumMachineState>({
    isPlaying: false,
    currentStep: 0,
    tempo: initialTempo,
    pattern: initialPattern,
    selectedInstrument: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.isPlaying) {
      const interval = (60 / state.tempo) * 1000 / 4; // Quarter note interval

      intervalRef.current = setInterval(() => {
        setState(prev => {
          const nextStep = (prev.currentStep + 1) % STEPS;

          // Play sounds for the current step
          prev.pattern.steps.forEach((instrumentSteps, instrumentIndex) => {
            if (instrumentSteps[prev.currentStep]) {
              const instrumentId = prev.pattern.instruments[instrumentIndex];
              unifiedAudioService.playSound(instrumentId);
            }
          });

          return {
            ...prev,
            currentStep: nextStep,
          };
        });
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [state.isPlaying, state.tempo]);

  const togglePlay = () => {
    setState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      currentStep: prev.isPlaying ? 0 : prev.currentStep,
    }));
  };

  const stop = () => {
    setState(prev => ({
      ...prev,
      isPlaying: false,
      currentStep: 0,
    }));
  };

  const setTempo = (tempo: number) => {
    setState(prev => ({ ...prev, tempo }));
  };

  const toggleStep = (instrumentIndex: number, stepIndex: number) => {
    setState(prev => {
      const newSteps = prev.pattern.steps.map((row, i) =>
        i === instrumentIndex
          ? row.map((step, j) => j === stepIndex ? !step : step)
          : row
      );

      return {
        ...prev,
        pattern: {
          ...prev.pattern,
          steps: newSteps,
        },
      };
    });
  };

  const setPattern = (pattern: Pattern) => {
    setState(prev => ({
      ...prev,
      pattern,
      currentStep: 0,
    }));
  };

  const clearPattern = () => {
    setState(prev => ({
      ...prev,
      pattern: {
        ...prev.pattern,
        steps: prev.pattern.steps.map(row => row.map(() => false)),
      },
    }));
  };

  const selectInstrument = (index: number) => {
    setState(prev => ({ ...prev, selectedInstrument: index }));
  };

  return {
    state,
    togglePlay,
    stop,
    setTempo,
    toggleStep,
    setPattern,
    clearPattern,
    selectInstrument,
  };
};
