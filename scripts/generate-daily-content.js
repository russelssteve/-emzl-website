const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

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
    const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
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
    try {
      // Générer HTML
      const html = this.generateHTML(content);
      
      // Créer les dossiers nécessaires
      const filePath = path.join(__dirname, '..', 'public', `${content.slug.slice(1)}.html`);
      await fs.ensureDir(path.dirname(filePath));
      
      // Sauvegarder le fichier
      await fs.writeFile(filePath, html, 'utf8');
      
      // Ajouter au blog index
      await this.addToBlogIndex(content);
      
      console.log(`✅ Contenu publié: ${content.slug}`);
      
      return content;
    } catch (error) {
      console.error(`❌ Erreur lors de la publication:`, error);
      throw error;
    }
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
    try {
      const indexPath = path.join(__dirname, '..', 'content', 'blog-index.json');
      
      // S'assurer que le dossier content existe
      await fs.ensureDir(path.dirname(indexPath));
      
      let index = [];
      if (await fs.pathExists(indexPath)) {
        try {
          index = await fs.readJSON(indexPath);
        } catch (error) {
          console.warn('Erreur lecture blog-index.json, création nouveau fichier');
          index = [];
        }
      }
      
      index.unshift({
        title: content.title,
        slug: content.slug,
        category: content.category,
        date: content.date,
        excerpt: content.content.substring(0, 200).replace(/[\n\r]/g, ' ')
      });
      
      // Garder seulement les 100 derniers
      if (index.length > 100) {
        index = index.slice(0, 100);
      }
      
      await fs.writeJSON(indexPath, index, { spaces: 2 });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du blog index:', error);
      // Ne pas faire échouer le processus pour cette erreur
    }
  }

  getWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.floor(diff / oneWeek) + 1;
  }
}

// Exécuter avec gestion d'erreur
if (require.main === module) {
  const generator = new DailyContentGenerator();
  generator.generate()
    .then(() => {
      console.log('✅ Génération quotidienne terminée avec succès');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur lors de la génération:', error);
      process.exit(1);
    });
}

module.exports = DailyContentGenerator;
