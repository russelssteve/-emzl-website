const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

class SEOMonitor {
  constructor() {
    this.metricsFile = path.join(__dirname, '..', 'data', 'seo-metrics.json');
    this.keywords = [
      'forex bot', 'mt5 bot', 'trading bot', 'automated trading',
      'forex robot', 'best forex bot', 'profitable trading bot'
    ];
  }

  async trackMetrics() {
    const metrics = {
      timestamp: new Date().toISOString(),
      pages: await this.countPages(),
      keywords: this.keywords.length,
      backlinks: await this.estimateBacklinks(),
      traffic: await this.estimateTraffic(),
      conversions: await this.trackConversions()
    };

    await this.saveMetrics(metrics);
    return metrics;
  }

  async countPages() {
    const publicDir = path.join(__dirname, '..', 'public');
    const files = await this.getAllHtmlFiles(publicDir);
    return files.length;
  }

  async getAllHtmlFiles(dir) {
    let files = [];
    const items = await fs.readdir(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      
      if (stat.isDirectory()) {
        const subFiles = await this.getAllHtmlFiles(fullPath);
        files = files.concat(subFiles);
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  async estimateBacklinks() {
    // Simulation - en réalité, utiliser une API comme Ahrefs ou SEMrush
    return Math.floor(Math.random() * 50) + 10;
  }

  async estimateTraffic() {
    // Simulation - en réalité, utiliser Google Analytics API
    const baseTraffic = 100;
    const growth = Math.floor(Math.random() * 50);
    return baseTraffic + growth;
  }

  async trackConversions() {
    // Simulation - tracker les clics sur CTA
    return {
      telegramClicks: Math.floor(Math.random() * 20) + 5,
      trialSignups: Math.floor(Math.random() * 10) + 2,
      conversionRate: ((Math.random() * 5) + 2).toFixed(2) + '%'
    };
  }

  async saveMetrics(metrics) {
    await fs.ensureDir(path.dirname(this.metricsFile));
    
    let history = [];
    if (await fs.pathExists(this.metricsFile)) {
      history = await fs.readJSON(this.metricsFile);
    }
    
    history.unshift(metrics);
    
    // Garder 30 jours d'historique
    if (history.length > 30) {
      history = history.slice(0, 30);
    }
    
    await fs.writeJSON(this.metricsFile, history, { spaces: 2 });
  }

  async generateReport() {
    const metrics = await fs.readJSON(this.metricsFile);
    const latest = metrics[0];
    const previous = metrics[1] || latest;
    
    const report = `
# 📊 SEO Performance Report

## Current Metrics
- **Pages**: ${latest.pages} (+${latest.pages - previous.pages})
- **Keywords**: ${latest.keywords}
- **Estimated Traffic**: ${latest.traffic}/day (+${latest.traffic - previous.traffic})
- **Conversion Rate**: ${latest.conversions.conversionRate}

## Growth Trends
- **Page Growth**: ${((latest.pages - previous.pages) / previous.pages * 100).toFixed(1)}%
- **Traffic Growth**: ${((latest.traffic - previous.traffic) / previous.traffic * 100).toFixed(1)}%

## Recommendations
${this.generateRecommendations(latest, previous)}

---
*Report generated: ${new Date().toLocaleString()}*
`;

    const reportPath = path.join(__dirname, '..', 'reports', `seo-report-${Date.now()}.md`);
    await fs.ensureDir(path.dirname(reportPath));
    await fs.writeFile(reportPath, report);
    
    return report;
  }

  generateRecommendations(current, previous) {
    const recommendations = [];
    
    if (current.pages < 200) {
      recommendations.push('- 🎯 Generate more SEO pages (target: 200+)');
    }
    
    if (current.traffic < previous.traffic) {
      recommendations.push('- 📈 Focus on high-traffic keywords');
    }
    
    if (parseFloat(current.conversions.conversionRate) < 5) {
      recommendations.push('- 🔄 Optimize conversion funnel');
    }
    
    return recommendations.join('\n') || '- ✅ All metrics looking good!';
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  const monitor = new SEOMonitor();
  monitor.trackMetrics()
    .then(() => monitor.generateReport())
    .then(report => console.log(report))
    .catch(console.error);
}

module.exports = SEOMonitor;