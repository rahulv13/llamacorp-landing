import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, image = 'https://www.llamacorp.in/og-image.jpg', children }) {
  const siteName = 'Llamacorp';
  // Allow fullTitle to be just the title if no prefix needed, or automatically append siteName
  const fullTitle = title ? `${title} | ${siteName}` : 'AI Web Design & Development Agency | Llamacorp';
  
  const siteUrl = 'https://www.llamacorp.in';
  const url = canonical ? `${siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Llamacorp is a premium AI-powered web design and development agency building high-performance websites for startups and businesses.'} />
      <meta name="keywords" content="web development, web design, AI agency, React development, MERN stack, SaaS" />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'Premium AI-powered web design and development agency.'} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || 'Premium AI-powered web design and development agency.'} />
      <meta name="twitter:image" content={image} />
      {children}
    </Helmet>
  );
}
