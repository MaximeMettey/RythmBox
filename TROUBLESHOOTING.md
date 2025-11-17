# Guide de Dépannage RythmBox

## Problème : "Cannot find module 'babel-preset-expo'"

### Solution 1 : Réinstallation complète (recommandé)

```bash
# 1. Supprimer les dépendances et caches
rm -rf node_modules
rm -rf .expo
rm -rf .expo-shared
rm package-lock.json

# 2. Réinstaller
npm install

# 3. Relancer
npm start
```

### Solution 2 : Installation spécifique de babel-preset-expo

```bash
npm install --save-dev babel-preset-expo@54.0.7
npm start
```

### Solution 3 : Utiliser npm ci (Clean Install)

```bash
# Assure une installation propre basée sur package-lock.json
rm -rf node_modules
npm ci
npm start
```

## Autres problèmes courants

### Erreur Metro Bundler

```bash
# Réinitialiser le cache Metro
npx expo start --clear
```

### Erreur de permissions

```bash
# Sur macOS/Linux
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) node_modules
```

### Version de Node.js

Assurez-vous d'utiliser Node.js >= 18.0.0 :

```bash
node --version  # Devrait afficher v18.x.x ou supérieur
```

Si vous avez une version plus ancienne, mettez à jour Node.js :
- Via nvm : `nvm install 20 && nvm use 20`
- Via site officiel : https://nodejs.org/

### Conflit de ports

Si le port 8081 est déjà utilisé :

```bash
npx expo start --port 8082
```

## Vérifications après installation

```bash
# Vérifier que toutes les dépendances sont installées
npm list babel-preset-expo
npm list expo
npm list react
npm list react-native

# Vérifier la compatibilité Expo
npx expo-doctor

# Lancer l'application
npm start
```

## Versions attendues (Expo SDK 54)

```json
{
  "expo": "~54.0.23",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "babel-preset-expo": "~54.0.7"
}
```

## Support

Si le problème persiste après avoir essayé toutes ces solutions :

1. Vérifiez que vous êtes dans le bon répertoire : `pwd`
2. Vérifiez les permissions : `ls -la node_modules`
3. Essayez avec yarn : `yarn install && yarn start`
4. Consultez les logs complets : `npm start --verbose`

## Commandes utiles

```bash
# Nettoyer complètement le projet
npm run clean  # Si disponible
rm -rf node_modules .expo package-lock.json

# Vérifier l'intégrité des packages
npm audit

# Mettre à jour Expo CLI
npm install -g expo-cli@latest

# Lancer sur différentes plateformes
npm run web      # Web (devrait toujours fonctionner)
npm run android  # Android
npm run ios      # iOS (Mac uniquement)
```
