const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const fs = require('fs-extra');
const path = require('path');

async function generateSitemap() {
  console.log('🗺️  Génération du sitemap...\n');

  const sitemap = new SitemapStream({ hostname: 'https://emzl-trading.com' });
  const writeStream = createWriteStream(path.join(__dirname, '..', 'public', 'sitemap.xml'));
  
  sitemap.pipe(writeStream);

  // Page d'accueil
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });

  // Charger toutes les pages générées
  const pagesListPath = path.join(__dirname, '..', 'content', 'pages-list.json');
  
  if (await fs.pathExists(pagesListPath)) {
    const pages = await fs.readJSON(pagesListPath);
    
    for (const page of pages) {
      const priority = page.type === 'pillar' ? 0.9 : 
                      page.type === 'long-tail' ? 0.8 : 0.7;
      
      sitemap.write({
        url: page.slug,
        changefreq: 'weekly',
        priority
      });
    }
    
    console.log(`✅ ${pages.length} pages ajoutées au sitemap`);
  }

  // Charger les articles de blog
  const blogIndexPath = path.join(__dirname, '..', 'content', 'blog-index.json');
  
  if (await fs.pathExists(blogIndexPath)) {
    const blogPosts = await fs.readJSON(blogIndexPath);
    
    for (const post of blogPosts) {
      sitemap.write({
        url: post.slug,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.date
      });
    }
    
    console.log(`✅ ${blogPosts.length} articles de blog ajoutés`);
  }

  sitemap.end();

  await streamToPromise(sitemap);
  
  console.log('\n🎉 Sitemap généré: public/sitemap.xml');
}

if (require.main === module) {
  generateSitemap().catch(console.error);
}

module.exports = { generateSitemap };
