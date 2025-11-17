@echo off
echo.
echo 🔧 RythmBox - Script de réparation de l'installation
echo ==================================================
echo.

echo ✓ Node.js version:
node --version

echo ✓ npm version:
npm --version

echo.
echo 📦 Étape 1/4 : Nettoyage des dépendances...
if exist node_modules rmdir /s /q node_modules
if exist .expo rmdir /s /q .expo
if exist .expo-shared rmdir /s /q .expo-shared
if exist package-lock.json del /f package-lock.json

echo ✓ Nettoyage terminé
echo.

echo 📦 Étape 2/4 : Installation des dépendances...
call npm install

echo.
echo 📦 Étape 3/4 : Vérification de babel-preset-expo...
call npm list babel-preset-expo >nul 2>&1
if errorlevel 1 (
  echo ⚠️  babel-preset-expo manquant, installation...
  call npm install --save-dev babel-preset-expo@54.0.7
) else (
  echo ✓ babel-preset-expo est installé
)

echo.
echo ✅ Installation réparée !
echo.
echo 🚀 Pour démarrer l'application :
echo    npm start
echo.
echo 📱 Ensuite, choisissez une plateforme :
echo    - Appuyez sur 'w' pour Web
echo    - Appuyez sur 'a' pour Android
echo    - Appuyez sur 'i' pour iOS
echo.
pause
