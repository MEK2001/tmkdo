// API Route: Test GitHub Token
// GET /api/admin/test-token

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required', valid: false },
        { status: 401 }
      );
    }

    // Test the token by getting user info
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub token test failed:', response.status, errorText);
      return NextResponse.json({
        valid: false,
        error: `Token authentication failed (${response.status})`,
        details: errorText.substring(0, 100)
      }, { status: 401 });
    }

    const userData = await response.json();
    
    // Test repo access
    const repoResponse = await fetch(
      'https://api.github.com/repos/MEK2001/tmkdo',
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const hasRepoAccess = repoResponse.ok;

    return NextResponse.json({
      valid: true,
      user: userData.login,
      name: userData.name,
      hasRepoAccess,
      scopes: response.headers.get('x-oauth-scopes') || 'unknown'
    });
  } catch (error: any) {
    console.error('Token test error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to test token', valid: false },
      { status: 500 }
    );
  }
}
