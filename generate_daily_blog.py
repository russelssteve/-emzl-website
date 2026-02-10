#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Génération automatique d'articles de blog quotidiens"""

import random
from datetime import datetime
from pathlib import Path

BLOG_DIR = Path(__file__).parent / 'public' / 'blog'

TOPICS = [
    {
        'title': 'Analyse du Marché Forex - {date}',
        'content': '''
        <h2>Analyse Quotidienne du Marché</h2>
        <p>Aujourd'hui, les marchés forex montrent des tendances intéressantes. Balt Bot IA a identifié plusieurs opportunités de trading basées sur l'analyse technique avancée.</p>
        
        <h3>Points Clés du Jour</h3>
        <ul>
            <li>EUR/USD: Tendance haussière confirmée</li>
            <li>GBP/USD: Zone de support identifiée</li>
            <li>XAU/USD: Volatilité accrue</li>
        </ul>
        
        <h3>Stratégie Recommandée</h3>
        <p>Notre IA recommande une approche prudente avec des stops serrés. Les zones IFVG identifiées offrent d'excellents points d'entrée.</p>
        '''
    },
    {
        'title': 'Performance Hebdomadaire - Semaine du {date}',
        'content': '''
        <h2>Résultats de la Semaine</h2>
        <p>Balt Bot IA a réalisé une excellente performance cette semaine avec un taux de réussite élevé.</p>
        
        <h3>Statistiques</h3>
        <ul>
            <li>Trades gagnants: 85%</li>
            <li>Ratio Risk/Reward moyen: 1:3</li>
            <li>Paires les plus performantes: EUR/USD, GBP/JPY</li>
        </ul>
        
        <h3>Leçons Apprises</h3>
        <p>L'importance de respecter les zones de support et résistance identifiées par l'IA.</p>
        '''
    },
    {
        'title': 'Stratégie du Jour: IFVG et MSP - {date}',
        'content': '''
        <h2>Focus sur les IFVG</h2>
        <p>Aujourd'hui, nous explorons comment Balt Bot IA utilise les Inverted Fair Value Gaps pour maximiser les profits.</p>
        
        <h3>Qu'est-ce qu'un IFVG?</h3>
        <p>Un IFVG est une zone où le prix a laissé un gap qui sera probablement comblé. Notre IA les détecte automatiquement.</p>
        
        <h3>Application Pratique</h3>
        <p>Balt Bot IA a identifié 3 IFVG majeurs aujourd'hui sur EUR/USD, offrant d'excellentes opportunités d'entrée.</p>
        '''
    },
    {
        'title': 'Conseils de Trading - {date}',
        'content': '''
        <h2>Conseils du Jour</h2>
        <p>Quelques recommandations pour optimiser votre trading avec Balt Bot IA.</p>
        
        <h3>Gestion du Risque</h3>
        <ul>
            <li>Ne risquez jamais plus de 1-2% par trade</li>
            <li>Utilisez toujours un stop loss</li>
            <li>Laissez l'IA gérer vos positions</li>
        </ul>
        
        <h3>Patience et Discipline</h3>
        <p>Le trading automatique nécessite de la patience. Faites confiance à l'algorithme et évitez les interventions manuelles.</p>
        '''
    },
    {
        'title': 'Actualités Forex - {date}',
        'content': '''
        <h2>Événements Économiques du Jour</h2>
        <p>Plusieurs événements économiques importants aujourd'hui qui peuvent impacter les marchés.</p>
        
        <h3>Calendrier Économique</h3>
        <ul>
            <li>14h30: Publication des données NFP (USD)</li>
            <li>16h00: Décision de taux BCE (EUR)</li>
            <li>18h00: Discours de la Fed (USD)</li>
        </ul>
        
        <h3>Impact sur le Trading</h3>
        <p>Balt Bot IA ajuste automatiquement ses stratégies en fonction de la volatilité accrue pendant ces événements.</p>
        '''
    }
]

