// API Route: Get individual blog post
// GET /api/blog/posts/[slug]
// Serves pre-generated post JSON created at build time

import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log(`[Blog Post API] Fetching post: ${slug}`);
    
    // Get the origin from the request
    const url = new URL(request.url);
    const staticJsonUrl = `${url.origin}/api/posts/${slug}.json`;
    
    // Fetch the static file
    const response = await fetch(staticJsonUrl, {
      cache: 'force-cache' // Cache aggressively for static content
    });
    
    if (!response.ok) {
      console.error(`[Blog Post API] Post not found: ${slug}`);
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    const data = await response.json();
    console.log(`[Blog Post API] Served post: ${slug}`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Blog Post API] Error serving post:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
