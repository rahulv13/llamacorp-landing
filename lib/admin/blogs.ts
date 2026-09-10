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

  // Do not set Content-Type if the body is FormData (let the browser/fetch set it with boundary)
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

// Ensure the JWT contains the ID and we can decode it on the server if needed
// Or simply extract it from the token payload (Base64)
function getAdminIdFromToken(token: string): string | null {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    return decoded.id;
  } catch (err) {
    return null;
  }
}

export async function getAdminBlogs() {
  try {
    const res = await fetchWithAuth('/blogs/admin', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAdminBlog(id: string) {
  try {
    const res = await fetchWithAuth(`/blogs/admin/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blog');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createAdminBlog(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return { error: 'Not authenticated' };

    const authorId = getAdminIdFromToken(token);
    if (!authorId) return { error: 'Could not resolve author from token' };

    formData.append('author', authorId);

    const res = await fetchWithAuth('/blogs', {
      method: 'POST',
      body: formData, // passing FormData natively handles multipart and boundaries
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to create blog' };
    }

    revalidatePath('/admin/blogs');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Server connection failed' };
  }
}

export async function updateAdminBlog(id: string, formData: FormData) {
  try {
    const res = await fetchWithAuth(`/blogs/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to update blog' };
    }

    revalidatePath('/admin/blogs');
    revalidatePath(`/admin/blogs/${id}/edit`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Server connection failed' };
  }
}

export async function deleteAdminBlog(id: string) {
  try {
    const res = await fetchWithAuth(`/blogs/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.message || 'Failed to delete blog' };
    }

    revalidatePath('/admin/blogs');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Server connection failed' };
  }
}

export async function bulkUpdateBlogStatus(ids: string[], status: string) {
  try {
    let successCount = 0;
    for (const id of ids) {
      // Create FormData with just the status
      const formData = new FormData();
      formData.append('status', status);
      
      const res = await fetchWithAuth(`/blogs/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (res.ok) successCount++;
    }
    
    revalidatePath('/admin/blogs');
    return { success: true, count: successCount };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to process bulk status update' };
  }
}

export async function bulkDeleteBlogs(ids: string[]) {
  try {
    let successCount = 0;
    for (const id of ids) {
      const res = await fetchWithAuth(`/blogs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) successCount++;
    }
    
    revalidatePath('/admin/blogs');
    revalidatePath('/admin/dashboard');
    return { success: true, count: successCount };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to process bulk deletion' };
  }
}
