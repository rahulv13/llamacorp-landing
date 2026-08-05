export default async function handler(req, res) {
  try {
    const backendUrl = process.env.VITE_API_URL || 'https://llamacorp-backend-temp.onrender.com/api';
    const siteUrl = 'https://www.llamacorp.in';
    
    // Static pages
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
    const deploymentDate = new Date().toISOString();

    for (const page of staticPages) {
      urls += `
  <url>
    <loc>${siteUrl}${page.path}</loc>
    <lastmod>${deploymentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    try {
      const response = await fetch(`${backendUrl}/blogs`);
      if (response.ok) {
        const { data: blogs } = await response.json();
        for (const blog of blogs) {
          const lastModDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date(blog.createdAt).toISOString();
          urls += `
  <url>
    <loc>${siteUrl}/blog/${blog.slug}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        }
      }
    } catch (err) {
      console.error('Error fetching blogs for sitemap:', err);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache at edge for 5 mins
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
