export default async function handler(req, res) {
  try {
    const backendUrl = process.env.VITE_API_URL || 'http://localhost:5001/api';
    // Remove /api if present to get the root backend url where SEO routes live
    const rootUrl = backendUrl.replace(/\/api\/?$/, '');
    
    const response = await fetch(`${rootUrl}/sitemap.xml`);
    if (!response.ok) throw new Error(`Backend responded with ${response.status}`);
    
    const xml = await response.text();
    
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=300'); // Cache at edge for 5 mins
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error proxying sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
