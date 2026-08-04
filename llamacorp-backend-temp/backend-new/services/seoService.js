const Blog = require('../models/Blog');

// Simple XML escaper
const escapeXml = (unsafe) => {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
};

// Deployment date for static pages
const deploymentDate = new Date().toISOString();

// Cache
let sitemapCache = {
    xml: null,
    lastGenerated: 0
};
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

exports.invalidateCache = () => {
    sitemapCache.xml = null;
    sitemapCache.lastGenerated = 0;
};

exports.getSitemapXml = async () => {
    const now = Date.now();
    
    // Return cached XML if valid
    if (sitemapCache.xml && (now - sitemapCache.lastGenerated < CACHE_DURATION_MS)) {
        return sitemapCache.xml;
    }

    const siteUrl = (process.env.SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');

    // Static pages with priorities
    const staticPages = [
        { path: '', priority: '1.0' },
        { path: '/work', priority: '0.5' },
        { path: '/services', priority: '0.9' },
        { path: '/pricing', priority: '0.9' },
        { path: '/blog', priority: '0.8' },
        { path: '/faq', priority: '0.6' },
        { path: '/contact', priority: '0.5' },
        { path: '/about', priority: '0.5' }
    ];

    let urls = '';

    // Add static pages
    for (const page of staticPages) {
        urls += `
  <url>
    <loc>${escapeXml(`${siteUrl}${page.path}`)}</loc>
    <lastmod>${deploymentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Query MongoDB for published blogs
    try {
        // Optimized query: only fetch needed fields
        const blogs = await Blog.find(
            { status: 'published', deleted: { $ne: true } },
            { slug: 1, updatedAt: 1, createdAt: 1 }
        ).lean();

        for (const blog of blogs) {
            const lastModDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date(blog.createdAt).toISOString();
            urls += `
  <url>
    <loc>${escapeXml(`${siteUrl}/blog/${blog.slug}`)}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        }
    } catch (error) {
        // Log error but do not crash. Sitemap will be generated with static pages only.
        console.error('Error generating blog sitemap entries:', error);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    // Update cache
    sitemapCache.xml = xml;
    sitemapCache.lastGenerated = now;

    return xml;
};

exports.getRobotsTxt = () => {
    const siteUrl = (process.env.SITE_URL || 'http://localhost:5173').replace(/\/+$/, '');
    
    return `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /dashboard/
Disallow: /login/
Disallow: /api/
Disallow: /private/

Sitemap: ${siteUrl}/sitemap.xml
`;
};
