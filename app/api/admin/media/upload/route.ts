import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Reconstruct FormData for native fetch compatibility
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const blob = new Blob([buffer], { type: file.type });
    
    const newFormData = new FormData();
    newFormData.append('image', blob, file.name);

    const backendRes = await fetch(`${API_URL}/media/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: newFormData,
    });

    if (!backendRes.ok) {
      let message = 'Failed to upload image';
      try {
        const data = await backendRes.json();
        message = data.message || message;
      } catch (e) {}
      return NextResponse.json({ error: message }, { status: backendRes.status });
    }

    const data = await backendRes.json();
    
    // Attempt revalidation safely
    try {
      revalidatePath('/admin/media');
    } catch (e) {
      console.error('Revalidation failed:', e);
    }

    const mediaItem = {
      _id: data.data._id?.toString() || '',
      secureUrl: data.data.secureUrl || '',
      filename: data.data.filename || '',
      alt: data.data.alt || '',
      format: data.data.format || '',
      bytes: data.data.bytes || 0,
      createdAt: data.data.createdAt?.toString() || new Date().toISOString(),
    };

    return NextResponse.json({ url: data.url, media: mediaItem });
  } catch (error: any) {
    console.error('Image upload API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to connect to media server' }, { status: 500 });
  }
}
