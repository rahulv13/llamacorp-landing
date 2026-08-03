import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    ssgOptions: {
      script: 'async',
      formatting: 'none',
      async includedRoutes(paths, routes) {
        // Exclude all admin routes and unresolved blog template paths from SSG
        let filteredPaths = paths.filter(path => !path.startsWith('/admin') && path !== '/blog/:id');

        // Fetch dynamic blog routes
        const apiUrl = env.VITE_API_URL || 'http://localhost:5000';
        try {
          const res = await fetch(`${apiUrl}/api/blogs`);
          if (res.ok) {
            const posts = await res.json();
            const blogPaths = posts
              .filter((post: any) => post.status === 'published' || !post.status)
              .filter((post: any) => post.slug)
              .map((post: any) => `/blog/${post.slug}`);
            filteredPaths = [...filteredPaths, ...blogPaths];
          }
        } catch (err) {
          console.warn('Warning: Could not fetch blogs for SSG. Falling back to static routes only.', err);
        }

        return filteredPaths;
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
