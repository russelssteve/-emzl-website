const express = require('express');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static('public'));
app.use(express.static('.'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour le blog index
app.get('/blog', async (req, res) => {
  try {
    const blogIndex = await fs.readJSON(path.join(__dirname, 'content', 'blog-index.json'));
    
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
    
    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading blog');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Site accessible localement`);
  console.log(`\n💡 Commandes disponibles:`);
  console.log(`   - npm run generate-content (générer pages SEO)`);
  console.log(`   - npm run generate-daily (contenu quotidien)`);
  console.log(`   - npm run generate-sitemap (sitemap XML)`);
  console.log(`   - npm run build (tout générer)\n`);
});
