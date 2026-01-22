const fs = require('fs-extra');
const path = require('path');

class SEOOptimizer {
  constructor() {
    this.keywords = {
      primary: ['forex bot', 'mt5 bot', 'trading bot', 'automated trading'],
      secondary: ['forex robot', 'ea trading', 'algorithmic trading', 'copy trading'],
      longtail: ['best forex bot 2024', 'profitable mt5 bot', 'automated forex trading system']
    };
  }

  // Générer meta tags optimisés
  generateMetaTags(title, description, keywords, url) {
    return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords.join(', ')}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${url}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="/images/og-image.jpg">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="/images/twitter-card.jpg">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "EMZL Trading Bot",
      "description": "${description}",
      "url": "${url}",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "MetaTrader 5",
      "offers": {
        "@type": "Offer",
        "price": "100",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "247"
      }
    }
    </script>`;
  }

  // Optimiser le contenu pour SEO
  optimizeContent(content, targetKeyword) {
    // Densité de mots-clés optimale (1-2%)
    const wordCount = content.split(' ').length;
    const targetDensity = Math.floor(wordCount * 0.015); // 1.5%
    
    // Ajouter des variations du mot-clé
    const variations = this.getKeywordVariations(targetKeyword);
    
    return {
      optimizedContent: content,
      keywordDensity: targetDensity,
      variations: variations,
      wordCount: wordCount
    };
  }

  getKeywordVariations(keyword) {
    const variations = {
      'forex bot': ['forex robot', 'fx bot', 'currency bot', 'forex EA'],
      'trading bot': ['trading robot', 'auto trader', 'algorithmic trading'],
      'mt5 bot': ['metatrader 5 bot', 'mt5 robot', 'mt5 EA', 'metatrader bot']
    };
    
    return variations[keyword] || [keyword];
  }
}

module.exports = SEOOptimizer;