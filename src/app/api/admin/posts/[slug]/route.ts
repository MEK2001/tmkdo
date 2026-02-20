// API Route: Get, Update, or Delete a specific blog post
// GET/PUT/DELETE /api/admin/posts/[slug]

import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost, saveBlogPost, deleteBlogPost } from '@/lib/admin/content';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const post = await getBlogPost(slug, token);

    return NextResponse.json({ post });
  } catch (error: any) {
    console.error('Failed to get post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const post = await request.json();
    await saveBlogPost(post, token, slug);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to save post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    await deleteBlogPost(slug, token);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete post' },
      { status: 500 }
    );
  }
}
