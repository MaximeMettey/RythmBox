#!/bin/bash

echo "🔧 RythmBox - Script de réparation de l'installation"
echo "=================================================="
echo ""

# Vérifier Node.js
NODE_VERSION=$(node --version)
echo "✓ Node.js version: $NODE_VERSION"

# Vérifier npm
NPM_VERSION=$(npm --version)
echo "✓ npm version: $NPM_VERSION"

echo ""
echo "📦 Étape 1/4 : Nettoyage des dépendances..."
rm -rf node_modules
rm -rf .expo
rm -rf .expo-shared
rm -f package-lock.json

echo "✓ Nettoyage terminé"
echo ""

echo "📦 Étape 2/4 : Installation des dépendances..."
npm install

echo ""
echo "📦 Étape 3/4 : Vérification de babel-preset-expo..."
if npm list babel-preset-expo > /dev/null 2>&1; then
  echo "✓ babel-preset-expo est installé"
else
  echo "⚠️  babel-preset-expo manquant, installation..."
  npm install --save-dev babel-preset-expo@54.0.7
fi

echo ""
echo "📦 Étape 4/4 : Nettoyage du cache Metro..."
npx expo start --clear &
EXPO_PID=$!
sleep 3
kill $EXPO_PID 2>/dev/null

echo ""
echo "✅ Installation réparée !"
echo ""
echo "🚀 Pour démarrer l'application :"
echo "   npm start"
echo ""
echo "📱 Ensuite, choisissez une plateforme :"
echo "   - Appuyez sur 'w' pour Web"
echo "   - Appuyez sur 'a' pour Android"
echo "   - Appuyez sur 'i' pour iOS"
echo ""
