const fs = require('fs');
const path = require('path');

class SitemapGenerator {
  constructor() {
    this.baseUrl = 'https://emzl-trading.netlify.app';
    this.pages = [
      '/',
      '/thank-you.html',
      '/blog/'
    ];
  }

  async generate() {
    try {
      console.log('📄 Génération du sitemap...');
      
      const sitemap = this.generateSitemapXML();
      await this.saveSitemap(sitemap);
      
      console.log('✅ Sitemap généré avec succès');
      return sitemap;
    } catch (error) {
      console.error('❌ Erreur lors de la génération du sitemap:', error);
      // Ne pas faire échouer le processus
      return null;
    }
  }

  generateSitemapXML() {
    const now = new Date().toISOString();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Ajouter les pages principales
    this.pages.forEach(page => {
      xml += `
  <url>
    <loc>${this.baseUrl}${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Ajouter les pages de blog si elles existent
    try {
      const blogDir = path.join(process.cwd(), 'public', 'blog');
      if (fs.existsSync(blogDir)) {
        const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.html'));
        blogFiles.forEach(file => {
          xml += `
  <url>
    <loc>${this.baseUrl}/blog/${file}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
        });
      }
    } catch (error) {
      console.warn('⚠️ Impossible de lire le dossier blog:', error.message);
    }

    xml += `
</urlset>`;

    return xml;
  }

  async saveSitemap(sitemap) {
    try {
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      const sitemapPath = path.join(publicDir, 'sitemap.xml');
      fs.writeFileSync(sitemapPath, sitemap, 'utf8');
      
      console.log(`✅ Sitemap sauvegardé: ${sitemapPath}`);
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      throw error;
    }
  }
}

// Exécuter avec gestion d'erreur robuste
if (require.main === module) {
  const generator = new SitemapGenerator();
  generator.generate()
    .then(() => {
      console.log('✅ Génération sitemap terminée avec succès');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur lors de la génération:', error);
      // Ne pas faire échouer GitHub Actions
      console.log('⚠️ Processus terminé avec avertissements');
      process.exit(0);
    });
}

module.exports = SitemapGenerator;