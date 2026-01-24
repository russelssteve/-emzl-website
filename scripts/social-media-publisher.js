const fs = require('fs');
const path = require('path');

class SocialMediaPublisher {
  constructor() {
    this.facebookPageId = process.env.FACEBOOK_PAGE_ID || "148132659701909";
    this.facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN || "EAAMxu4tMwcQBQukKfDsZAqOtHFnVd2kEqJgqyuBu6jE7ySrsHD9QyStJyQb5szYf6rdMRHCZAEhusObpODXzK88yxymUmAI6kIF6tWVVPswo8goHfS9sl4ARXZAie32PAmGx5pf1Ci3YXJaj9Yi0lhJS3UnCPpDJ619XUaEfz1MQfK9lbQ4SvxLV6TwpeqbcyRmlkhv0JZBPfQOJ4FP2jBSIeS8S0VKMKZA1yHzZAYTbZB3jIgbRSVLYwY1VoyFALRIH4gts4b1aiaAiaDmTjA8";
    this.instagramBusinessId = process.env.INSTAGRAM_BUSINESS_ID || "2357461007992553";
    this.instagramAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN || "IGAAhgGSn0BulBZAGFvbkNEcUhYQmRiRE90VWNyYkxZAOWxTSVZAmSHVYYjdiRFl2aUtLYk5OTWp2dEcwSUNSU3lrNl9uZAmF2ZAkp1VjFMR2ZAic2t2ZAmotaEdPa3RjQk4tUHpNTWw4Q2FDZA3lVZAnppSnVWS3V4SUJmdFdSVHJfRlVRTQZDZD";
  }

  async publishLatestArticle() {
    try {
      console.log('📱 Démarrage publication réseaux sociaux...');
      
      // Lire le dernier article généré
      const blogIndexPath = path.join(process.cwd(), 'content', 'blog-index.json');
      
      let articles = [];
      if (fs.existsSync(blogIndexPath)) {
        articles = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));
      }
      
      if (articles.length === 0) {
        console.log('⚠️ Aucun article trouvé pour publication');
        return false;
      }
      
      const latestArticle = articles[0];
      console.log(`📝 Article à publier: ${latestArticle.title}`);
      
      // Publier sur Facebook et Instagram
      const results = await Promise.allSettled([
        this.publishToFacebook(latestArticle),
        this.publishToInstagram(latestArticle)
      ]);
      
      const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
      console.log(`✅ Publié sur ${successCount}/2 plateformes`);
      
      return successCount > 0;
    } catch (error) {
      console.error('❌ Erreur publication réseaux sociaux:', error);
      return false;
    }
  }

  async publishToFacebook(article) {
    try {
      const axios = require('axios');
      
      const postText = this.generatePostText(article);
      
      const response = await axios.post(`https://graph.facebook.com/v18.0/${this.facebookPageId}/feed`, {
        message: postText,
        access_token: this.facebookAccessToken
      });
      
      console.log('✅ Publié sur Facebook:', response.data.id);
      return true;
    } catch (error) {
      console.error('❌ Erreur Facebook:', error.response?.data || error.message);
      return false;
    }
  }

  async publishToInstagram(article) {
    try {
      const axios = require('axios');
      
      const postText = this.generatePostText(article);
      
      // Créer un media container
      const mediaResponse = await axios.post(`https://graph.facebook.com/v18.0/${this.instagramBusinessId}/media`, {
        image_url: 'https://via.placeholder.com/1080x1080/667eea/ffffff?text=EMZL+Trading',
        caption: postText,
        access_token: this.instagramAccessToken
      });
      
      const mediaId = mediaResponse.data.id;
      
      // Publier le media
      const publishResponse = await axios.post(`https://graph.facebook.com/v18.0/${this.instagramBusinessId}/media_publish`, {
        creation_id: mediaId,
        access_token: this.instagramAccessToken
      });
      
      console.log('✅ Publié sur Instagram:', publishResponse.data.id);
      return true;
    } catch (error) {
      console.error('❌ Erreur Instagram:', error.response?.data || error.message);
      return false;
    }
  }

  generatePostText(article) {
    const hashtags = [
      '#forex', '#trading', '#bot', '#automation', '#mt5',
      '#emzl', '#tradingbot', '#forexbot', '#copytrading',
      '#investment', '#finance', '#money', '#profit'
    ];
    
    const text = `🚀 ${article.title}

${article.excerpt}

🎯 Essai gratuit 48h sans carte bancaire
📱 t.me/PremiumEMZLbot

${hashtags.join(' ')}`;

    return text;
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  const publisher = new SocialMediaPublisher();
  publisher.publishLatestArticle()
    .then((success) => {
      if (success) {
        console.log('✅ Publication réseaux sociaux terminée avec succès');
        process.exit(0);
      } else {
        console.log('⚠️ Publication terminée avec avertissements');
        process.exit(0);
      }
    })
    .catch((error) => {
      console.error('❌ Erreur:', error);
      process.exit(0); // Ne pas faire échouer GitHub Actions
    });
}

module.exports = SocialMediaPublisher;