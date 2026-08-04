export default async function handler(req, res) {
  try {
    const backendUrl = process.env.VITE_API_URL || 'http://localhost:5001/api';
    const rootUrl = backendUrl.replace(/\/api\/?$/, '');
    
    const response = await fetch(`${rootUrl}/robots.txt`);
    if (!response.ok) throw new Error(`Backend responded with ${response.status}`);
    
    const txt = await response.text();
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache at edge for 1 day
    res.status(200).send(txt);
  } catch (error) {
    console.error('Error proxying robots.txt:', error);
    res.status(500).send('Error generating robots.txt');
  }
}
