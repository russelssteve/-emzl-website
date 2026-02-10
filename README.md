# 🤖 Balt Bot IA - Site Web

Site web officiel de Balt Bot IA - Trading automatique intelligent avec XM

## 🌐 Site Déployé

**URL**: https://emzl-trading.netlify.app

## 📁 Structure

```
-emzl-website-main/
├── index.html              # Page d'accueil
├── styles.css              # Styles
├── script.js               # Scripts
├── public/
│   └── blog/
│       ├── index.html      # Index du blog
│       └── *.html          # Articles (5)
├── publish_social.py       # Publication Facebook/Instagram
├── .env.social             # Configuration tokens
└── README_PUBLICATION_SOCIALE.md  # Documentation
```

## 🚀 Déploiement

### Automatique (Netlify)
Chaque push sur `main` déclenche un déploiement automatique.

### Manuel
```bash
git add .
git commit -m "Mise à jour"
git push origin main
```

## 📱 Publication Sociale

### Configuration

1. **Obtenir les tokens**:
   - Facebook: https://developers.facebook.com/
   - Instagram: Compte Business requis

2. **Éditer `.env.social`**:
   ```bash
   FB_PAGE_ACCESS_TOKEN=votre_token
   FB_PAGE_ID=votre_page_id
   IG_ACCESS_TOKEN=votre_token
   IG_USER_ID=votre_user_id
   ```

3. **Publier**:
   ```bash
   export $(cat .env.social | xargs)
   python publish_social.py
   ```

### Automatisation

**Option 1: Cron (Serveur)**
```bash
# Tous les jours à 9h
0 9 * * * cd /path/to/site && export $(cat .env.social | xargs) && python publish_social.py
```

**Option 2: GitHub Actions**
Voir `README_PUBLICATION_SOCIALE.md` pour la configuration complète.

## 📝 Blog

### Articles Existants
1. Les meilleurs moments pour trader avec Balt Bot IA
2. XM vs autres brokers
3. Comment le trading automatique IA révolutionne le forex
4. Gestion du risque avec l'intelligence artificielle
5. Stratégies de trading IA: IFVG, MSP et Pivots expliqués

### Ajouter un Article

1. Créer `public/blog/nouvel-article.html`
2. Utiliser la structure des articles existants
3. Ajouter le lien dans `public/blog/index.html`
4. Publier sur les réseaux sociaux

## 🔗 Liens Importants

- **Bot Telegram**: https://t.me/PremiumEMZLbot
- **Dashboard**: https://emzl-premium-production.up.railway.app
- **XM Inscription**: https://affs.click/4fFDW
- **XM App**: https://affs.click/PiKQK
- **Paiement**: https://moneyfusion.net/dashboard/link?page=1&limit=20

## 📞 Support

**Telegram**: @SteveRussels
**Email**: russelsessomba@gmail.com

## ✅ Checklist

- [x] Site déployé sur Netlify
- [x] Blog fonctionnel avec 5 articles
- [x] Liens XM configurés
- [x] Formulaire contact opérationnel
- [x] Script publication sociale créé
- [ ] Tokens Facebook/Instagram configurés
- [ ] Publication automatique activée

## 📊 Statistiques

- **Pages**: 6 (accueil + 5 articles)
- **Déploiement**: Automatique via Netlify
- **Performance**: Optimisé pour mobile
- **SEO**: Meta tags configurés

---

**Version**: 1.0.0
**Dernière mise à jour**: 2024-01-15
