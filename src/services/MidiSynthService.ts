import * as Tone from 'tone';

/**
 * Service pour générer des sons de batterie synthétiques en utilisant Tone.js
 * Alternative légère aux fichiers WAV pour avoir du son immédiatement
 */
export class MidiSynthService {
  private synths: Map<string, any> = new Map();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      // Kick - Grosse caisse synthétique
      const kickSynth = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 1.4,
          attackCurve: 'exponential',
        },
      }).toDestination();
      this.synths.set('kick', kickSynth);

      // Snare - Caisse claire synthétique
      const snareSynth = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0,
          release: 0.2,
        },
      }).toDestination();
      this.synths.set('snare', snareSynth);

      // Hi-Hat - Charleston synthétique
      const hihatSynth = new Tone.MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.001,
          decay: 0.1,
          release: 0.01,
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5,
      }).toDestination();
      this.synths.set('hihat', hihatSynth);

      // Clap - Synthèse de clap
      const clapSynth = new Tone.NoiseSynth({
        noise: { type: 'pink' },
        envelope: {
          attack: 0.001,
          decay: 0.15,
          sustain: 0,
          release: 0.15,
        },
      }).toDestination();
      this.synths.set('clap', clapSynth);

      // Tom - Tom synthétique
      const tomSynth = new Tone.MembraneSynth({
        pitchDecay: 0.08,
        octaves: 6,
        oscillator: { type: 'sine' },
        envelope: {
          attack: 0.001,
          decay: 0.5,
          sustain: 0.01,
          release: 1,
        },
      }).toDestination();
      this.synths.set('tom', tomSynth);

      // Cymbal - Cymbale synthétique
      const cymbalSynth = new Tone.MetalSynth({
        frequency: 250,
        envelope: {
          attack: 0.001,
          decay: 0.4,
          release: 0.3,
        },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 3000,
        octaves: 1.5,
      }).toDestination();
      this.synths.set('cymbal', cymbalSynth);

      this.isInitialized = true;
      console.log('MIDI Synth Service initialized');
    } catch (error) {
      console.error('Failed to initialize MIDI synth:', error);
    }
  }

  async playSound(id: string): Promise<void> {
    try {
      // Démarrer le contexte audio si ce n'est pas déjà fait
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      const synth = this.synths.get(id);
      if (!synth) {
        console.warn(`Synth not found for ${id}`);
        return;
      }

      const now = Tone.now();

      switch (id) {
        case 'kick':
          synth.triggerAttackRelease('C1', '8n', now);
          break;
        case 'snare':
          synth.triggerAttackRelease('16n', now);
          break;
        case 'hihat':
          synth.triggerAttackRelease('32n', now);
          break;
        case 'clap':
          synth.triggerAttackRelease('16n', now);
          break;
        case 'tom':
          synth.triggerAttackRelease('G1', '8n', now);
          break;
        case 'cymbal':
          synth.triggerAttackRelease('16n', now);
          break;
      }
    } catch (error) {
      console.error(`Failed to play MIDI sound ${id}:`, error);
    }
  }

  dispose(): void {
    for (const [id, synth] of this.synths.entries()) {
      try {
        synth.dispose();
      } catch (error) {
        console.error(`Failed to dispose synth ${id}:`, error);
      }
    }
    this.synths.clear();
    this.isInitialized = false;
  }
}

export const midiSynthService = new MidiSynthService();
