import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // Check if the URL is for the admin API or user API
    const isAdminRoute = config.url?.includes('/api/admin') ||
                         config.url?.includes('/api/content') ||
                         config.url?.includes('/api/pricing') ||
                         config.url?.includes('/api/authors') ||
                         config.url?.includes('/api/blogs') ||
                         // Check referer or URL for auth to decide which token to send if needed
                         // But for simplicity, we can just send the appropriate token based on whether we're in the admin area
                         window.location.pathname.startsWith('/admin');

    // Wait, the API routes aren't always strictly separated. Let's look at the window location instead.
    if (window.location.pathname.startsWith('/admin')) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        config.headers['Authorization'] = `Bearer ${adminToken}`;
      }
    } else {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
