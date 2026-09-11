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

  console.log('--- fetchWithAuth ---');
  console.log('URL:', `${API_URL}${endpoint}`);
  console.log('Headers:', Object.fromEntries(headers.entries()));

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
    const res = await fetchWithAuth('/blogs', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAdminBlog(id: string) {
  try {
    const res = await fetchWithAuth(`/blogs/id/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch blog');
    }
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createAdminBlog(data: any) {
  try {
    console.log("1. Publish button clicked");
    console.log("2. Server Action entered");
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return { error: 'Not authenticated' };

    const authorId = getAdminIdFromToken(token);
    if (!authorId) return { error: 'Could not resolve author from token' };

    data.author = authorId;

    console.log("3. Payload validated");
    
    console.log("4. Sending request to backend");
    console.log("Before await fetchWithAuth");
    const res = await fetchWithAuth('/blogs', {
      method: 'POST',
      body: JSON.stringify(data), 
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("After await fetchWithAuth");
    console.log("5. Backend responded");

    if (!res.ok) {
      console.error('--- BACKEND RETURNED !OK ---');
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to create blog' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
    }

    console.log("6. Saving to MongoDB (backend already did this)");
    console.log("7. Cloudinary upload complete (handled separately by media picker)");
    
    console.log("Before await revalidatePath");
    revalidatePath('/admin/blogs');
    revalidatePath('/admin/dashboard');
    console.log("After await revalidatePath");

    console.log("8. Returning response");
    return { success: true };
  } catch (error) {
    console.error('--- CAUGHT ERROR IN createAdminBlog ---');
    console.error(error);
    return { error: error instanceof Error ? error.message : 'Server connection failed' };
  }
}

export async function updateAdminBlog(id: string, data: any) {
  try {
    const res = await fetchWithAuth(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { error: json.error || json.message || 'Failed to update blog' };
      } catch (e) {
        return { error: `Backend Error ${res.status}: ${text}` };
      }
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
