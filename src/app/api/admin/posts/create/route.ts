// API Route: Create a new blog post
// POST /api/admin/posts/create

import { NextRequest, NextResponse } from 'next/server';
import { saveBlogPost } from '@/lib/admin/content';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required' },
        { status: 401 }
      );
    }

    const post = await request.json();
    await saveBlogPost(post, token);

    return NextResponse.json({ success: true, slug: post.slug });
  } catch (error: any) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}
