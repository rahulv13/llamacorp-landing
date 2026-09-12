'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    throw new Error('Not authenticated');
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function getAdminAuthors(search = '') {
  try {
    const url = search ? `/authors?search=${encodeURIComponent(search)}` : '/authors';
    const res = await fetchWithAuth(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch authors');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAdminAuthor(id: string) {
  try {
    const res = await fetchWithAuth(`/authors/id/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch author');
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createAdminAuthor(data: any) {
  try {
    const res = await fetchWithAuth('/authors', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to create author' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    revalidatePath('/admin/authors');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Server connection failed' };
  }
}

export async function updateAdminAuthor(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/authors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to update author' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    revalidatePath('/admin/authors');
    revalidatePath(`/admin/authors/${id}/edit`);
    return { success: true };
  } catch (error) {
    return { error: 'Server connection failed' };
  }
}

export async function deleteAdminAuthor(id: string) {
  try {
    const res = await fetchWithAuth(`/authors/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to delete author' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    revalidatePath('/admin/authors');
    return { success: true };
  } catch (error) {
    return { error: 'Server connection failed' };
  }
}
