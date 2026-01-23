const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

class SocialMediaPublisher {
  constructor() {
    this.facebookPageId = process.env.FACEBOOK_PAGE_ID;
    this.facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    this.instagramBusinessId = process.env.INSTAGRAM_BUSINESS_ID;
    
    this.templates = {
      'market-analysis': {
        background: '#1a1f3a',
        accent: '#667eea',
        icon: '📊',
        title: 'ANALYSE DE MARCHÉ'
      },
      'strategy-deep-dive': {
        background: '#2d1b69',
        accent: '#764ba2',
        icon: '🎯',
        title: 'STRATÉGIE TRADING'
      },
      'user-case-study': {
        background: '#0f4c75',
        accent: '#3282b8',
        icon: '💰',
        title: 'SUCCESS STORY'
      },
      'competitor-analysis': {
        background: '#8b5a3c',
        accent: '#f4a261',
        icon: '⚔️',
        title: 'VS CONCURRENTS'
      },
      'performance-report': {
        background: '#2f5233',
        accent: '#52b788',
        icon: '📈',
        title: 'PERFORMANCE'
      },
      'educational': {
        background: '#6a4c93',
        accent: '#c77dff',
        icon: '🎓',
        title: 'ÉDUCATION'
      },
      'community-spotlight': {
        background: '#d62828',
        accent: '#f77f00',
        icon: '👥',
        title: 'COMMUNAUTÉ'
      }
    };
  }

  async generatePostImage(article) {
    const template = this.templates[article.category] || this.templates['market-analysis'];
    
    // Créer un canvas 1080x1080 (format Instagram)
    const canvas = createCanvas(1080, 1080);
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, template.background);
    gradient.addColorStop(1, template.accent);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Logo/Brand area
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, 1080, 120);
    
    // Logo text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('EMZL TRADING', 540, 75);

    // Icon
    ctx.font = '120px Arial';
    ctx.fillText(template.icon, 540, 280);

    // Category
    ctx.fillStyle = template.accent;
    ctx.fillRect(140, 320, 800, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(template.title, 540, 370);

    // Title (multiline)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    
    const title = article.title;
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 900 && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());

    let startY = 480;
    lines.forEach((line, index) => {
      ctx.fillText(line, 540, startY + (index * 55));
    });

    // Key points
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Arial';
    ctx.textAlign = 'left';
    
    const keyPoints = this.extractKeyPoints(article.content);
    keyPoints.forEach((point, index) => {
      const y = 680 + (index * 45);
      ctx.fillText('✓ ' + point, 140, y);
    });

    // CTA
    ctx.fillStyle = template.accent;
    ctx.fillRect(140, 920, 800, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🚀 ESSAI GRATUIT 48H', 540, 970);

    // Date
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '24px Arial';
    ctx.textAlign = 'right';
    const date = new Date().toLocaleDateString('fr-FR');
    ctx.fillText(date, 940, 1050);

    return canvas.toBuffer('image/png');
  }

  extractKeyPoints(content) {
    // Extraire les points clés du contenu
    const lines = content.split('\n');
    const points = [];
    
    for (const line of lines) {
      if (line.includes('✅') || line.includes('•') || line.includes('-')) {
        const cleanLine = line.replace(/[✅•-]/g, '').trim();
        if (cleanLine.length > 10 && cleanLine.length < 60) {
          points.push(cleanLine);
        }
      }
    }
    
    return points.slice(0, 4); // Max 4 points
  }

  async publishToFacebook(article, imageBuffer) {
    try {
      const FormData = require('form-data');
      const axios = require('axios');
      
      // Upload image
      const formData = new FormData();
      formData.append('source', imageBuffer, { filename: 'post.png' });
      formData.append('access_token', this.facebookAccessToken);
      
      const uploadResponse = await axios.post(
        `https://graph.facebook.com/v18.0/${this.facebookPageId}/photos`,
        formData,
        { headers: formData.getHeaders() }
      );
      
      const photoId = uploadResponse.data.id;
      
      // Create post
      const postText = this.generatePostText(article);
      
      await axios.post(`https://graph.facebook.com/v18.0/${this.facebookPageId}/feed`, {
        message: postText,
        object_attachment: photoId,
        access_token: this.facebookAccessToken
      });
      
      console.log('✅ Publié sur Facebook');
      return true;
    } catch (error) {
      console.error('❌ Erreur Facebook:', error.message);
      return false;
    }
  }

  async publishToInstagram(article, imageBuffer) {
    try {
      const axios = require('axios');
      const FormData = require('form-data');
      
      // Upload image to Instagram
      const formData = new FormData();
      formData.append('image', imageBuffer, { filename: 'post.png' });
      formData.append('caption', this.generatePostText(article));
      formData.append('access_token', this.facebookAccessToken);
      
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/${this.instagramBusinessId}/media`,
        formData,
        { headers: formData.getHeaders() }
      );
      
      const mediaId = response.data.id;
      
      // Publish the media
      await axios.post(`https://graph.facebook.com/v18.0/${this.instagramBusinessId}/media_publish`, {
        creation_id: mediaId,
        access_token: this.facebookAccessToken
      });
      
      console.log('✅ Publié sur Instagram');
      return true;
    } catch (error) {
      console.error('❌ Erreur Instagram:', error.message);
      return false;
    }
  }

  generatePostText(article) {
    const hashtags = [
      '#forex', '#trading', '#bot', '#automation', '#mt5',
      '#emzl', '#tradingbot', '#forexbot', '#copytrading',
      '#investment', '#finance', '#money', '#profit'
    ];
    
    const text = `${article.title}

${article.excerpt}

🚀 Essai gratuit 48h sans carte bancaire
📱 t.me/PremiumEMZLbot

${hashtags.join(' ')}`;

    return text;
  }

  async publishArticle(article) {
    try {
      console.log(`📱 Publication sur les réseaux sociaux: ${article.title}`);
      
      // Générer l'image
      const imageBuffer = await this.generatePostImage(article);
      
      // Sauvegarder l'image localement (optionnel)
      const imagePath = path.join(process.cwd(), 'public', 'social-images', `${article.category}-${Date.now()}.png`);
      await fs.promises.mkdir(path.dirname(imagePath), { recursive: true });
      await fs.promises.writeFile(imagePath, imageBuffer);
      
      // Publier sur Facebook et Instagram
      const results = await Promise.allSettled([
        this.publishToFacebook(article, imageBuffer),
        this.publishToInstagram(article, imageBuffer)
      ]);
      
      const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
      console.log(`✅ Publié sur ${successCount}/2 plateformes`);
      
      return successCount > 0;
    } catch (error) {
      console.error('❌ Erreur publication réseaux sociaux:', error);
      return false;
    }
  }
}

module.exports = SocialMediaPublisher;