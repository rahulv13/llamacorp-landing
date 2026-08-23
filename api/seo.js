export default async function handler(req, res) {
  try {
    const backendUrl = process.env.VITE_API_URL || 'https://llamacorp-backend-temp.onrender.com/api';
    const siteUrl = 'https://www.llamacorp.in';
    
    // Default fallback HTML (if we can't fetch index.html)
    let baseHtml = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Llamacorp | Build Your Digital Future</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`;
    
    try {
      // On Vercel, req.headers.host contains the current deployment hostname
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers.host || 'www.llamacorp.in';
      
      // Fetch the raw index.html that we configured in vercel.json rewrites
      const response = await fetch(`${protocol}://${host}/raw-index`);
      if (response.ok) {
        baseHtml = await response.text();
      } else {
        console.warn('Failed to fetch /raw-index, status:', response.status);
      }
    } catch (err) {
      console.warn('Error fetching raw-index:', err.message);
    }

    const urlPath = req.url.split('?')[0]; // Remove query string

    let title = 'Llamacorp | Build Your Digital Future';
    let description = 'Llamacorp provides cutting-edge web design, development, and SEO services.';
    let canonical = `${siteUrl}${urlPath}`;
    
    // Most SEO tools recommend consistency. We use trailing slash for root, no trailing slash for others.
    if (urlPath === '/' || urlPath === '') {
      canonical = `${siteUrl}/`;
    } else {
      // Remove trailing slash if present
      canonical = `${siteUrl}${urlPath.replace(/\/$/, '')}`;
    }

    // Strip existing title, description, canonical, and og tags from baseHtml to prevent duplicates
    let cleanedHtml = baseHtml
      .replace(/<title>.*?<\/title>/gi, '')
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
      .replace(/<meta\s+property=["']og:(url|title|description|image|type)["'][^>]*>/gi, '');

    let structuredData = null;
    let ogType = 'website';
    let ogImage = '';

    // Check if it's a dynamic blog post
    const blogMatch = urlPath.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      try {
        const blogRes = await fetch(`${backendUrl}/blogs/${slug}`);
        if (blogRes.ok) {
          const { data: blog } = await blogRes.json();
          if (blog) {
            let baseTitle = blog.metaTitle || blog.title;
            title = baseTitle.includes('| Llamacorp') ? baseTitle : `${baseTitle} | Llamacorp`;
            
            if (blog.canonicalUrl) {
              canonical = blog.canonicalUrl;
            }

            // create a short snippet from content if excerpt doesn't exist
            description = blog.metaDescription || blog.excerpt || (blog.content ? String(blog.content).substring(0, 150).replace(/<[^>]+>/g, '') + '...' : description);
            
            // Clean up description newlines and quotes
            description = description.replace(/[\n\r]+/g, ' ').replace(/"/g, '&quot;');
            
            ogType = 'article';
            const coverImage = blog.coverImage && blog.coverImage !== 'no-photo.jpg' 
              ? blog.coverImage 
              : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80';
            ogImage = coverImage;

            const escapeHtml = (unsafe) => {
              if (!unsafe) return '';
              return String(unsafe)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
            };

            const authorName = blog.author?.name || 'Author';
            const categoryName = blog.category?.name || blog.category || 'Uncategorized';
            const publishDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : '';
            const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishDate;
            
            let rawContent = '';
            if (typeof blog.content === 'object') {
              try {
                rawContent = JSON.stringify(blog.content);
              } catch (e) {}
            } else {
              rawContent = String(blog.content || '');
            }

            const fallbackHtml = `
              <div style="display:none;" id="seo-fallback">
                <article>
                  <h1>${escapeHtml(blog.title)}</h1>
                  <p>By ${escapeHtml(authorName)} | Category: ${escapeHtml(categoryName)} | Published: ${escapeHtml(publishDate)}</p>
                  <img src="${escapeHtml(coverImage)}" alt="${escapeHtml(blog.title)}" />
                  <div>${escapeHtml(rawContent)}</div>
                </article>
              </div>
            `;

            cleanedHtml = cleanedHtml.replace(
              '<div id="root"></div>', 
              `<div id="root">${fallbackHtml}</div>`
            );

            structuredData = {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": description,
              "url": canonical,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonical
              },
              "image": [ coverImage ],
              "datePublished": publishDate,
              "dateModified": modifiedDate,
              "author": {
                "@type": "Person",
                "name": authorName
              },
              "publisher": {
                "@type": "Organization",
                "name": "Llamacorp",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${siteUrl}/logo.png`
                }
              }
            };
          }
        }
      } catch (err) {
        console.error('Error fetching blog data for SEO:', err);
      }
    } else if (urlPath === '/blog') {
      title = 'Blog | Llamacorp';
      description = 'Read the latest insights and news from Llamacorp on web development, design, and SEO.';
    } else if (urlPath === '/work') {
      title = 'Our Work | Llamacorp';
      description = 'Check out the amazing projects and case studies by Llamacorp.';
    } else if (urlPath === '/services') {
      title = 'Services | Llamacorp';
      description = 'Explore our web design, development, and SEO services.';
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Llamacorp Services",
        "description": description,
        "url": canonical,
        "provider": {
          "@type": "Organization",
          "name": "Llamacorp",
          "url": siteUrl
        }
      };
    } else if (urlPath === '/' || urlPath === '') {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Llamacorp",
        "url": siteUrl,
        "description": description
      };
    }

    const jsonLdTag = structuredData 
      ? `\n    <script type="application/ld+json">\n    ${JSON.stringify(structuredData)}\n    </script>` 
      : '';

    const seoTags = `
    <title data-rh="true">${title}</title>
    <meta data-rh="true" name="description" content="${description}" />
    <link data-rh="true" rel="canonical" href="${canonical}" />
    <meta data-rh="true" property="og:url" content="${canonical}" />
    <meta data-rh="true" property="og:title" content="${title}" />
    <meta data-rh="true" property="og:description" content="${description}" />${ogImage ? `\n    <meta data-rh="true" property="og:image" content="${ogImage}" />` : ''}
    <meta data-rh="true" property="og:type" content="${ogType}" />${jsonLdTag}
    `;

    // Inject tags into HTML by placing them right before the closing </head> tag
    const modifiedHtml = cleanedHtml.replace(
      '</head>',
      `${seoTags}\n</head>`
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300'); // Edge cache
    res.status(200).send(modifiedHtml);
  } catch (error) {
    console.error('Error serving SEO HTML:', error);
    res.status(500).send('Server Error generating page content');
  }
}
