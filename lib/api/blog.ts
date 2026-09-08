const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

function normalizeArray(data: unknown): unknown[] {
  // Handle both { data: [...] } and [...] response shapes
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && Array.isArray((data as Record<string, unknown>).data)) {
    return (data as Record<string, unknown>).data as unknown[];
  }
  return [];
}

function normalizeSingle(data: unknown): unknown {
  // Handle both { data: {...} } and {...} response shapes
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    // If it has a 'data' key that is an object (not array), unwrap it
    if ('data' in obj && obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
      return obj.data;
    }
    // If it has a 'data' key that looks like a blog (has slug/title), unwrap it
    if ('data' in obj) return obj.data;
    // Otherwise return as-is (already the blog object)
    return data;
  }
  return null;
}

export async function getBlogs(limit?: number) {
  const url = limit ? `${API_URL}/blogs?limit=${limit}` : `${API_URL}/blogs`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`[Blog API] GET ${url} → ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return normalizeArray(data);
  } catch (error) {
    console.error(`[Blog API] GET ${url} failed:`, error);
    return [];
  }
}

export async function getCategories() {
  const url = `${API_URL}/categories`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[Blog API] GET ${url} → ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return normalizeArray(data);
  } catch (error) {
    console.error(`[Blog API] GET ${url} failed:`, error);
    return [];
  }
}

export async function getBlogBySlug(slug: string) {
  const url = `${API_URL}/blogs/${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`[Blog API] GET ${url} → ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return normalizeSingle(data);
  } catch (error) {
    console.error(`[Blog API] GET ${url} failed:`, error);
    return null;
  }
}
