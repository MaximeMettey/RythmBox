import { Preset } from '../types';

// Helper function to create patterns
const createPattern = (name: string, steps: boolean[][]) => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  steps,
  instruments: ['kick', 'snare', 'hihat', 'clap', 'tom', 'cymbal'],
});

// Rock beat
const rockPattern = createPattern('Rock Basic', [
  [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // Hi-hat
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

// Hip-hop beat
const hiphopPattern = createPattern('Hip-Hop', [
  [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false], // Hi-hat
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

// Techno beat
const technoPattern = createPattern('Techno', [
  [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true], // Hi-hat
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

// Funk beat
const funkPattern = createPattern('Funk', [
  [true, false, false, true, false, false, true, false, false, true, false, false, true, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [true, false, true, true, true, false, true, true, true, false, true, true, true, false, true, true], // Hi-hat
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

// Reggae beat
const reggaePattern = createPattern('Reggae', [
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // Hi-hat
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

// Jazz beat
const jazzPattern = createPattern('Jazz Swing', [
  [true, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, true], // Hi-hat
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

// House beat
const housePattern = createPattern('House', [
  [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false], // Kick
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Snare
  [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], // Hi-hat
  [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false], // Clap
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Tom
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false], // Cymbal
]);

export const PRESETS: Preset[] = [
  { id: 'rock', name: 'Rock', genre: 'Rock', pattern: rockPattern, tempo: 120 },
  { id: 'hiphop', name: 'Hip-Hop', genre: 'Hip-Hop', pattern: hiphopPattern, tempo: 90 },
  { id: 'techno', name: 'Techno', genre: 'Electronic', pattern: technoPattern, tempo: 128 },
  { id: 'funk', name: 'Funk', genre: 'Funk', pattern: funkPattern, tempo: 100 },
  { id: 'reggae', name: 'Reggae', genre: 'Reggae', pattern: reggaePattern, tempo: 80 },
  { id: 'jazz', name: 'Jazz', genre: 'Jazz', pattern: jazzPattern, tempo: 140 },
  { id: 'house', name: 'House', genre: 'Electronic', pattern: housePattern, tempo: 125 },
];

export const getEmptyPattern = () => createPattern('Custom', [
  Array(16).fill(false),
  Array(16).fill(false),
  Array(16).fill(false),
  Array(16).fill(false),
  Array(16).fill(false),
  Array(16).fill(false),
]);
