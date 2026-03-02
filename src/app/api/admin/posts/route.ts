// API Route: List all blog posts
// GET /api/admin/posts

import { NextRequest, NextResponse } from 'next/server';
import { listBlogPosts } from '@/lib/admin/content';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required' },
        { status: 401 }
      );
    }

    console.log('Fetching posts from GitHub...');
    const posts = await listBlogPosts(token);
    console.log(`Successfully loaded ${posts.length} posts`);

    return NextResponse.json({ posts });
  } catch (error: any) {
    console.error('Failed to list posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to list posts' },
      { status: 500 }
    );
  }
}
