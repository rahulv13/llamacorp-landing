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

export async function getAdminCategories() {
  try {
    const res = await fetchWithAuth('/categories', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createAdminCategory(data: any) {
  try {
    const res = await fetchWithAuth('/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to create category' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Server connection failed' };
  }
}

export async function updateAdminCategory(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to update category' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Server connection failed' };
  }
}

export async function deleteAdminCategory(id: string) {
  try {
    const res = await fetchWithAuth(`/categories/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to delete category' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    return { error: 'Server connection failed' };
  }
}
