'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function fetchWithAuth(endpoint: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) throw new Error('Not authenticated');

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  return fetch(`${API_URL}${endpoint}`, { headers });
}

export async function getDashboardStats() {
  try {
    const res = await fetchWithAuth('/dashboard');
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSystemHealth() {
  try {
    // The health endpoint is public and at the root typically, but based on server.js it is at /health
    const url = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001';
    const res = await fetch(`${url}/health`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch health');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
