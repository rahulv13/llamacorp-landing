import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://llamacorp.vercel.app';

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/pricing/ai-web-design', changefreq: 'monthly', priority: '0.6' },
  { path: '/pricing/social-media', changefreq: 'monthly', priority: '0.6' },
  { path: '/pricing/seo', changefreq: 'monthly', priority: '0.6' },
  { path: '/pricing/branding', changefreq: 'monthly', priority: '0.6' }
];

async function generateSitemap() {
  let posts = [];
  try {
    const res = await fetch(`${API_URL}/api/blogs`);
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }
    posts = await res.json();
  } catch (err) {
    console.warn('Warning: Could not fetch blogs for sitemap generation. Falling back to static routes only.', err.message);
  }

  const dynamicRoutes = posts
    .filter(post => post.slug)
    .map(post => {
      const dateStr = post.updatedAt || post.publishedDate || post.createdAt;
      let lastmod = '';
      if (dateStr) {
        try {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) {
            lastmod = `\n    <lastmod>${d.toISOString().split('T')[0]}</lastmod>`;
          }
        } catch (e) {}
      }
      return {
        path: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: '0.7',
        lastmod
      };
    });

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route.path === '/' ? '/' : route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${route.lastmod ? route.lastmod : ''}
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemapContent.trim() + '\n', 'utf8');
  console.log(`Successfully generated sitemap.xml at ${SITEMAP_PATH} with ${allRoutes.length} routes.`);
}

generateSitemap();
