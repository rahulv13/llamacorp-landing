import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Work from './pages/Work';
import BlogIndex from './pages/BlogIndex';
import BlogArticle from './pages/BlogArticle';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogList from './pages/admin/AdminBlogList';
import AdminBlogCreate from './pages/admin/AdminBlogCreate';
import AdminPlaceholder from './pages/admin/AdminPlaceholder';
import AdminAuthors from './pages/admin/AdminAuthors';
import AdminCategories from './pages/admin/AdminCategories';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminProvider } from './context/AdminContext';
import { Toaster } from 'sonner';

import './index.css';

function App() {
  return (
    <HelmetProvider>
      <AdminProvider>
        <Router>
          <Toaster richColors position="bottom-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<AdminBlogList />} />
          <Route path="/admin/blogs/create" element={<AdminBlogCreate />} />
          <Route path="/admin/blogs/edit/:id" element={<AdminBlogCreate />} />
          
          {/* Admin Placeholder Routes */}
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/authors" element={<AdminAuthors />} />
          <Route path="/admin/tags" element={<AdminPlaceholder title="Tags" description="Manage blog tags for better categorization." />} />
          <Route path="/admin/media" element={<AdminPlaceholder title="Media Library" description="Centralized media management." />} />
          <Route path="/admin/newsletter" element={<AdminPlaceholder title="Newsletter" description="Manage subscribers and campaigns." />} />
          <Route path="/admin/seo" element={<AdminPlaceholder title="SEO Panel" description="Global SEO settings and generation." />} />
          <Route path="/admin/comments" element={<AdminPlaceholder title="Comments" description="Moderate blog comments." />} />
          <Route path="/admin/analytics" element={<AdminPlaceholder title="Analytics" description="View detailed blog performance." />} />
          <Route path="/admin/settings" element={<AdminPlaceholder title="Settings" description="Configure blog page settings and permissions." />} />
        </Routes>
      </Router>
      </AdminProvider>
    </HelmetProvider>
  );
}

export default App;
