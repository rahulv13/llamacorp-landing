const https = require('https');
https.get('https://llamacorp-backend-temp.onrender.com/api/blogs/ai-driven-web-design-and-development-what-it-actually-means-and-how-to-learn-it', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('metaDescription:', json.data.metaDescription);
      console.log('canonicalUrl:', json.data.canonicalUrl);
    } catch(e) {
      console.log('Error parsing JSON:', data.substring(0, 100));
    }
  });
});
