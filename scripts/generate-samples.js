/**
 * Script pour générer des samples synthétiques de batterie avec Tone.js
 * À exécuter dans un environnement Node.js avec accès au Web Audio API
 *
 * Installation : npm install tone node-web-audio-api fs-extra
 * Usage : node scripts/generate-samples.js
 */

const Tone = require('tone');
const fs = require('fs');
const path = require('path');

// Durée des samples en secondes
const SAMPLE_DURATION = {
  kick: 1.0,
  snare: 0.4,
  hihat: 0.15,
  clap: 0.3,
  tom: 0.8,
  cymbal: 1.5,
};

async function generateSamples() {
  console.log('🎵 Génération des samples synthétiques...\n');

  const outputDir = path.join(__dirname, '..', 'assets', 'sounds');

  // Créer le dossier si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Kick - Grosse caisse
  console.log('Génération: kick.wav');
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

  // Snare - Caisse claire
  console.log('Génération: snare.wav');
  const snareSynth = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0,
      release: 0.2,
    },
  }).toDestination();

  // Hi-Hat
  console.log('Génération: hihat.wav');
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

  // Clap
  console.log('Génération: clap.wav');
  const clapSynth = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: {
      attack: 0.001,
      decay: 0.15,
      sustain: 0,
      release: 0.15,
    },
  }).toDestination();

  // Tom
  console.log('Génération: tom.wav');
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

  // Cymbal
  console.log('Génération: cymbal.wav');
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

  // Enregistrer les samples
  // Note: Cette partie nécessite une implémentation spécifique pour Node.js
  // avec node-web-audio-api ou un enregistrement dans le navigateur

  console.log('\n⚠️  Ce script doit être exécuté dans un navigateur pour l\'enregistrement.');
  console.log('Visitez http://localhost:8081 et ouvrez la console pour générer les samples.\n');

  // Dispose des synths
  kickSynth.dispose();
  snareSynth.dispose();
  hihatSynth.dispose();
  clapSynth.dispose();
  tomSynth.dispose();
  cymbalSynth.dispose();
}

// Pour exécution dans Node.js
if (typeof window === 'undefined') {
  console.log('⚠️  Ce script nécessite un environnement Web Audio API');
  console.log('Utilisez plutôt generate-samples.html dans un navigateur\n');
}

module.exports = { generateSamples, SAMPLE_DURATION };
