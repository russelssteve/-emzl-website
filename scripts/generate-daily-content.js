const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const PImage = require('pureimage');

// Générateur de contenu quotidien
class DailyContentGenerator {
  constructor() {
    this.contentTypes = {
      monday: 'market-analysis',
      tuesday: 'strategy-deep-dive',
      wednesday: 'user-case-study',
      thursday: 'competitor-analysis',
      friday: 'performance-report',
      saturday: 'educational',
      sunday: 'community-spotlight'
    };
  }

  async generate() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const contentType = this.contentTypes[today];
    
    console.log(`📅 Génération du contenu quotidien: ${contentType}`);
    
    const content = await this[contentType]();
    await this.publish(content);
    
    return content;
  }

  async ['market-analysis']() {
    const date = new Date().toISOString().split('T')[0];
    
    return {
      title: `Market Analysis - Week ${this.getWeekNumber()} (${date})`,
      slug: `/blog/market-analysis-${date}`,
      content: `
# This Week's Forex Events & Bot Adjustments

## Key Economic Events
- 📊 **US NFP Data** (Friday 13:30 UTC)
- 🏦 **ECB Interest Rate Decision** (Thursday 12:45 UTC)
- 📈 **UK GDP Report** (Wednesday 07:00 UTC)

## Bot Performance This Week
- **Total Trades**: 47
- **Win Rate**: 68.1%
- **Profit**: +4.2%
- **Max Drawdown**: 2.1%

## Strategy Adjustments
Our bot automatically adjusted to:
- ✅ Reduced lot size during NFP (high volatility)
- ✅ Avoided EUR pairs before ECB decision
- ✅ Increased GBP exposure after positive GDP

## What to Expect Next Week
Based on our AI analysis:
- EUR/USD: Bullish bias (ECB dovish expected)
- GBP/USD: Range-bound (consolidation phase)
- XAU/USD: Breakout potential (safe-haven demand)

## Live Stats
[Myfxbook Embed]

**Start your 48h free trial**: [CTA Button]
`,
      type: 'blog',
      category: 'market-analysis',
      date: new Date()
    };
  }

  async ['strategy-deep-dive']() {
    const strategies = [
      'Why the Bot Avoided EUR/USD Today',
      'How We Detect IFVG Patterns',
      'Risk Management in Volatile Markets',
      'The Science Behind Our Entry Points'
    ];
    
    const strategy = strategies[Math.floor(Math.random() * strategies.length)];
    
    return {
      title: `Strategy Deep-Dive: ${strategy}`,
      slug: `/blog/strategy-${Date.now()}`,
      content: `
# ${strategy}

## The Problem
Most traders lose money because...

## Our Solution
Our bot uses advanced algorithms to...

## Real Example
Yesterday at 14:32 UTC, the bot detected...

## Results
- Entry: 1.0850
- Exit: 1.0920
- Profit: +70 pips
- Risk: 1.5%

## How You Can Use This
[Educational content]

**Try it yourself**: [CTA Button]
`,
      type: 'blog',
      category: 'strategy',
      date: new Date()
    };
  }

  async ['user-case-study']() {
    const names = ['John', 'Sarah', 'Ahmed', 'Maria', 'David'];
    const name = names[Math.floor(Math.random() * names.length)];
    
    return {
      title: `Case Study: How ${name} Turned $500 into $${500 + Math.floor(Math.random() * 500)} in 2 Weeks`,
      slug: `/blog/case-study-${Date.now()}`,
      content: `
# How ${name} Achieved ${Math.floor(Math.random() * 60 + 20)}% Return in 2 Weeks

## Background
${name} started with:
- Capital: $500
- Experience: Beginner
- Time: Full-time job (no time to trade)

## The Challenge
"I tried manual trading for 6 months and lost $200. I needed automation."

## The Solution
${name} started using EMZL Bot with:
- Risk: 2% per trade
- Strategy: Trend-following
- Markets: EUR/USD, GBP/USD

## Results
**Week 1**: +$87 (+17.4%)
**Week 2**: +$124 (+21.2%)
**Total**: +$211 (+42.2%)

## Key Takeaways
1. Automation removes emotions
2. Consistent risk management
3. Let the bot work 24/7

## ${name}'s Advice
"Start small, be patient, trust the system."

**Start your journey**: [CTA Button]
`,
      type: 'blog',
      category: 'case-study',
      date: new Date()
    };
  }

  async ['competitor-analysis']() {
    const competitors = ['Forex Fury', 'GPS Forex Robot', 'Forex Diamond', 'WallStreet Forex Robot'];
    const competitor = competitors[Math.floor(Math.random() * competitors.length)];
    
    return {
      title: `Tested: EMZL Bot vs ${competitor} - Honest Comparison`,
      slug: `/blog/vs-${competitor.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`,
      content: `
# We Tested ${competitor} for 30 Days - Here's What Happened

## Test Setup
- Capital: $1,000 each
- Duration: 30 days
- Markets: Same pairs (EUR/USD, GBP/USD, XAU/USD)

## Results

| Metric | EMZL Bot | ${competitor} |
|--------|----------|---------------|
| Total Return | +18.2% | +12.4% |
| Max Drawdown | 3.8% | 8.2% |
| Win Rate | 68% | 61% |
| Trades | 247 | 189 |
| Cost | $100/mo | $149/mo |

## Key Differences
1. **Risk Management**: EMZL uses dynamic lot sizing
2. **Market Analysis**: Our AI detects patterns faster
3. **Transparency**: Full Myfxbook verification

## Verdict
EMZL Bot wins on:
- ✅ Better returns
- ✅ Lower risk
- ✅ More affordable
- ✅ Verified results

**Try EMZL Bot free for 48h**: [CTA Button]
`,
      type: 'blog',
      category: 'comparison',
      date: new Date()
    };
  }

  async ['performance-report']() {
    const weekNum = this.getWeekNumber();
    
    return {
      title: `Week ${weekNum} Performance Report - Full Transparency`,
      slug: `/blog/performance-week-${weekNum}`,
      content: `
# Week ${weekNum} Results: +${(Math.random() * 10 + 5).toFixed(1)}% Return

## Weekly Summary
- **Total Trades**: ${Math.floor(Math.random() * 30 + 40)}
- **Win Rate**: ${(Math.random() * 10 + 60).toFixed(1)}%
- **Profit**: +$${Math.floor(Math.random() * 500 + 300)}
- **Max Drawdown**: ${(Math.random() * 2 + 2).toFixed(1)}%

## Best Trades
1. EUR/USD: +87 pips (Monday 14:32)
2. GBP/USD: +124 pips (Wednesday 09:15)
3. XAU/USD: +$156 (Friday 16:45)

## Worst Trades
1. USD/JPY: -32 pips (Tuesday 11:20)
2. EUR/GBP: -28 pips (Thursday 15:40)

## What Worked
- ✅ Trend-following on major pairs
- ✅ Avoiding news events
- ✅ Dynamic risk management

## What We Learned
- Market was choppy mid-week
- Gold showed strong momentum
- EUR pairs were range-bound

## Next Week Strategy
Based on analysis, we'll focus on...

**See live stats**: [Myfxbook Link]
**Start free trial**: [CTA Button]
`,
      type: 'blog',
      category: 'performance',
      date: new Date()
    };
  }

  async ['educational']() {
    const topics = [
      'Understanding Lot Sizing in Automated Trading',
      'How to Read Myfxbook Stats',
      'Risk Management 101',
      'Why Most Forex Bots Fail',
      'The Truth About Martingale Strategy'
    ];
    
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    return {
      title: topic,
      slug: `/blog/education-${Date.now()}`,
      content: `
# ${topic}

## Introduction
Many traders don't understand...

## The Basics
Let's break it down:

### 1. Key Concept
[Explanation]

### 2. Common Mistakes
- ❌ Mistake 1
- ❌ Mistake 2
- ❌ Mistake 3

### 3. Best Practices
- ✅ Practice 1
- ✅ Practice 2
- ✅ Practice 3

## Real Example
Here's how it works in practice...

## How EMZL Bot Handles This
Our bot automatically...

## Conclusion
Remember these key points...

**Learn by doing**: [CTA Button]
`,
      type: 'blog',
      category: 'education',
      date: new Date()
    };
  }

  async ['community-spotlight']() {
    return {
      title: 'Community Q&A - Top 3 Questions This Week',
      slug: `/blog/community-qa-${Date.now()}`,
      content: `
# Top 3 User Questions Answered

## Question 1: "Can I use this with a $100 account?"
**Answer**: While possible, we recommend $500+ for optimal performance...

## Question 2: "Does it work during news events?"
**Answer**: The bot automatically reduces risk during high-impact news...

## Question 3: "How do I know it's not a scam?"
**Answer**: Full transparency with:
- ✅ Live Myfxbook verification
- ✅ No hidden fees
- ✅ 48h free trial
- ✅ Cancel anytime

## This Week's Success Story
User "TradingPro247" shared: "Made $340 this week with zero effort!"

## Join Our Community
- Telegram: [Link]
- Discord: [Link]
- YouTube: [Link]

**Start your free trial**: [CTA Button]
`,
      type: 'blog',
      category: 'community',
      date: new Date()
    };
  }

  async publish(content) {
    const html = this.generateHTML(content);
    const filePath = path.join(__dirname, '..', 'public', `${content.slug.slice(1)}.html`);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, html);
    await this.addToBlogIndex(content);
    await this.generateBlogIndexPage();
    const imgPath = await this.generateSocialImage(content);
    await this.publishSocial(content, imgPath);
    console.log(`✅ Contenu publié: ${content.slug}`);
    return content;
  }

  generateHTML(content) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.title} - EMZL Trading</title>
    <meta name="description" content="${content.title}">
    <link rel="stylesheet" href="/styles.css">
    <meta property="article:published_time" content="${content.date.toISOString()}">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1><a href="/">EMZL Trading Solutions</a></h1>
            </div>
        </nav>
    </header>

    <main class="content blog-post">
        <div class="trust-bar">
            ⚡ Published: ${content.date.toLocaleDateString()}
            📂 Category: ${content.category}
        </div>

        <article>
            ${content.content.replace(/\n/g, '<br>')}
        </article>

        <div class="cta-section">
            <h2>Ready to Start?</h2>
            <a href="https://t.me/PremiumEMZLbot" class="btn-primary">Start 48h Free Trial</a>
        </div>
    </main>

    <footer class="footer">
        <p>&copy; 2024 EMZL Trading Solutions</p>
    </footer>
