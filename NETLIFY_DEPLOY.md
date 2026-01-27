# Configuration Netlify pour déploiement automatique

## 🚀 DÉPLOIEMENT AUTOMATIQUE CONFIGURÉ

### Repository: https://github.com/russelssteve/-emzl-website
### Branche: main
### Status: ✅ PRÊT POUR NETLIFY

## Configuration Netlify Dashboard

1. **Site Settings**:
   - Repository: `russelssteve/-emzl-website`
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `public`

2. **Environment Variables**:
   ```
   FB_PAGE_ACCESS_TOKEN=your_token_here
   FB_PAGE_ID=your_page_id_here
   IG_ACCESS_TOKEN=your_ig_token_here
   IG_USER_ID=your_ig_user_id_here
   BASE_URL=https://your-site.netlify.app
   ```

3. **Deploy Settings**:
   - Auto-deploy: ✅ Enabled
   - Branch deploys: main only
   - Build hooks: Optional

## 🎯 Résultat

Dès que vous connectez ce repository à Netlify :
- ✅ Déploiement automatique à chaque push
- ✅ Publications Instagram/Facebook automatiques
- ✅ Génération d'images personnalisées
- ✅ Contenu quotidien automatique

## 📱 Test

Pour tester localement :
```bash
npm install
npm run generate-backgrounds
npm run generate-daily
npm run build
```