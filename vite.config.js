import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/sitemap.xml': 'http://localhost:5001',
      '/robots.txt': 'http://localhost:5001',
    },
  },
})
