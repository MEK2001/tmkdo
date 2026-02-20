// Script to generate posts.json at build time
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function generatePostsJson() {
  try {
    console.log('[Build] Generating posts.json at build time...');
    
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    
    const posts = [];
    
    for (const file of files) {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      
      const slug = file.replace('.md', '');
      
      posts.push({
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        image: data.image || '/images/placeholder.jpg',
        date: data.date || new Date().toISOString(),
        category: data.category || 'General',
        readTime: data.readTime || '5 min read',
      });
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write to public directory so it's accessible as a static asset
    const outputDir = path.join(process.cwd(), 'public', 'api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'posts.json');
    fs.writeFileSync(outputPath, JSON.stringify({ posts }, null, 2));
    
    console.log(`[Build] Generated ${posts.length} posts in posts.json at ${outputPath}`);
    return posts;
  } catch (error) {
    console.error('[Build] Error generating posts.json:', error);
    return [];
  }
}

// Run if called directly
if (require.main === module) {
  generatePostsJson();
}

module.exports = { generatePostsJson };
