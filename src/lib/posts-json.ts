// Helper functions to read posts from static JSON files generated at build time
// These work during build and don't require filesystem access at runtime
import fs from 'fs';
import path from 'path';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  author?: string;
  tags?: string[];
  status?: string;
}

function getSiteBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tmkdo.com';
}

// Read all posts from the generated JSON file
export async function getAllPostsFromJSON(): Promise<Post[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'api', 'posts.json');
    
    if (!fs.existsSync(jsonPath)) {
      console.warn('[Posts JSON] posts.json not found');
      return [];
    }
    
    const data = fs.readFileSync(jsonPath, 'utf-8');
    const { posts } = JSON.parse(data);
    return posts;
  } catch (error) {
    console.warn('[Posts JSON] Local file read failed, trying remote API fallback');

    try {
      const response = await fetch(`${getSiteBaseUrl()}/api/posts.json`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Remote posts.json fetch failed (${response.status})`);
      }

      const data = await response.json();
      return data.posts || [];
    } catch (fallbackError) {
      console.error('[Posts JSON] Error reading posts.json from both local and remote:', fallbackError);
      return [];
    }
  }
}

// Read a single post from the generated JSON file
export async function getPostFromJSON(slug: string): Promise<Post | null> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'api', 'posts', `${slug}.json`);
    
    if (!fs.existsSync(jsonPath)) {
      console.warn(`[Post JSON] Post not found: ${slug}`);
      return null;
    }
    
    const data = fs.readFileSync(jsonPath, 'utf-8');
    const post = JSON.parse(data);
    return post;
  } catch (error) {
    console.warn(`[Post JSON] Local file read failed for ${slug}, trying remote API fallback`);

    try {
      const response = await fetch(`${getSiteBaseUrl()}/api/posts/${slug}.json`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Remote post fetch failed (${response.status})`);
      }

      return await response.json();
    } catch (fallbackError) {
      console.error(`[Post JSON] Error reading post ${slug} from both local and remote:`, fallbackError);
      return null;
    }
  }
}
