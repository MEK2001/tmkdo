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
    console.error('[Posts JSON] Error reading posts.json:', error);
    return [];
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
    console.error(`[Post JSON] Error reading post ${slug}:`, error);
    return null;
  }
}
