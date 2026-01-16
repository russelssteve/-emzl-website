const { generateSEOPages } = require('./generate-seo-pages');
const DailyContentGenerator = require('./generate-daily-content');
const { generateSitemap } = require('./generate-sitemap');

async function generateAll() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║     🚀 MACHINE À CLIENTS EMZL - GÉNÉRATION COMPLÈTE     ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  try {
    // 1. Générer 200+ pages SEO
    console.log('ÉTAPE 1/3: Génération des pages SEO\n');
    await generateSEOPages();
    
    // 2. Générer contenu quotidien
    console.log('\nÉTAPE 2/3: Génération du contenu quotidien\n');
    const dailyGenerator = new DailyContentGenerator();
    await dailyGenerator.generate();
    
    // 3. Générer sitemap
    console.log('\nÉTAPE 3/3: Génération du sitemap\n');
    await generateSitemap();
    
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                                                          ║');
    console.log('║              ✅ GÉNÉRATION TERMINÉE AVEC SUCCÈS          ║');
    console.log('║                                                          ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 RÉSULTATS:');
    console.log('   ✅ 200+ pages SEO générées');
    console.log('   ✅ Contenu quotidien créé');
    console.log('   ✅ Sitemap XML généré');
    console.log('   ✅ Prêt pour le déploiement\n');
    
    console.log('🚀 PROCHAINES ÉTAPES:');
    console.log('   1. npm run dev (tester localement)');
    console.log('   2. git push (déployer sur Netlify)');
    console.log('   3. Configurer cron quotidien pour contenu\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateAll();
}

module.exports = { generateAll };
