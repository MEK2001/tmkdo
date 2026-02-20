// API Route: Get all blog posts
// GET /api/blog/posts

import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[Blog API] Fetching all posts...');
    const posts = await getAllPosts();
    
    // Format posts for frontend with proper dates
    const formattedPosts = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      date: post.date,
      category: post.category,
      readTime: post.readTime || '5 min read',
    }));

    console.log(`[Blog API] Found ${formattedPosts.length} posts`);
    return NextResponse.json({ posts: formattedPosts });
  } catch (error: any) {
    console.error('[Blog API] Error fetching posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
