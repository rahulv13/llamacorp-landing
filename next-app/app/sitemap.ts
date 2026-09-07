import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { staticRoutes } from '@/lib/navigation';
import axios from 'axios';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route.path === '/' ? 1 : 0.8,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const res = await axios.get(`${apiUrl}/blogs`);
    const posts = res.data.data;
    
    if (posts && Array.isArray(posts)) {
      blogRoutes = posts.map((post: any) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return [...routes, ...blogRoutes];
}
