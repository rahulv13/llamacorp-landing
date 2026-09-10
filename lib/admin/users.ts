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

export async function getAdminUsers() {
  try {
    const res = await fetchWithAuth('/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export async function createAdminUser(data: any) {
  try {
    const res = await fetchWithAuth('/users', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || errorData.errors?.[0]?.msg || 'Failed to create user' };
    }
    
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to connect to server' };
  }
}

export async function updateAdminUser(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || 'Failed to update user' };
    }
    
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to connect to server' };
  }
}

export async function deleteAdminUser(id: string) {
  try {
    const res = await fetchWithAuth(`/users/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || 'Failed to delete user' };
    }
    
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to connect to server' };
  }
}
