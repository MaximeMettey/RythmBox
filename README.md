# RythmBox 🥁

Une boîte à rythme cross-platform pour musiciens, disponible sur mobile (iOS, Android), tablette et web.

## Fonctionnalités

- ✨ **Séquenceur 16 pas** avec 6 instruments (Kick, Snare, Hi-Hat, Clap, Tom, Cymbal)
- 🎵 **7 presets de styles musicaux** : Rock, Hip-Hop, Techno, Funk, Reggae, Jazz, House
- 🎛️ **Contrôle du tempo** de 40 à 200 BPM
- 💾 **Sauvegarde de patterns personnalisés** avec stockage local
- 🎨 **Interface moderne et intuitive** avec indicateurs visuels
- 📱 **100% cross-platform** grâce à React Native et Expo

## Technologies

- **React Native** avec **Expo** pour la compatibilité cross-platform
- **TypeScript** pour un code robuste et maintenable
- **Expo AV** pour la gestion audio
- **AsyncStorage** pour la persistance des données

## Installation

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur Web
npm run web
```

## Structure du projet

```
RythmBox/
├── src/
│   ├── components/      # Composants UI React Native
│   │   ├── StepButton.tsx
│   │   ├── InstrumentRow.tsx
│   │   ├── Sequencer.tsx
│   │   ├── Controls.tsx
│   │   ├── PresetSelector.tsx
│   │   └── PatternManager.tsx
│   ├── services/        # Services (Audio, Storage)
│   │   ├── AudioService.ts
│   │   └── StorageService.ts
│   ├── hooks/          # Hooks React personnalisés
│   │   └── useDrumMachine.ts
│   ├── types/          # Définitions TypeScript
│   │   └── index.ts
│   ├── presets/        # Presets de styles musicaux
│   │   └── index.ts
│   └── utils/          # Utilitaires
├── assets/             # Ressources (images, sons)
└── App.tsx            # Point d'entrée de l'application
```

## Utilisation

1. **Sélectionner un preset** : Choisissez un style musical dans la liste des presets
2. **Créer un pattern** : Tapez sur les cases pour activer/désactiver les notes
3. **Ajuster le tempo** : Utilisez le slider pour modifier la vitesse
4. **Lire le pattern** : Appuyez sur le bouton Play (▶)
5. **Sauvegarder** : Donnez un nom à votre pattern et sauvegardez-le
6. **Charger** : Retrouvez vos patterns sauvegardés dans "My Patterns"

## Note sur les samples audio

Pour que l'application fonctionne avec de l'audio, vous devez ajouter des fichiers audio dans le dossier `assets/sounds/`. Consultez `assets/README.md` pour plus d'informations.

## Prochaines améliorations

- [ ] Ajouter de vrais samples audio de haute qualité
- [ ] Implémenter l'exportation audio (WAV/MP3)
- [ ] Ajouter plus d'instruments et de presets
- [ ] Implémenter des effets audio (reverb, delay, etc.)
- [ ] Ajouter un mode enregistrement en temps réel
- [ ] Synchronisation cloud des patterns
- [ ] Partage de patterns entre utilisateurs

## Licence

ISC
