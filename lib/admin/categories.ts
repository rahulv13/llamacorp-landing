'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function getAdminCategories() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    const res = await fetch(`${API_URL}/categories`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });
    
    if (!res.ok) throw new Error('Failed to fetch categories');
    
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Failed to get categories:', error);
    return [];
  }
}
