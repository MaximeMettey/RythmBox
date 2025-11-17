#!/usr/bin/env node

/**
 * Script d'automatisation pour configurer l'audio de RythmBox
 *
 * Ce script :
 * 1. Génère automatiquement les samples avec Puppeteer
 * 2. Les place dans assets/sounds/
 * 3. Active le code de chargement WAV dans App.tsx
 *
 * Usage: node scripts/setup-audio.js
 */

const fs = require('fs');
const path = require('path');

// Chemins
const projectRoot = path.join(__dirname, '..');
const soundsDir = path.join(projectRoot, 'assets', 'sounds');
const appTsxPath = path.join(projectRoot, 'App.tsx');
const generateHtmlPath = path.join(__dirname, 'generate-samples.html');

const REQUIRED_SAMPLES = ['kick.wav', 'snare.wav', 'hihat.wav', 'clap.wav', 'tom.wav', 'cymbal.wav'];

console.log('🎵 RythmBox - Configuration Audio Automatisée\n');

// Vérifier si les samples existent déjà
function checkExistingSamples() {
  if (!fs.existsSync(soundsDir)) {
    return false;
  }

  const existing = REQUIRED_SAMPLES.filter(sample =>
    fs.existsSync(path.join(soundsDir, sample))
  );

  if (existing.length === REQUIRED_SAMPLES.length) {
    console.log('✅ Tous les samples existent déjà !');
    return true;
  } else if (existing.length > 0) {
    console.log(`⚠️  Samples existants : ${existing.length}/${REQUIRED_SAMPLES.length}`);
    return false;
  }

  return false;
}

// Générer les samples avec Puppeteer
async function generateSamples() {
  console.log('📦 Installation de puppeteer si nécessaire...');

  try {
    // Vérifier si puppeteer est installé
    try {
      require.resolve('puppeteer');
    } catch (e) {
      console.log('⏳ Installation de puppeteer...');
      const { execSync } = require('child_process');
      execSync('npm install --no-save puppeteer', { stdio: 'inherit' });
    }

    const puppeteer = require('puppeteer');

    console.log('🚀 Lancement du navigateur headless...');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Créer le dossier assets/sounds s'il n'existe pas
    if (!fs.existsSync(soundsDir)) {
      fs.mkdirSync(soundsDir, { recursive: true });
      console.log('📁 Dossier assets/sounds/ créé');
    }

    // Configurer le téléchargement des fichiers
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: soundsDir
    });

    // Charger la page de génération
    const htmlUrl = 'file://' + generateHtmlPath;
    console.log('📄 Chargement de generate-samples.html...');
    await page.goto(htmlUrl, { waitUntil: 'networkidle0' });

    // Cliquer sur le bouton de génération
    console.log('🎵 Génération des samples en cours...');
    await page.click('#startBtn');

    // Attendre que tous les samples soient générés (environ 5 secondes)
    await page.waitForFunction(() => {
      const links = document.querySelectorAll('a[download]');
      return links.length === 6;
    }, { timeout: 15000 });

    console.log('✅ Samples générés avec succès !');

    // Télécharger chaque sample
    const downloadLinks = await page.$$('a[download]');
    console.log(`📥 Téléchargement de ${downloadLinks.length} fichiers...`);

    for (const link of downloadLinks) {
      await link.click();
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Attendre un peu pour s'assurer que tous les téléchargements sont terminés
    await new Promise(resolve => setTimeout(resolve, 2000));

    await browser.close();

    // Vérifier que tous les fichiers ont été téléchargés
    const downloaded = REQUIRED_SAMPLES.filter(sample =>
      fs.existsSync(path.join(soundsDir, sample))
    );

    if (downloaded.length === REQUIRED_SAMPLES.length) {
      console.log('✅ Tous les samples téléchargés avec succès !');

      // Afficher la taille des fichiers
      let totalSize = 0;
      REQUIRED_SAMPLES.forEach(sample => {
        const filePath = path.join(soundsDir, sample);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`   - ${sample}: ${sizeKB} KB`);
        totalSize += stats.size;
      });
      console.log(`   Total: ${(totalSize / 1024).toFixed(1)} KB`);

      return true;
    } else {
      console.error('❌ Erreur : Tous les samples n\'ont pas été téléchargés');
      console.log(`   Téléchargés : ${downloaded.length}/${REQUIRED_SAMPLES.length}`);
      return false;
    }

  } catch (error) {
    console.error('❌ Erreur lors de la génération des samples:', error.message);
    console.log('\n💡 Solution alternative : Ouvrez manuellement scripts/generate-samples.html dans votre navigateur');
    return false;
  }
}

