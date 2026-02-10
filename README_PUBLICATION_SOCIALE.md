# 📱 SYSTÈME DE PUBLICATION AUTOMATIQUE - BALT BOT IA

## 🎯 Fonctionnalités

✅ Lit automatiquement les articles du blog
✅ Crée des posts optimisés pour Facebook/Instagram
✅ Publie automatiquement via les APIs
✅ Sauvegarde les résultats dans `social_publications.json`

## 📦 Installation

```bash
# Installer les dépendances
pip install requests beautifulsoup4
```

## 🔑 Configuration

### 1. Obtenir les Tokens Facebook

1. Allez sur [Facebook Developers](https://developers.facebook.com/)
2. Créez une application
3. Ajoutez "Pages API"
4. Générez un token de page avec permissions:
   - `pages_manage_posts`
   - `pages_read_engagement`
5. Copiez votre Page ID et Access Token

### 2. Obtenir les Tokens Instagram

1. Convertissez votre compte Instagram en compte Business
2. Connectez-le à votre page Facebook
3. Dans la même app Facebook, ajoutez "Instagram Basic Display"
4. Générez un token avec permissions:
   - `instagram_basic`
   - `instagram_content_publish`
5. Copiez votre User ID et Access Token

### 3. Configurer les Variables

Éditez `.env.social`:

```bash
FB_PAGE_ACCESS_TOKEN=EAAxxxxxxxxxxxxx
FB_PAGE_ID=123456789
IG_ACCESS_TOKEN=IGQxxxxxxxxxxxxx
IG_USER_ID=987654321
BASE_URL=https://votre-site.netlify.app
```

## 🚀 Utilisation

### Publication Manuelle

```bash
# Charger les variables d'environnement
export $(cat .env.social | xargs)

# Publier les 5 derniers articles
python publish_social.py
```

### Publication Automatique (Cron)

```bash
# Éditer crontab
crontab -e

# Ajouter cette ligne (tous les jours à 9h)
0 9 * * * cd /path/to/website && export $(cat .env.social | xargs) && python publish_social.py
```

### Publication Automatique (GitHub Actions)

Créez `.github/workflows/social-publish.yml`:

```yaml
name: Publication Réseaux Sociaux

on:
  schedule:
    - cron: '0 9 * * *'  # Tous les jours à 9h UTC
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: pip install requests beautifulsoup4
      
      - name: Publish to social media
        env:
          FB_PAGE_ACCESS_TOKEN: ${{ secrets.FB_PAGE_ACCESS_TOKEN }}
          FB_PAGE_ID: ${{ secrets.FB_PAGE_ID }}
          IG_ACCESS_TOKEN: ${{ secrets.IG_ACCESS_TOKEN }}
          IG_USER_ID: ${{ secrets.IG_USER_ID }}
          BASE_URL: https://emzl-trading.netlify.app
        run: python -emzl-website-main/-emzl-website-main/publish_social.py
```

Puis ajoutez vos secrets dans GitHub:
- Settings → Secrets → Actions → New repository secret

## 📊 Résultats

Le script génère `social_publications.json`:

```json
[
  {
    "article": "les-meilleurs-moments-pour-trader",
    "title": "Les Meilleurs Moments pour Trading avec Balt Bot IA",
    "facebook_id": "123456789_987654321",
    "instagram_id": "18123456789",
    "published_at": "2024-01-15T09:00:00"
  }
]
```

## 🎨 Personnalisation

### Modifier les Messages

Éditez `create_social_message()` dans `publish_social.py`:

```python
messages = {
    'trading': f"🤖 {title}\n\n✅ Votre message personnalisé\n\n#VosHashtags",
    # ...
}
```

### Changer l'Image

Modifiez `image_url` dans `publish_article()`:

```python
image_url = f"{BASE_URL}/images/votre-image.jpg"
```

### Limiter le Nombre d'Articles

```python
articles = get_latest_articles(limit=3)  # Publier seulement 3 articles
```

## 🔧 Dépannage

### Erreur "Invalid OAuth access token"

- Vérifiez que vos tokens sont valides
- Les tokens Facebook expirent après 60 jours
- Régénérez un nouveau token si nécessaire

### Erreur "Instagram API"

- Vérifiez que votre compte est bien un compte Business
- Vérifiez qu'il est connecté à votre page Facebook
- L'image doit être accessible publiquement (HTTPS)

### Aucun Article Trouvé

- Vérifiez que le dossier `public/blog/` existe
- Vérifiez que les articles HTML sont présents
- Vérifiez les permissions du dossier

## 📈 Bonnes Pratiques

1. **Fréquence**: Ne publiez pas plus de 3-5 fois par jour
2. **Horaires**: Publiez aux heures de forte activité (9h, 12h, 18h)
3. **Hashtags**: Utilisez 5-10 hashtags pertinents
4. **Images**: Utilisez des images de haute qualité (1080x1080px)
5. **Texte**: Gardez les messages courts et engageants

## 🎯 Stratégie de Publication

### Semaine Type

- **Lundi**: Article sur l'analyse de marché
- **Mercredi**: Article sur les stratégies
- **Vendredi**: Article éducatif ou success story

### Contenu Varié

- 40% Articles de blog
- 30% Résultats/statistiques
- 20% Témoignages clients
- 10% Promotions/offres

## 📞 Support

**Telegram**: @SteveRussels
**Email**: russelsessomba@gmail.com

## ✅ Checklist de Démarrage

- [ ] Créer compte Facebook Developer
- [ ] Créer application Facebook
- [ ] Obtenir Page Access Token
- [ ] Convertir Instagram en Business
- [ ] Connecter Instagram à Facebook
- [ ] Obtenir Instagram Access Token
- [ ] Configurer `.env.social`
- [ ] Tester avec `python publish_social.py`
- [ ] Configurer automatisation (cron ou GitHub Actions)
- [ ] Vérifier les publications sur Facebook/Instagram

## 🎉 Résultat Final

Vous avez maintenant un système qui:
- ✅ Publie automatiquement vos articles
- ✅ Optimise les messages pour chaque réseau
- ✅ Fonctionne 24/7 sans intervention
- ✅ Génère du trafic gratuit vers votre site

**Lancez le système:**
```bash
python publish_social.py
```

**Bonne chance ! 🚀**
