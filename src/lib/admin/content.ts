// Content Management Utilities

import { getFile, createOrUpdateFile, listFiles, deleteFile } from './github';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  published: boolean;
  content: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  email: string;
  socialLinks: {
    instagram?: string;
    pinterest?: string;
    twitter?: string;
  };
}

// Parse frontmatter from markdown
function parseFrontmatter(markdown: string): { metadata: any; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: markdown };
  }

  const [, frontmatter, content] = match;
  const metadata: any = {};

  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value: any = line.substring(colonIndex + 1).trim();

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v: string) => v.trim().replace(/^['"]|['"]$/g, ''));
    }
    // Parse booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Remove quotes
    else if ((value.startsWith('"') && value.endsWith('"')) ||
             (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    metadata[key] = value;
  });

  return { metadata, content: content.trim() };
}

// Create frontmatter from metadata
function createFrontmatter(metadata: any, content: string): string {
  let frontmatter = '---\n';

  Object.entries(metadata).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      frontmatter += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
    } else if (typeof value === 'boolean') {
      frontmatter += `${key}: ${value}\n`;
    } else {
      frontmatter += `${key}: "${value}"\n`;
    }
  });

  frontmatter += '---\n\n';
  return frontmatter + content;
}

// List all blog posts
export async function listBlogPosts(token: string): Promise<BlogPost[]> {
  const files = await listFiles('content/posts', token);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;

    try {
      const content = await getFile(file.path, token);
      const { metadata, content: body } = parseFrontmatter(content.content);
      const slug = file.name.replace(/\.md$/, '');

      posts.push({
        slug,
        title: metadata.title || '',
        excerpt: metadata.excerpt || '',
        date: metadata.date || '',
        author: metadata.author || '',
        category: metadata.category || '',
        tags: metadata.tags || [],
        image: metadata.image || '',
        published: metadata.published !== false || metadata.status === 'published',
        content: body
      });
    } catch (err) {
      console.error(`Failed to load post ${file.name}:`, err);
    }
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// Get a single blog post
export async function getBlogPost(slug: string, token: string): Promise<BlogPost> {
  const path = `content/posts/${slug}.md`;
  const file = await getFile(path, token);
  const { metadata, content } = parseFrontmatter(file.content);

  return {
    slug,
    title: metadata.title || '',
    excerpt: metadata.excerpt || '',
    date: metadata.date || '',
    author: metadata.author || '',
    category: metadata.category || '',
    tags: metadata.tags || [],
    image: metadata.image || '',
    published: metadata.published !== false || metadata.status === 'published',
    content
  };
}

// Save a blog post
export async function saveBlogPost(
  post: BlogPost,
  token: string,
  originalSlug?: string
): Promise<void> {
  const metadata = {
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    category: post.category,
    tags: post.tags,
    image: post.image,
    status: post.published ? 'published' : 'draft',
    published: post.published
  };

  const markdown = createFrontmatter(metadata, post.content);
  const path = `content/posts/${post.slug}.md`;
  const message = originalSlug
    ? `Update post: ${post.title}`
    : `Create post: ${post.title}`;

  // If slug changed, delete old file
  if (originalSlug && originalSlug !== post.slug) {
    const oldPath = `content/posts/${originalSlug}.md`;
    try {
      const oldFile = await getFile(oldPath, token);
      await deleteFile(oldPath, `Delete old version: ${originalSlug}`, token, oldFile.sha!);
    } catch (err) {
      console.error('Failed to delete old file:', err);
    }
  }

  // Get existing file SHA if updating
  let sha: string | undefined;
  if (!originalSlug || originalSlug === post.slug) {
    try {
      const existingFile = await getFile(path, token);
      sha = existingFile.sha;
    } catch {
      // File doesn't exist, creating new
    }
  }

  await createOrUpdateFile(path, markdown, message, token, sha);
}

// Delete a blog post
export async function deleteBlogPost(slug: string, token: string): Promise<void> {
  const path = `content/posts/${slug}.md`;
  const file = await getFile(path, token);
  await deleteFile(path, `Delete post: ${slug}`, token, file.sha!);
}

// Get site settings
export async function getSiteSettings(token: string): Promise<SiteSettings> {
  try {
    const file = await getFile('content/settings/general.json', token);
    return JSON.parse(file.content);
  } catch {
    // Return defaults if file doesn't exist
    return {
      siteTitle: 'TMKDO',
      siteDescription: 'Minimalist Home Decor & Curated Living',
      siteUrl: 'https://www.tmkdo.com',
      email: 'hello@tmkdo.com',
      socialLinks: {}
    };
  }
}

// Save site settings
export async function saveSiteSettings(settings: SiteSettings, token: string): Promise<void> {
  const path = 'content/settings/general.json';
  const content = JSON.stringify(settings, null, 2);

  let sha: string | undefined;
  try {
    const existingFile = await getFile(path, token);
    sha = existingFile.sha;
  } catch {
    // File doesn't exist
  }

  await createOrUpdateFile(
    path,
    content,
    'Update site settings',
    token,
    sha
  );
}
