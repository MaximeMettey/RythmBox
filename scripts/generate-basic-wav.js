#!/usr/bin/env node

/**
 * Génère des samples WAV basiques de batterie
 * Sans dépendances externes - utilise uniquement Node.js natif
 *
 * Les sons générés sont simples mais fonctionnels.
 * Pour de meilleurs samples, utilisez generate-samples.html avec Tone.js
 */

const fs = require('fs');
const path = require('path');

// Paramètres audio
const SAMPLE_RATE = 44100;
const BIT_DEPTH = 16;
const CHANNELS = 1; // Mono

console.log('🎵 Génération de samples WAV basiques...\n');

/**
 * Crée un fichier WAV à partir de données PCM
 */
function createWavFile(pcmData, sampleRate = SAMPLE_RATE) {
  const dataSize = pcmData.length * 2; // 2 bytes per sample (16-bit)
  const fileSize = 44 + dataSize; // WAV header = 44 bytes

  const buffer = Buffer.alloc(fileSize);
  let offset = 0;

  // RIFF header
  buffer.write('RIFF', offset); offset += 4;
  buffer.writeUInt32LE(fileSize - 8, offset); offset += 4;
  buffer.write('WAVE', offset); offset += 4;

  // fmt chunk
  buffer.write('fmt ', offset); offset += 4;
  buffer.writeUInt32LE(16, offset); offset += 4; // fmt chunk size
  buffer.writeUInt16LE(1, offset); offset += 2;  // audio format (1 = PCM)
  buffer.writeUInt16LE(CHANNELS, offset); offset += 2;
  buffer.writeUInt32LE(sampleRate, offset); offset += 4;
  buffer.writeUInt32LE(sampleRate * CHANNELS * 2, offset); offset += 4; // byte rate
  buffer.writeUInt16LE(CHANNELS * 2, offset); offset += 2; // block align
  buffer.writeUInt16LE(BIT_DEPTH, offset); offset += 2;

  // data chunk
  buffer.write('data', offset); offset += 4;
  buffer.writeUInt32LE(dataSize, offset); offset += 4;

  // PCM data
  for (let i = 0; i < pcmData.length; i++) {
    const sample = Math.max(-1, Math.min(1, pcmData[i]));
    const intSample = Math.floor(sample * 32767);
    buffer.writeInt16LE(intSample, offset);
    offset += 2;
  }

  return buffer;
}

/**
 * Génère une enveloppe ADSR simple
 */
function applyEnvelope(samples, attack, decay, sustain, release) {
  const totalSamples = samples.length;
  const attackSamples = Math.floor(totalSamples * attack);
  const decaySamples = Math.floor(totalSamples * decay);
  const releaseSamples = Math.floor(totalSamples * release);
  const sustainSamples = totalSamples - attackSamples - decaySamples - releaseSamples;

  let idx = 0;

  // Attack
  for (let i = 0; i < attackSamples; i++) {
    samples[idx++] *= i / attackSamples;
  }

  // Decay
  for (let i = 0; i < decaySamples; i++) {
    samples[idx++] *= 1 - (i / decaySamples) * (1 - sustain);
  }

  // Sustain
  for (let i = 0; i < sustainSamples; i++) {
    samples[idx++] *= sustain;
  }

  // Release
  for (let i = 0; i < releaseSamples; i++) {
    samples[idx++] *= sustain * (1 - i / releaseSamples);
  }

  return samples;
}

/**
 * Génère un kick (grosse caisse)
 */
function generateKick() {
  const duration = 1.0;
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(length);

  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    // Fréquence qui décline de 150Hz à 40Hz
    const freq = 150 * Math.exp(-t * 5) + 40;
    samples[i] = Math.sin(2 * Math.PI * freq * t);
  }

  return applyEnvelope(samples, 0.001, 0.2, 0.1, 0.7);
}

/**
 * Génère une snare (caisse claire)
 */
