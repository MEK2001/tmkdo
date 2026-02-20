// API Route: Upload images
// POST /api/admin/upload

export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/admin/github';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-github-token');

    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token required' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const url = await uploadImage(file, token);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Failed to upload image:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
