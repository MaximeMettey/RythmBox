export interface DrumSound {
  id: string;
  name: string;
  file: any; // Audio file reference
}

export interface Pattern {
  id: string;
  name: string;
  steps: boolean[][];
  instruments: string[];
}

export interface Preset {
  id: string;
  name: string;
  genre: string;
  pattern: Pattern;
  tempo: number;
}

export interface DrumMachineState {
  isPlaying: boolean;
  currentStep: number;
  tempo: number;
  pattern: Pattern;
  selectedInstrument: number;
}

export const INSTRUMENTS = [
  { id: 'kick', name: 'Kick', color: '#FF6B6B' },
  { id: 'snare', name: 'Snare', color: '#4ECDC4' },
  { id: 'hihat', name: 'Hi-Hat', color: '#45B7D1' },
  { id: 'clap', name: 'Clap', color: '#FFA07A' },
  { id: 'tom', name: 'Tom', color: '#98D8C8' },
  { id: 'cymbal', name: 'Cymbal', color: '#F7DC6F' },
];

export const STEPS = 16;