// Activer le code WAV dans App.tsx
function enableWavInAppTsx() {
  console.log('\n🔧 Activation du code WAV dans App.tsx...');

  if (!fs.existsSync(appTsxPath)) {
    console.error('❌ Fichier App.tsx introuvable');
    return false;
  }

  let content = fs.readFileSync(appTsxPath, 'utf8');

  // Vérifier si le code est déjà décommenté (pas de /* avant const soundSources)
  const alreadyUncommented = content.includes("const soundSources = new Map([") &&
      !content.match(/\/\*[\s\S]*?const soundSources = new Map\(\[/);

  if (alreadyUncommented) {
    console.log('✅ Le code WAV est déjà activé dans App.tsx');
    return true;
  }

  // Décommenter le bloc commenté avec /* */
  const blockCommentPattern = /\/\*\s*(const soundSources = new Map\(\[[\s\S]*?\]\);[\s\S]*?await unifiedAudioService\.loadAllWavSounds\(soundSources\);[\s\S]*?setHasWavSounds\(unifiedAudioService\.hasWavSounds\(\)\);)\s*\*\//;

  if (blockCommentPattern.test(content)) {
    content = content.replace(blockCommentPattern, '$1');
    fs.writeFileSync(appTsxPath, content, 'utf8');
    console.log('✅ Code WAV activé dans App.tsx');
    return true;
  }

  // Essayer avec des lignes commentées individuellement avec //
  const lineCommentPattern = /\/\/ (const soundSources = new Map\(\[[\s\S]*?\]\);[\s\S]*?await unifiedAudioService\.loadAllWavSounds\(soundSources\);[\s\S]*?setHasWavSounds\(unifiedAudioService\.hasWavSounds\(\)\);)/;

  if (lineCommentPattern.test(content)) {
    content = content.replace(lineCommentPattern, '$1');
    fs.writeFileSync(appTsxPath, content, 'utf8');
    console.log('✅ Code WAV activé dans App.tsx');
    return true;
  }

  console.log('⚠️  Le code à décommenter n\'a pas été trouvé dans App.tsx');
  console.log('   Vérifiez manuellement les lignes de chargement des samples');
  return false;
}

// Générer des samples basiques sans dépendances
function generateBasicSamples() {
  console.log('\n🎵 Génération de samples basiques (sans dépendances)...\n');

  try {
    const { execSync } = require('child_process');
    const basicScriptPath = path.join(__dirname, 'generate-basic-wav.js');

    execSync(`node "${basicScriptPath}"`, { stdio: 'inherit' });

    return checkExistingSamples();
  } catch (error) {
    console.error('❌ Erreur lors de la génération des samples basiques:', error.message);
    return false;
  }
}

// Fonction principale - Mode rapide (par défaut)
async function main() {
  try {
    // Étape 1 : Vérifier les samples existants
    const samplesExist = checkExistingSamples();

    // Étape 2 : Générer les samples si nécessaire
    if (!samplesExist) {
      console.log('\n📦 Deux options disponibles :');
      console.log('   1. RAPIDE : Samples basiques, sans dépendances (recommandé)');
      console.log('   2. QUALITÉ : Samples réalistes avec Tone.js (nécessite Puppeteer)\n');

      // Vérifier si --quality est passé
      const useQuality = process.argv.includes('--quality') || process.argv.includes('-q');

      if (useQuality) {
        console.log('🎵 Mode QUALITÉ sélectionné\n');
        const success = await generateSamples();

        if (!success) {
          console.log('\n❌ La génération avec Puppeteer a échoué.');
          console.log('   Essayez le mode rapide : node scripts/setup-audio.js\n');
          process.exit(1);
        }
      } else {
        console.log('🚀 Mode RAPIDE sélectionné (par défaut)\n');
        const success = generateBasicSamples();

        if (!success) {
          console.log('\n❌ La génération rapide a échoué.');
          console.log('\n💡 Alternatives :');
          console.log('   1. Mode qualité : node scripts/setup-audio.js --quality');
          console.log('   2. Manuel : ouvrez scripts/generate-samples.html dans un navigateur\n');
          process.exit(1);
        }
      }
    }

    // Étape 3 : Activer le code dans App.tsx
    enableWavInAppTsx();

    console.log('\n🎉 Configuration terminée avec succès !');
    console.log('\n📱 Prochaines étapes :');
    console.log('   1. Relancez l\'application : npm start');
    console.log('   2. Le son fonctionnera sur toutes les plateformes (iOS, Android, Web)');
    console.log('   3. Sur Web, vous pouvez basculer entre MIDI et WAV');
    console.log('\n💡 Pour de meilleurs samples : node scripts/setup-audio.js --quality\n');

  } catch (error) {
    console.error('❌ Erreur fatale:', error);
    process.exit(1);
  }
}

// Lancer le script
main();
