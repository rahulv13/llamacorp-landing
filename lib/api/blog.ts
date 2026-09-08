// src/lib/api/blog.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function getBlogs(limit?: number) {
  try {
    const url = limit ? `${API_URL}/blogs?limit=${limit}` : `${API_URL}/blogs`;
    const res = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
    if (!res.ok) throw new Error('Failed to fetch blogs');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}
