const axios = require('axios');

async function testCreateBlog() {
  try {
    // 1. Login
    const loginRes = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@llamacorp.com',
      password: 'admin1234'
    });
    const token = loginRes.data.accessToken;

    // 2. Get authors
    const authorsRes = await axios.get('http://localhost:5001/api/authors');
    const authors = authorsRes.data.data;
    if (authors.length === 0) {
      console.log('No authors found, cannot create blog.');
      return;
    }
    const authorId = authors[0]._id;

    // 3. Create blog
    const blogData = {
      title: 'Test Blog',
      content: 'This is a test blog',
      category: 'Development',
      author: authorId,
      status: 'published'
    };

    const res = await axios.post('http://localhost:5001/api/blogs', blogData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Success:', res.data);
  } catch (error) {
    console.error('Error in request:', error.response ? error.response.data : error.message);
  }
}

testCreateBlog();
