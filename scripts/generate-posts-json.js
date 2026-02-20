// Script to generate posts.json at build time
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { remark } = require('remark');
const html = require('remark-html').default;

async function generatePostsJson() {
  try {
    console.log('[Build] Generating posts.json with full content at build time...');
    
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    
    const posts = [];
    
    for (const file of files) {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      const slug = file.replace('.md', '');
      
      // Convert markdown to HTML
      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(content);
      const contentHtml = processedContent.toString();
      
      posts.push({
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        image: data.image || '/images/placeholder.jpg',
        date: data.date || new Date().toISOString(),
        category: data.category || 'General',
        readTime: data.readTime || '5 min read',
        content: contentHtml, // Include full HTML content
        author: data.author || 'TMKDO Team',
        tags: data.tags || [],
        status: data.status || 'published'
      });
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write to public directory so it's accessible as a static asset
    const outputDir = path.join(process.cwd(), 'public', 'api');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write full posts data
    const outputPath = path.join(outputDir, 'posts.json');
    fs.writeFileSync(outputPath, JSON.stringify({ posts }, null, 2));
    
    // Also write individual post files for efficient loading
    const postsDetailDir = path.join(outputDir, 'posts');
    if (!fs.existsSync(postsDetailDir)) {
      fs.mkdirSync(postsDetailDir, { recursive: true });
    }
    
    posts.forEach(post => {
      const postPath = path.join(postsDetailDir, `${post.slug}.json`);
      fs.writeFileSync(postPath, JSON.stringify(post, null, 2));
    });
    
    console.log(`[Build] Generated ${posts.length} posts in posts.json`);
    console.log(`[Build] Generated ${posts.length} individual post JSON files`);
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
