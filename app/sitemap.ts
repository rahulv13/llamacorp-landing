import type { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/api/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.llamacorp.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  try {
    // Fetch all blogs using the existing API layer
    // getBlogs gracefully handles failures and returns [] on error
    const blogs = await getBlogs();
    
    if (!Array.isArray(blogs)) {
      return staticRoutes;
    }

    // Create a sitemap entry for each blog
    const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : (blog.createdAt ? new Date(blog.createdAt) : new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Failed to generate dynamic sitemap entries for blogs:', error);
    // Gracefully fallback to static routes only
    return staticRoutes;
  }
}
