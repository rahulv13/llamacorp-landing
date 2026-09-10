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
    const res = await fetchWithAuth('/media/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to upload image' };
    }

    const data = await res.json();
    revalidatePath('/admin/media');
    return { url: data.url, media: data.data };
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
