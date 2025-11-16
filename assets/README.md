# Assets

Ce dossier contient les ressources de l'application.

## 🎹 Mode MIDI vs 🔊 Mode WAV

L'application supporte deux modes audio :

### Mode MIDI (par défaut)
- **Sons synthétiques** générés en temps réel avec Tone.js
- Fonctionne immédiatement sans fichiers audio
- Léger et rapide
- Idéal pour le prototypage et les tests

### Mode WAV (optionnel)
- **Samples audio réalistes** de haute qualité
- Nécessite des fichiers WAV
- Son plus professionnel et authentique
- Idéal pour la production finale

## 📦 Comment ajouter des fichiers WAV

### 1. Ajouter les fichiers audio

Placez vos fichiers WAV dans le dossier `assets/sounds/` :

- `sounds/kick.wav` - Son de grosse caisse (kick drum)
- `sounds/snare.wav` - Son de caisse claire (snare drum)
- `sounds/hihat.wav` - Son de charleston (hi-hat)
- `sounds/clap.wav` - Son de clap
- `sounds/tom.wav` - Son de tom
- `sounds/cymbal.wav` - Son de cymbale

### 2. Activer le chargement dans App.tsx

Dans le fichier `App.tsx`, décommentez les lignes suivantes (lignes 38-49) :

```typescript
const soundSources = new Map([
  ['kick', require('./assets/sounds/kick.wav')],
  ['snare', require('./assets/sounds/snare.wav')],
  ['hihat', require('./assets/sounds/hihat.wav')],
  ['clap', require('./assets/sounds/clap.wav')],
  ['tom', require('./assets/sounds/tom.wav')],
  ['cymbal', require('./assets/sounds/cymbal.wav')],
]);
await unifiedAudioService.loadAllWavSounds(soundSources);
setHasWavSounds(unifiedAudioService.hasWavSounds());
```

### 3. Basculer entre les modes

Une fois les fichiers WAV ajoutés et chargés :
- Le toggle "Mode Audio" dans l'interface permettra de basculer entre MIDI et WAV
- Le mode WAV sera automatiquement disponible

## 🎵 Formats recommandés

- **Format** : WAV (recommandé) ou MP3
- **Fréquence d'échantillonnage** : 44.1 kHz
- **Profondeur de bits** : 16-bit ou 24-bit
- **Durée** : 0.5 - 2 secondes par sample
- **Taille** : Garder les fichiers légers (< 100 KB par sample si possible)

## 🌐 Sources de samples gratuits

- https://freesound.org/ - Énorme bibliothèque de sons libres
- https://samplefocus.com/ - Samples de batterie de qualité
- https://www.looperman.com/ - Loops et samples gratuits
- https://99sounds.org/ - Packs de samples gratuits
- https://drumkito.com/ - Samples de batterie acoustique

## 🖼️ Images (optionnel)

Pour une meilleure expérience visuelle, ajoutez :

- `icon.png` (1024x1024) - Icône de l'application
- `splash.png` (1242x2436) - Écran de démarrage
- `adaptive-icon.png` (1024x1024) - Icône adaptative Android
- `favicon.png` (48x48) - Favicon pour le web
