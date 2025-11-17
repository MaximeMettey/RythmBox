# 🎵 Générateur de Samples Synthétiques

Ce dossier contient des outils pour générer des samples de batterie synthétiques pour RythmBox.

## 🚀 Utilisation Rapide

### Méthode 1 : Interface Web (Recommandée)

1. Ouvrez `generate-samples.html` dans votre navigateur
2. Cliquez sur "🎵 Générer tous les samples"
3. Attendez que tous les samples soient générés
4. Téléchargez les 6 fichiers WAV générés
5. Placez-les dans `assets/sounds/`

### Méthode 2 : Depuis l'application Web

1. Lancez l'application : `npm start`
2. Ouvrez dans le navigateur (appuyez sur `w`)
3. Ouvrez `http://localhost:8081/scripts/generate-samples.html`
4. Suivez les instructions

## 📦 Samples Générés

Le générateur crée 6 samples synthétiques :

| Fichier | Instrument | Durée | Taille approximative |
|---------|-----------|-------|---------------------|
| `kick.wav` | Grosse caisse | 1.0s | ~50 KB |
| `snare.wav` | Caisse claire | 0.4s | ~20 KB |
| `hihat.wav` | Charleston | 0.15s | ~8 KB |
| `clap.wav` | Clap | 0.3s | ~15 KB |
| `tom.wav` | Tom | 0.8s | ~40 KB |
| `cymbal.wav` | Cymbale | 1.5s | ~75 KB |

**Total : ~208 KB** - Très léger !

## 🔧 Après Génération

Une fois les samples téléchargés :

1. Placez-les dans `assets/sounds/`
2. Dans `App.tsx`, décommentez les lignes 39-50 :
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
3. Relancez l'app
4. Le son fonctionne maintenant sur **mobile** ! 🎉

## 🎹 Caractéristiques des Sons

- **Kick** : Son de grosse caisse profond avec déclin de pitch
- **Snare** : Bruit blanc avec envelope rapide
- **Hi-Hat** : Son métallique court et percussif
- **Clap** : Bruit rose simulant un claquement
- **Tom** : Tom grave avec sustain modéré
- **Cymbal** : Cymbale métallique avec release long

## 🔄 Personnalisation

Pour modifier les sons, éditez les paramètres des synths dans `generate-samples.html` :

```javascript
// Exemple : Kick plus profond
const kickSynth = new Tone.MembraneSynth({
  pitchDecay: 0.08,  // Plus lent
  octaves: 12,        // Plus d'octaves
  // ...
});
```

## ⚠️ Notes Techniques

- Les samples sont générés en **temps réel** dans le navigateur
- Utilise **Tone.js** et l'API **MediaRecorder**
- Format de sortie : **WAV 44.1kHz 16-bit**
- Pas de dépendances serveur requises

## 🎯 Alternative : Samples Pré-générés

Si vous ne voulez pas générer les samples vous-même, vous pouvez :
- Télécharger des samples depuis [freesound.org](https://freesound.org/)
- Utiliser des packs de batterie gratuits
- Demander à quelqu'un de les générer pour vous

## 📝 License

Les samples générés sont libres de droits et peuvent être utilisés dans RythmBox sans restriction.
