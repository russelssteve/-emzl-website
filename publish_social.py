#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Publication automatique sur Facebook/Instagram depuis les articles du blog"""

import os
import requests
import json
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

# Configuration depuis variables d'environnement
FB_PAGE_ACCESS_TOKEN = os.getenv('FB_PAGE_ACCESS_TOKEN', '')
FB_PAGE_ID = os.getenv('FB_PAGE_ID', '')
IG_ACCESS_TOKEN = os.getenv('IG_ACCESS_TOKEN', '')
IG_USER_ID = os.getenv('IG_USER_ID', '')
BASE_URL = os.getenv('BASE_URL', 'https://emzl-trading.netlify.app')

BLOG_DIR = Path(__file__).parent / 'public' / 'blog'

def extract_article_info(html_file):
    """Extrait titre et description d'un article HTML"""
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    title = soup.find('h1')
    title_text = title.get_text(strip=True) if title else "Article Balt Bot IA"
    
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    description = meta_desc['content'] if meta_desc else ""
    
    return title_text, description

def create_social_message(title, category='trading'):
    """Crée un message optimisé pour les réseaux sociaux"""
    messages = {
        'trading': f"🤖 {title}\n\n✅ Trading automatique 24/7\n✅ IA avancée\n✅ Notifications temps réel\n\n🎁 Essai gratuit 48h !\n\n#TradingIA #BaltBotIA #XM #ForexTrading #TradingAutomatique",
        'strategy': f"🎯 {title}\n\n📊 Stratégies IA optimisées\n💎 Résultats prouvés\n🚀 Facile à utiliser\n\n👉 Commencez maintenant !\n\n#StratégieTrading #ForexStrategy #AITrading #BaltBotIA",
        'education': f"📚 {title}\n\n🎓 Apprenez le trading IA\n💡 Conseils d'experts\n🔥 Guide complet\n\n#FormationTrading #TradingEducation #ForexLearning #BaltBotIA"
    }
    
    # Déterminer la catégorie depuis le titre
    if any(word in title.lower() for word in ['stratégie', 'ifvg', 'msp', 'pivot']):
        return messages['strategy']
    elif any(word in title.lower() for word in ['comment', 'guide', 'tutoriel', 'apprendre']):
        return messages['education']
    else:
        return messages['trading']

def publish_to_facebook(message, link):
    """Publie sur Facebook"""
    if not FB_PAGE_ACCESS_TOKEN or not FB_PAGE_ID:
        print("⚠️ Tokens Facebook manquants")
        return None
    
    url = f"https://graph.facebook.com/v18.0/{FB_PAGE_ID}/feed"
    data = {
        'message': message,
        'link': link,
        'access_token': FB_PAGE_ACCESS_TOKEN
    }
    
    try:
        response = requests.post(url, data=data)
        result = response.json()
        
        if 'id' in result:
            print(f"✅ Publié sur Facebook: {result['id']}")
            return result['id']
        else:
            print(f"❌ Erreur Facebook: {result}")
            return None
    except Exception as e:
        print(f"❌ Exception Facebook: {e}")
        return None

def publish_to_instagram(message, image_url):
    """Publie sur Instagram"""
    if not IG_ACCESS_TOKEN or not IG_USER_ID:
        print("⚠️ Tokens Instagram manquants")
        return None
    
    # Étape 1: Créer le conteneur média
    create_url = f"https://graph.facebook.com/v18.0/{IG_USER_ID}/media"
    create_data = {
        'image_url': image_url,
        'caption': message,
        'access_token': IG_ACCESS_TOKEN
    }
    
    try:
        response = requests.post(create_url, data=create_data)
        result = response.json()
        
        if 'id' not in result:
            print(f"❌ Erreur création média Instagram: {result}")
            return None
        
        media_id = result['id']
        print(f"📝 Média créé: {media_id}")
        
        # Étape 2: Publier le conteneur
        publish_url = f"https://graph.facebook.com/v18.0/{IG_USER_ID}/media_publish"
        publish_data = {
            'creation_id': media_id,
            'access_token': IG_ACCESS_TOKEN
        }
        
        response = requests.post(publish_url, data=publish_data)
        result = response.json()
        
        if 'id' in result:
            print(f"✅ Publié sur Instagram: {result['id']}")
            return result['id']
        else:
            print(f"❌ Erreur publication Instagram: {result}")
            return None
            
    except Exception as e:
        print(f"❌ Exception Instagram: {e}")
        return None

def get_latest_articles(limit=5):
    """Récupère les derniers articles du blog"""
    articles = []
    
    if not BLOG_DIR.exists():
        print(f"❌ Dossier blog introuvable: {BLOG_DIR}")
        return articles
    
    for html_file in BLOG_DIR.glob('*.html'):
        if html_file.name == 'index.html':
            continue
        
        articles.append({
            'file': html_file,
            'name': html_file.stem,
            'modified': html_file.stat().st_mtime
        })
    
    # Trier par date de modification (plus récent en premier)
    articles.sort(key=lambda x: x['modified'], reverse=True)
    
    return articles[:limit]

def publish_article(article_info):
    """Publie un article sur les réseaux sociaux"""
    html_file = article_info['file']
    article_name = article_info['name']
    
    print(f"\n📄 Traitement: {article_name}")
    
    # Extraire infos
    title, description = extract_article_info(html_file)
    
    # URLs
    article_url = f"{BASE_URL}/public/blog/{article_name}.html"
    image_url = f"{BASE_URL}/images/backgrounds/trading-bg.jpg"  # Image par défaut
    
    # Message social
    message = create_social_message(title)
    
    print(f"📝 Titre: {title}")
    print(f"🔗 URL: {article_url}")
    
    # Publier sur Facebook
    print("📘 Publication sur Facebook...")
    fb_id = publish_to_facebook(message, article_url)
    
    # Publier sur Instagram
    print("📸 Publication sur Instagram...")
    ig_id = publish_to_instagram(message, image_url)
    
    return {
        'article': article_name,
        'title': title,
        'facebook_id': fb_id,
        'instagram_id': ig_id,
        'published_at': datetime.now().isoformat()
    }

def main():
    """Fonction principale"""
    print("🚀 PUBLICATION AUTOMATIQUE - BALT BOT IA")
    print("=" * 50)
    
    # Vérifier configuration
    if not FB_PAGE_ACCESS_TOKEN:
        print("⚠️ FB_PAGE_ACCESS_TOKEN non configuré")
    if not IG_ACCESS_TOKEN:
        print("⚠️ IG_ACCESS_TOKEN non configuré")
    
    # Récupérer articles
    articles = get_latest_articles(limit=5)
    
    if not articles:
        print("❌ Aucun article trouvé")
        return
    
    print(f"\n📚 {len(articles)} articles trouvés")
    
    # Publier chaque article
    results = []
    for article in articles:
        result = publish_article(article)
        results.append(result)
    
    # Sauvegarder résultats
    results_file = Path(__file__).parent / 'social_publications.json'
    with open(results_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Résultats sauvegardés: {results_file}")
    print("\n🎉 Publication terminée !")
    
    # Statistiques
    fb_success = sum(1 for r in results if r['facebook_id'])
    ig_success = sum(1 for r in results if r['instagram_id'])
    
    print(f"\n📊 STATISTIQUES:")
    print(f"   Facebook: {fb_success}/{len(results)}")
    print(f"   Instagram: {ig_success}/{len(results)}")

if __name__ == '__main__':
    main()