def generate_daily_article():
    """Génère un article quotidien"""
    today = datetime.now()
    date_str = today.strftime('%Y-%m-%d')
    date_display = today.strftime('%d/%m/%Y')
    
    # Choisir un topic aléatoire
    topic = random.choice(TOPICS)
    title = topic['title'].format(date=date_display)
    content = topic['content']
    
    # Créer le slug
    slug = title.lower().replace(' ', '-').replace(':', '').replace('/', '-')
    slug = f"{slug}-{date_str}"
    
    # HTML complet
    html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Balt Bot IA</title>
    <meta name="description" content="{title} - Trading automatique avec intelligence artificielle">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', sans-serif; background: #0a0e27; color: #fff; line-height: 1.8; }}
        .container {{ max-width: 800px; margin: 0 auto; padding: 40px 20px; }}
        header {{ background: rgba(10, 14, 39, 0.95); padding: 20px 0; position: fixed; width: 100%; top: 0; z-index: 1000; }}
        nav {{ max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }}
        .logo {{ font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        article {{ margin-top: 120px; }}
        h1 {{ font-size: 42px; margin-bottom: 20px; line-height: 1.2; }}
        .meta {{ color: #a0aec0; margin-bottom: 40px; }}
        h2 {{ font-size: 32px; margin: 40px 0 20px; color: #667eea; }}
        h3 {{ font-size: 24px; margin: 30px 0 15px; }}
        p {{ margin-bottom: 20px; color: #cbd5e0; }}
        ul {{ margin: 20px 0 20px 40px; }}
        li {{ margin-bottom: 10px; color: #cbd5e0; }}
        .cta {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; margin: 40px 0; text-align: center; }}
        .cta h3 {{ color: #fff; margin-bottom: 15px; }}
        .btn {{ display: inline-block; padding: 15px 30px; background: #fff; color: #667eea; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 15px; }}
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">🤖 Balt Bot IA</div>
            <a href="index.html" style="color: #fff; text-decoration: none;">← Retour au Blog</a>
        </nav>
    </header>
    <div class="container">
        <article>
            <h1>{title}</h1>
            <div class="meta">Publié le {date_display} | Par Balt Bot IA</div>
            {content}
            
            <div class="cta">
                <h3>🎁 Essayez Balt Bot IA Gratuitement</h3>
                <p>Testez notre système de trading automatique pendant 48h sans engagement</p>
                <a href="../../index.html" class="btn">Commencer l'Essai Gratuit</a>
            </div>
        </article>
    </div>
</body>
</html>'''
    
    # Sauvegarder
    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    filepath = BLOG_DIR / f"{slug}.html"
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"Article cree: {filepath.name}")
    return filepath.name, title

def update_blog_index():
    """Met à jour l'index du blog avec tous les articles"""
    articles = []
    
    for html_file in sorted(BLOG_DIR.glob('*.html'), reverse=True):
        if html_file.name == 'index.html':
            continue
        
        # Extraire le titre
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            if '<h1>' in content:
                title = content.split('<h1>')[1].split('</h1>')[0]
                articles.append((html_file.name, title))
    
    # Générer l'index
    articles_html = '\n'.join([
        f'<div class="blog-card"><h2>{title}</h2><a href="{filename}">Lire l\'article →</a></div>'
        for filename, title in articles
    ])
    
    index_html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | Balt Bot IA</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', sans-serif; background: #0a0e27; color: #fff; }}
        .container {{ max-width: 1200px; margin: 0 auto; padding: 40px 20px; }}
        header {{ background: rgba(10, 14, 39, 0.95); padding: 20px 0; position: fixed; width: 100%; top: 0; z-index: 1000; }}
        nav {{ max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; }}
        .logo {{ font-size: 24px; font-weight: 800; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
        .blog-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-top: 120px; }}
        .blog-card {{ background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 30px; transition: all 0.3s; }}
        .blog-card:hover {{ transform: translateY(-10px); }}
        .blog-card h2 {{ font-size: 24px; margin-bottom: 15px; }}
        .blog-card a {{ color: #667eea; text-decoration: none; font-weight: 600; }}
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">🤖 Balt Bot IA</div>
            <a href="../../index.html" style="color: #fff; text-decoration: none;">← Retour</a>
        </nav>
    </header>
    <div class="container">
        <h1 style="margin-top: 100px; font-size: 48px; margin-bottom: 40px;">📚 Blog Balt Bot IA</h1>
        <div class="blog-grid">
            {articles_html}
        </div>
    </div>
</body>
</html>'''
    
    with open(BLOG_DIR / 'index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    print(f"Index mis a jour avec {len(articles)} articles")

if __name__ == '__main__':
    print("Generation d'article quotidien...")
    filename, title = generate_daily_article()
    update_blog_index()
    print(f"\nArticle du jour cree: {title}")
    print(f"Fichier: {filename}")
