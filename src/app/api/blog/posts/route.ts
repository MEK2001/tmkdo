// API Route: Get all blog posts
// GET /api/blog/posts
// Redirects to the static posts.json file generated at build time

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    console.log('[Blog API] Redirecting to static posts.json...');
    
    // Get the origin from the request
    const url = new URL(request.url);
    const staticJsonUrl = `${url.origin}/api/posts.json`;
    
    // Fetch the static file
    const response = await fetch(staticJsonUrl, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('[Blog API] Failed to fetch static posts.json');
      return NextResponse.json(
        { posts: [], error: 'Posts data not available' },
        { status: 200 }
      );
    }
    
    const data = await response.json();
    console.log(`[Blog API] Served ${data.posts?.length || 0} posts from static file`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Blog API] Error serving posts:', error);
    // Return empty array instead of 500 to prevent UI errors
    return NextResponse.json(
      { posts: [], error: error.message },
      { status: 200 }
    );
  }
}
