import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost as FrontendBlogPost } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Ensure directory exists at build time
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

// Parse custom shortcodes in post content
function parseShortcodes(content: string): string {
  // Amazon products
  content = content.replace(
    /{{< amazon asin="([^"]+)" title="([^"]+)" image="([^"]+)" price="([^"]*)" rating="([^"]*)" >}}/g,
    (_match, asin, title, image, price, rating) => {
      const affiliateTag = 'tmkdo-20';
      return `
        <div class="amazon-card" style="border: 2px solid #FF9900; border-radius: 12px; padding: 20px; margin: 24px 0; background: #fff; box-shadow: 0 4px 20px rgba(139, 38, 53, 0.15);">
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <img src="${image}" alt="${title}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px;" />
            <div style="flex: 1; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-family: 'Lora', Georgia, serif;">${title}</h3>
              ${rating ? `<div style="color: #FFA41C; margin-bottom: 8px;">⭐ ${rating}</div>` : ''}
              ${price ? `<p style="font-size: 24px; color: #8B2635; font-weight: bold; margin: 0 0 16px 0;">${price}</p>` : ''}
              <a href="https://www.amazon.com/dp/${asin}?tag=${affiliateTag}" target="_blank" rel="nofollow noopener" style="display: inline-block; background: #8B2635; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">🛒 Buy on Amazon</a>
            </div>
          </div>
        </div>
      `;
    }
  );

  // YouTube videos
  content = content.replace(
    /{{< youtube id="([^"]+)" title="([^"]*)" >}}/g,
    (_match, id, title) => {
      return `
        <div style="margin: 24px 0;">
          ${title ? `<h4 style="margin: 0 0 12px 0; font-family: 'Lora', Georgia, serif;">${title}</h4>` : ''}
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 8px 30px rgba(139, 38, 53, 0.2);">
            <iframe src="https://www.youtube.com/embed/${id}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      `;
    }
  );

  // Callout boxes
  content = content.replace(
    /{{< callout type="([^"]+)" title="([^"]*)" content="([^"]+)" >}}/g,
    (_match, type, title, text) => {
      const styles = {
        info: { bg: '#e3f2fd', border: '#2196f3', icon: 'ℹ️' },
        tip: { bg: '#e8f5e9', border: '#4caf50', icon: '💡' },
        warning: { bg: '#fff3e0', border: '#ff9800', icon: '⚠️' },
        success: { bg: '#f1f8f4', border: '#00c853', icon: '✅' },
      } as const;

      const style = styles[type as keyof typeof styles] || styles.info;

      return `
        <div style="background: ${style.bg}; border-left: 4px solid ${style.border}; padding: 16px 20px; margin: 20px 0; border-radius: 8px;">
          <div style="display: flex; gap: 12px;">
            <span style="font-size: 24px;">${style.icon}</span>
            <div>
              ${title ? `<h4 style="margin: 0 0 8px 0; color: ${style.border}; font-family: 'Lora', Georgia, serif;">${title}</h4>` : ''}
              <p style="margin: 0;">${text}</p>
            </div>
          </div>
        </div>
      `;
    }
  );

  return content;
}

export async function getAllPosts(): Promise<FrontendBlogPost[]> {
  let fileNames: string[] = [];

  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.error('[Posts] Posts directory does not exist:', postsDirectory);
      return [];
    }

    fileNames = fs.readdirSync(postsDirectory);
    console.log(`[Posts] Found ${fileNames.length} files in posts directory`);
  } catch (error) {
    console.error('[Posts] Error reading posts directory:', error);
    return [];
  }

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName
        .replace(/\.md$/, '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      const post: FrontendBlogPost & {
        status?: string;
        featured?: boolean;
        tags?: string[];
      } = {
        slug,
        title: (data as any).title || 'Untitled',
        date: (data as any).date || new Date().toISOString(),
        category: (data as any).category || 'Uncategorized',
        image:
          (data as any).image ||
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
        excerpt: (data as any).excerpt || '',
        readTime: (data as any).readTime || '5 min read',
      };

      (post as any).status = (data as any).status || 'published';
      (post as any).featured = (data as any).featured || false;
      (post as any).tags = (data as any).tags || [];

      return post;
    })
    // Only published posts
    .filter((post) => (post as any).status === 'published');

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  try {
    const files = fs.readdirSync(postsDirectory);
    const fileName = files.find(
      (f) => f.endsWith(`${slug}.md`) || f.includes(slug)
    );

    if (!fileName) {
      console.warn(`Post not found: ${slug}`);
      return null;
    }

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);

    let contentHtml = processedContent.toString();
    contentHtml = parseShortcodes(contentHtml);

    const frontmatter: any = data;

    return {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString(),
      category: frontmatter.category || 'Uncategorized',
      image:
        frontmatter.image ||
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80',
      imageAlt: frontmatter.imageAlt || frontmatter.title,
      excerpt: frontmatter.excerpt || '',
      readTime: frontmatter.readTime || '5 min read',
      tags: frontmatter.tags || [],
      author: frontmatter.author || 'TMKDO Team',
      seoTitle: frontmatter.seo?.title || frontmatter.title,
      seoDescription: frontmatter.seo?.description || frontmatter.excerpt,
      status: frontmatter.status || 'published',
      featured: frontmatter.featured || false,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}




