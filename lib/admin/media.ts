'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) throw new Error('Not authenticated');

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
}

export async function uploadAdminImage(formData: FormData) {
  
  try {
    const file = formData.get('image') as File;
    if (!file) {
      return { error: 'No image provided' };
    }

    // Reconstruct FormData to prevent Next.js File polyfill from hanging Node's native fetch
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const blob = new Blob([buffer], { type: file.type });
    
    const newFormData = new FormData();
    newFormData.append('image', blob, file.name);

    const res = await fetchWithAuth('/media/upload', {
      method: 'POST',
      body: newFormData,
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to upload image' };
    }

    const data = await res.json();
    revalidatePath('/admin/media');
    
    // Explicitly destructure to ensure we only return a plain, serializable object to the client
    // This prevents React Error #441 (Serialization error) in Server Actions
    const mediaItem = {
      _id: data.data._id?.toString() || '',
      secureUrl: data.data.secureUrl || '',
      filename: data.data.filename || '',
      alt: data.data.alt || '',
      format: data.data.format || '',
      bytes: data.data.bytes || 0,
      createdAt: data.data.createdAt?.toString() || new Date().toISOString(),
    };

    return { url: data.url, media: mediaItem };
  } catch (error) {
    console.error('Image upload error:', error);
    return { error: 'Failed to connect to media server' };
  }
}

export async function getAdminMedia(page = 1, limit = 20, search = '') {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    });
    const res = await fetchWithAuth(`/media?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch media');
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [], pagination: { totalPages: 1 } };
  }
}

export async function deleteAdminMedia(id: string) {
  try {
    const res = await fetchWithAuth(`/media/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to delete media' };
    }
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete media' };
  }
}

export async function updateAdminMedia(id: string, updates: { alt?: string; filename?: string }) {
  try {
    const res = await fetchWithAuth(`/media/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    
    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to update media' };
    }
    revalidatePath('/admin/media');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update media' };
  }
}
