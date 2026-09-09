'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function uploadAdminImage(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return { error: 'Not authenticated' };
    }

    const res = await fetch(`${API_URL}/blogs/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to upload image' };
    }

    const data = await res.json();
    return { url: data.url };
  } catch (error) {
    console.error('Image upload proxy error:', error);
    return { error: 'Failed to connect to media server' };
  }
}