function generateSnare() {
  const duration = 0.4;
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(length);

  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    // Bruit blanc + tonalité
    const noise = Math.random() * 2 - 1;
    const tone = Math.sin(2 * Math.PI * 200 * t) * 0.3;
    samples[i] = (noise * 0.7 + tone * 0.3);
  }

  return applyEnvelope(samples, 0.001, 0.3, 0, 0.7);
}

/**
 * Génère un hi-hat (charleston)
 */
function generateHiHat() {
  const duration = 0.15;
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(length);

  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    // Bruit filtré passe-haut
    const noise = Math.random() * 2 - 1;
    // Filtrage simple par moyenne mobile
    samples[i] = noise * Math.exp(-t * 20);
  }

  return applyEnvelope(samples, 0.001, 0.4, 0, 0.6);
}

/**
 * Génère un clap
 */
function generateClap() {
  const duration = 0.3;
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(length);

  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    // Bruit rose simulé + double attaque
    const noise = Math.random() * 2 - 1;
    const doubleAttack = (t < 0.01) ? 1 : ((t < 0.02) ? 0.7 : 1);
    samples[i] = noise * doubleAttack * 0.8;
  }

  return applyEnvelope(samples, 0.001, 0.2, 0, 0.8);
}

/**
 * Génère un tom
 */
function generateTom() {
  const duration = 0.8;
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(length);

  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    // Fréquence qui décline de 180Hz à 80Hz
    const freq = 180 * Math.exp(-t * 3) + 80;
    samples[i] = Math.sin(2 * Math.PI * freq * t);
  }

  return applyEnvelope(samples, 0.001, 0.3, 0.2, 0.5);
}

/**
 * Génère une cymbale
 */
function generateCymbal() {
  const duration = 1.5;
  const length = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(length);

  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    // Mélange de plusieurs fréquences hautes + bruit
    const noise = Math.random() * 2 - 1;
    const freq1 = Math.sin(2 * Math.PI * 523 * t);
    const freq2 = Math.sin(2 * Math.PI * 784 * t);
    const freq3 = Math.sin(2 * Math.PI * 1046 * t);
    samples[i] = (noise * 0.6 + freq1 * 0.15 + freq2 * 0.15 + freq3 * 0.1);
  }

  return applyEnvelope(samples, 0.001, 0.2, 0.3, 0.5);
}

/**
 * Génère tous les samples
 */
function generateAllSamples() {
  const outputDir = path.join(__dirname, '..', 'assets', 'sounds');

  // Créer le dossier si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('📁 Dossier assets/sounds/ créé\n');
  }

  const samples = [
    { name: 'kick', generator: generateKick },
    { name: 'snare', generator: generateSnare },
    { name: 'hihat', generator: generateHiHat },
    { name: 'clap', generator: generateClap },
    { name: 'tom', generator: generateTom },
    { name: 'cymbal', generator: generateCymbal },
  ];

  let totalSize = 0;

  samples.forEach(({ name, generator }) => {
    console.log(`🎵 Génération de ${name}.wav...`);

    const pcmData = generator();
    const wavBuffer = createWavFile(pcmData);
    const filePath = path.join(outputDir, `${name}.wav`);

    fs.writeFileSync(filePath, wavBuffer);

    const sizeKB = (wavBuffer.length / 1024).toFixed(1);
    console.log(`   ✅ ${name}.wav créé (${sizeKB} KB)`);
    totalSize += wavBuffer.length;
  });

  console.log(`\n🎉 Tous les samples générés avec succès !`);
  console.log(`   Total: ${(totalSize / 1024).toFixed(1)} KB\n`);

  console.log('💡 Ces samples sont basiques mais fonctionnels.');
  console.log('   Pour de meilleurs samples, utilisez scripts/generate-samples.html\n');
}

// Exécuter
try {
  generateAllSamples();
} catch (error) {
  console.error('❌ Erreur:', error);
  process.exit(1);
}
