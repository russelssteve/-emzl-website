const PImage = require('pureimage');
const fs = require('fs-extra');
const path = require('path');

// Générateur d'images de fond par catégorie
class BackgroundGenerator {
  constructor() {
    this.categories = {
      'market-analysis': {
        colors: ['#1a202c', '#2d3748', '#4a5568'],
        pattern: 'charts',
        icon: '📊'
      },
      'strategy': {
        colors: ['#2d3748', '#4a5568', '#718096'],
        pattern: 'target',
        icon: '🎯'
      },
      'case-study': {
        colors: ['#2b6cb0', '#3182ce', '#4299e1'],
        pattern: 'briefcase',
        icon: '💼'
      },
      'comparison': {
        colors: ['#553c9a', '#6b46c1', '#7c3aed'],
        pattern: 'balance',
        icon: '⚖️'
      },
      'performance': {
        colors: ['#1a365d', '#2c5282', '#3182ce'],
        pattern: 'growth',
        icon: '📈'
      },
      'education': {
        colors: ['#2c5282', '#3182ce', '#4299e1'],
        pattern: 'graduation',
        icon: '🎓'
      },
      'community': {
        colors: ['#2a4365', '#3182ce', '#4299e1'],
        pattern: 'people',
        icon: '👥'
      }
    };
  }

  async generateAll() {
    const backgroundsDir = path.join(__dirname, '..', 'public', 'images', 'backgrounds');
    await fs.ensureDir(backgroundsDir);

    for (const [category, config] of Object.entries(this.categories)) {
      console.log(`🎨 Génération du fond pour: ${category}`);
      await this.generateBackground(category, config, backgroundsDir);
    }

    console.log('✅ Tous les fonds de catégorie ont été générés');
  }

  async generateBackground(category, config, outputDir) {
    const width = 1200;
    const height = 630;
    const img = PImage.make(width, height);
    const ctx = img.getContext('2d');

    // Dégradé de fond
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, config.colors[0]);
    gradient.addColorStop(0.5, config.colors[1]);
    gradient.addColorStop(1, config.colors[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Motifs géométriques selon la catégorie
    await this.drawPattern(ctx, config.pattern, width, height, config.colors);

    // Icône de catégorie
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.font = '120pt Arial';
    ctx.fillText(config.icon, width - 200, height - 100);

    // Sauvegarder
    const fileName = `${category}.png`;
    const filePath = path.join(outputDir, fileName);
    const stream = fs.createWriteStream(filePath);
    await PImage.encodePNGToStream(img, stream);
    
    console.log(`✅ Fond généré: ${fileName}`);
  }

  async drawPattern(ctx, pattern, width, height, colors) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    
    switch (pattern) {
      case 'charts':
        // Motif de graphiques
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const w = Math.random() * 100 + 50;
          const h = Math.random() * 100 + 50;
          ctx.fillRect(x, y, w, h);
        }
        break;
        
      case 'target':
        // Motif de cibles
        for (let i = 0; i < 10; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const radius = Math.random() * 50 + 30;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
        break;
        
      case 'briefcase':
        // Motif de rectangles (mallettes)
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const w = Math.random() * 80 + 40;
          const h = Math.random() * 60 + 30;
          ctx.strokeRect(x, y, w, h);
        }
        break;
        
      case 'balance':
        // Motif d'équilibre (triangles)
        for (let i = 0; i < 12; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 40 + 20;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + size, y + size);
          ctx.lineTo(x - size, y + size);
          ctx.closePath();
          ctx.fill();
        }
        break;
        
      case 'growth':
        // Motif de croissance (flèches)
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 30 + 15;
          ctx.beginPath();
          ctx.moveTo(x, y + size);
          ctx.lineTo(x + size/2, y);
          ctx.lineTo(x + size, y + size);
          ctx.stroke();
        }
        break;
        
      case 'graduation':
        // Motif éducatif (losanges)
        for (let i = 0; i < 18; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 25 + 15;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-size/2, -size/2, size, size);
          ctx.restore();
        }
        break;
        
      case 'people':
        // Motif communautaire (cercles connectés)
        for (let i = 0; i < 25; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const radius = Math.random() * 15 + 10;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
        break;
    }
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  const generator = new BackgroundGenerator();
  generator.generateAll().catch(console.error);
}

module.exports = BackgroundGenerator;