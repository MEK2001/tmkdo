// API Route: Test GitHub Token
// GET /api/admin/test-token

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('x-github-token')?.trim();

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required', valid: false },
        { status: 401 }
      );
    }

    // Test repo access first (this is what CMS operations actually need)
    const repoResponse = await fetch(
      'https://api.github.com/repos/MEK2001/tmkdo',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'TMKDO-CMS'
        }
      }
    );

    if (!repoResponse.ok) {
      const errorText = await repoResponse.text();
      console.error('GitHub repo access test failed:', repoResponse.status, errorText);
      return NextResponse.json({
        valid: false,
        hasRepoAccess: false,
        error: `Token authentication failed (${repoResponse.status})`,
        details: errorText.substring(0, 120)
      }, { status: 401 });
    }

    // Optional user lookup for display; do not fail token if this endpoint is restricted
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TMKDO-CMS'
      }
    });
    const userData = userResponse.ok ? await userResponse.json() : null;

    return NextResponse.json({
      valid: true,
      user: userData?.login || 'Token Verified',
      name: userData?.name || '',
      hasRepoAccess: true,
      scopes: userResponse.headers.get('x-oauth-scopes') || repoResponse.headers.get('x-oauth-scopes') || 'unknown'
    });
  } catch (error: any) {
    console.error('Token test error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to test token', valid: false },
      { status: 500 }
    );
  }
}