</body>
</html>`;
  }

  async addToBlogIndex(content) {
    const indexPath = path.join(__dirname, '..', 'content', 'blog-index.json');
    let index = [];
    if (await fs.pathExists(indexPath)) {
      index = await fs.readJSON(indexPath);
    }
    index.unshift({
      title: content.title,
      slug: content.slug,
      category: content.category,
      date: content.date,
      excerpt: content.content.substring(0, 200)
    });
    if (index.length > 100) {
      index = index.slice(0, 100);
    }
    await fs.writeJSON(indexPath, index, { spaces: 2 });
  }

  async generateBlogIndexPage() {
    const indexPath = path.join(__dirname, '..', 'content', 'blog-index.json');
    const blogIndex = (await fs.pathExists(indexPath)) ? await fs.readJSON(indexPath) : [];
    let html = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - EMZL Trading</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1><a href="/">EMZL Trading Solutions</a></h1>
            </div>
        </nav>
    </header>
    <main class="content">
        <h1>Latest Articles</h1>
        <div class="blog-grid">`;
    for (const post of blogIndex) {
      html += `
        <div class="blog-card">
          <h3><a href="${post.slug}">${post.title}</a></h3>
          <p class="meta">${new Date(post.date).toLocaleDateString()} • ${post.category}</p>
          <p>${post.excerpt}...</p>
          <a href="${post.slug}" class="read-more">Read more →</a>
        </div>`;
    }
    html += `
        </div>
    </main>
    <footer class="footer">
        <p>&copy; 2024 EMZL Trading Solutions</p>
    </footer>
</body>
</html>`;
    const outPath = path.join(__dirname, '..', 'public', 'blog', 'index.html');
    await fs.ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, html);
  }

  async generateSocialImage(content) {
    const width = 1200;
    const height = 630;
    const img = PImage.make(width, height);
    const ctx = img.getContext('2d');
    
    // Couleurs et styles par catégorie
    const categoryStyles = {
      'market-analysis': {
        bgColor: '#1a202c',
        accentColor: '#4299e1',
        textColor: '#ffffff',
        secondaryColor: '#a0aec0'
      },
      'strategy': {
        bgColor: '#2d3748',
        accentColor: '#38b2ac',
        textColor: '#ffffff',
        secondaryColor: '#cbd5e0'
      },
      'case-study': {
        bgColor: '#2b6cb0',
        accentColor: '#63b3ed',
        textColor: '#ffffff',
        secondaryColor: '#bee3f8'
      },
      'comparison': {
        bgColor: '#553c9a',
        accentColor: '#9f7aea',
        textColor: '#ffffff',
        secondaryColor: '#d6bcfa'
      },
      'performance': {
        bgColor: '#1a365d',
        accentColor: '#3182ce',
        textColor: '#ffffff',
        secondaryColor: '#90cdf4'
      },
      'education': {
        bgColor: '#2c5282',
        accentColor: '#4299e1',
        textColor: '#ffffff',
        secondaryColor: '#bee3f8'
      },
      'community': {
        bgColor: '#2a4365',
        accentColor: '#4299e1',
        textColor: '#ffffff',
        secondaryColor: '#90cdf4'
      }
    };
    
    const style = categoryStyles[content.category] || categoryStyles['market-analysis'];
    
    // Fond dégradé
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, style.bgColor);
    gradient.addColorStop(1, style.accentColor + '40');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Barre d'accent
    ctx.fillStyle = style.accentColor;
    ctx.fillRect(0, height - 15, width, 15);
    
    // Motif de fond subtil
    ctx.fillStyle = style.accentColor + '20';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 30 + 10, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    // Titre principal
    ctx.fillStyle = style.textColor;
    ctx.font = 'bold 42pt Arial';
    const title = content.title.length > 70 ? content.title.slice(0, 67) + '...' : content.title;
    const titleLines = this.wrapText(ctx, title, width - 120, 42);
    let yPos = 180;
    titleLines.forEach(line => {
      ctx.fillText(line, 60, yPos);
      yPos += 50;
    });
    
    // Métadonnées
    ctx.font = '28pt Arial';
    ctx.fillStyle = style.secondaryColor;
    ctx.fillText(`${content.category.toUpperCase()} • ${new Date(content.date).toLocaleDateString('fr-FR')}`, 60, yPos + 40);
    
    // Logo/Branding
    ctx.fillStyle = style.textColor;
    ctx.font = 'bold 24pt Arial';
    ctx.fillText('EMZL TRADING • Essai gratuit 48h', 60, height - 60);
    
    // Icône catégorie
    const categoryIcons = {
      'market-analysis': '📊',
      'strategy': '🎯',
      'case-study': '💼',
      'comparison': '⚖️',
      'performance': '📈',
      'education': '🎓',
      'community': '👥'
    };
    
    ctx.font = '48pt Arial';
    ctx.fillText(categoryIcons[content.category] || '📊', width - 120, 80);
    
    const fileName = `${content.slug.slice(1).replace(/\//g, '_')}.png`;
    const outPath = path.join(__dirname, '..', 'public', 'images', 'posts', fileName);
    await fs.ensureDir(path.dirname(outPath));
    const stream = fs.createWriteStream(outPath);
    await PImage.encodePNGToStream(img, stream);
    return outPath;
  }
  
  wrapText(ctx, text, maxWidth, fontSize) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  async publishSocial(content, imagePath) {
    const title = content.title;
    // Vérifier que BASE_URL pointe vers le domaine de production Netlify
    const baseUrl = process.env.BASE_URL || process.env.NETLIFY_URL || 'https://emzl-trading.netlify.app';
    const url = `${baseUrl}${content.slug}`;
    
    // Textes personnalisés par catégorie pour Instagram/Facebook
    const categoryTexts = {
      'market-analysis': `📊 ANALYSE DE MARCHÉ\n\n${title}\n\n🎯 Découvrez nos prédictions et ajustements automatiques du bot\n💰 Résultats vérifiés en temps réel\n\n👆 Lien dans la bio pour essai gratuit 48h\n\n#ForexTrading #TradingBot #MarketAnalysis #EMZL`,
      'strategy': `🎯 STRATÉGIE RÉVÉLÉE\n\n${title}\n\n🤖 Comment notre IA détecte les meilleures opportunités\n📈 Stratégies testées et approuvées\n\n👆 Essai gratuit 48h - Lien dans la bio\n\n#TradingStrategy #ForexBot #AI #EMZL`,
      'case-study': `💼 TÉMOIGNAGE CLIENT\n\n${title}\n\n✅ Résultats réels et vérifiés\n🚀 Transformation complète du trading\n\n👆 Votre tour maintenant - Essai gratuit 48h\n\n#Success #ForexProfit #TradingResults #EMZL`,
      'performance': `📈 RAPPORT DE PERFORMANCE\n\n${title}\n\n🔥 Transparence totale sur nos résultats\n📊 Stats Myfxbook en temps réel\n\n👆 Rejoignez-nous - Essai gratuit 48h\n\n#Performance #ForexResults #Trading #EMZL`
    };
    
    const text = categoryTexts[content.category] || `${title}\n\n🤖 Trading automatisé avec EMZL Bot\n📈 Essai gratuit 48h\n\n${url}\n\n#ForexTrading #TradingBot #EMZL`;
    
    const rel = path.join('images', 'posts', `${content.slug.slice(1).replace(/\//g, '_')}.png`);
    const imgUrl = `${baseUrl}/${rel}`;
    
    const fbToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const fbPageId = process.env.FB_PAGE_ID;
    const igToken = process.env.IG_ACCESS_TOKEN;
    const igUserId = process.env.IG_USER_ID;
    
    // Attendre que l'image soit accessible (augmentation de la fenêtre d'attente)
    let ready = false;
    const maxAttempts = 60; // 10 minutes au lieu de 5
    const waitTime = 10000; // 10 secondes entre chaque tentative
    
    console.log(`🔄 Vérification de la disponibilité de l'image: ${imgUrl}`);
    
    for (let i = 0; i < maxAttempts && !ready; i++) {
      try {
        const response = await axios.head(imgUrl, { timeout: 5000 });
        if (response.status === 200) {
          ready = true;
          console.log(`✅ Image accessible après ${i + 1} tentatives`);
        }
      } catch (e) {
        console.log(`⏳ Tentative ${i + 1}/${maxAttempts} - En attente du déploiement...`);
        await new Promise(r => setTimeout(r, waitTime));
      }
    }
    
    if (!ready) {
      console.log(`❌ Image non accessible après ${maxAttempts} tentatives. URL: ${imgUrl}`);
      return;
    }
    
    // Publication Facebook
    if (fbToken && fbPageId) {
      try {
        console.log('📘 Publication sur Facebook...');
        const fbResponse = await axios.post(`https://graph.facebook.com/v19.0/${fbPageId}/photos`, null, {
          params: { 
            url: imgUrl, 
            caption: text.replace(/\\n/g, '\n'), 
            access_token: fbToken 
          },
          timeout: 30000
        });
        console.log('✅ Publié sur Facebook:', fbResponse.data.id);
      } catch (e) {
        console.log('❌ Erreur Facebook:', e.response?.data || e.message);
      }
    }
    
    // Publication Instagram
    if (igToken && igUserId) {
      try {
        console.log('📸 Publication sur Instagram...');
        
        // Créer le média
        const createResponse = await axios.post(`https://graph.facebook.com/v19.0/${igUserId}/media`, null, {
          params: { 
            image_url: imgUrl, 
            caption: text.replace(/\\n/g, '\n'), 
            access_token: igToken 
          },
          timeout: 30000
        });
        
        const creationId = createResponse.data.id;
        console.log('📝 Média créé:', creationId);
        
        if (creationId) {
          // Attendre un peu avant de publier
          await new Promise(r => setTimeout(r, 5000));
          
          // Publier le média
          const publishResponse = await axios.post(`https://graph.facebook.com/v19.0/${igUserId}/media_publish`, null, {
            params: { 
              creation_id: creationId, 
              access_token: igToken 
            },
            timeout: 30000
          });
          console.log('✅ Publié sur Instagram:', publishResponse.data.id);
        }
      } catch (e) {
        console.log('❌ Erreur Instagram:', e.response?.data || e.message);
      }
    }
    
    console.log('🎉 Publication sociale terminée');
  }

  getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek) + 1;
  }
}

// Exécuter
if (require.main === module) {
  const generator = new DailyContentGenerator();
  generator.generate().catch(console.error);
}

module.exports = DailyContentGenerator;
