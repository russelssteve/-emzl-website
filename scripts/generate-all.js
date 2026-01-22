const { generateSEOPages } = require('./generate-seo-pages');
const DailyContentGenerator = require('./generate-daily-content');
const { generateSitemap } = require('./generate-sitemap');
const { MyfxbookIntegration } = require('./myfxbook-integration');

async function generateAll() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║   🚀 RUSSELS TRADING - MACHINE À CLIENTS COMPLÈTE       ║');
  console.log('║                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  try {
    // 0. Mise à jour des données Myfxbook
    console.log('ÉTAPE 0/4: Mise à jour des données Myfxbook\n');
    const myfxbook = new MyfxbookIntegration();
    await myfxbook.fetchPerformanceData();
    await myfxbook.savePerformanceData();
    
    // 1. Générer 200+ pages SEO avec données Myfxbook
    console.log('\nÉTAPE 1/4: Génération des pages SEO avec intégration Myfxbook\n');
    await generateSEOPages();
    
    // 2. Générer contenu quotidien
    console.log('\nÉTAPE 2/4: Génération du contenu quotidien\n');
    const dailyGenerator = new DailyContentGenerator();
    await dailyGenerator.generate();
    
    // 3. Intégrer Myfxbook dans toutes les pages
    console.log('\nÉTAPE 3/4: Intégration Myfxbook dans toutes les pages\n');
    await myfxbook.updateAllPages();
    
    // 4. Générer sitemap
    console.log('\nÉTAPE 4/4: Génération du sitemap\n');
    await generateSitemap();
    
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                                                          ║');
    console.log('║              ✅ GÉNÉRATION TERMINÉE AVEC SUCCÈS          ║');
    console.log('║                                                          ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 RÉSULTATS:');
    console.log('   ✅ 200+ pages SEO générées');
    console.log('   ✅ Données Myfxbook intégrées');
    console.log(`   📈 Profit: ${myfxbook.performanceData.profitPercent}`);
    console.log(`   🎯 Win Rate: ${myfxbook.performanceData.winRate}`);
    console.log('   ✅ Contenu quotidien créé');
    console.log('   ✅ Sitemap XML généré');
    console.log('   ✅ Prêt pour le déploiement\n');
    
    console.log('🚀 PROCHAINES ÉTAPES:');
    console.log('   1. npm run dev (tester localement)');
    console.log('   2. git push (déployer sur Netlify)');
    console.log('   3. Configurer cron quotidien pour contenu');
    console.log(`   4. Vérifier Myfxbook: ${myfxbook.publicUrl}\n`);
    
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateAll();
}

module.exports = { generateAll };
