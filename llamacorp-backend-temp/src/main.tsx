import { StrictMode } from 'react';
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App.tsx';
import Services from './Services.tsx';
import About from './About.tsx';
import Pricing from './Pricing.tsx';
import Blog from './Blog.tsx';
import BlogPost from './BlogPost.tsx';
import Auth from './Auth.tsx';
import PricingWebDesign from './pages/PricingWebDesign.tsx';
import PricingSocialMedia from './pages/PricingSocialMedia.tsx';
import PricingSeo from './pages/PricingSeo.tsx';
import PricingBranding from './pages/PricingBranding.tsx';
import Contact from './Contact.tsx';
import ServicePage from './pages/ServicePage.tsx';
import { AdminProvider } from './context/AdminContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import AdminLayout from './admin/layouts/AdminLayout.tsx';
import AdminLogin from './admin/pages/AdminLogin.tsx';
import AdminDashboard from './admin/pages/AdminDashboard.tsx';
import BlogList from './admin/pages/blogs/BlogList.tsx';
import BlogEditor from './admin/pages/blogs/BlogEditor.tsx';
import PricingManager from './admin/pages/pricing/PricingManager.tsx';
import ContentEditor from './admin/pages/content/ContentEditor.tsx';
import AuthorList from './admin/pages/authors/AuthorList.tsx';
import ContactList from './admin/pages/contacts/ContactList.tsx';
import AuthorEditor from './admin/pages/authors/AuthorEditor.tsx';
import AdminCategories from './admin/pages/AdminCategories.tsx';
import AdminTags from './admin/pages/AdminTags.tsx';
import AdminMediaLibrary from './admin/pages/AdminMediaLibrary.tsx';
import AdminPlaceholderPage from './admin/pages/AdminPlaceholderPage.tsx';
import { Mail, Settings, BarChart2, MessageSquare } from 'lucide-react';
import './index.css';
import './lib/axiosConfig';

const routes = [
  { path: "/", element: <App /> },
  { path: "/services", element: <Services /> },
  { path: "/services/:slug", element: <ServicePage /> },
  { path: "/about", element: <About /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:id", element: <BlogPost /> },
  { path: "/auth", element: <Auth /> },
  { path: "/pricing/ai-web-design", element: <PricingWebDesign /> },
  { path: "/pricing/social-media", element: <PricingSocialMedia /> },
  { path: "/pricing/seo", element: <PricingSeo /> },
  { path: "/pricing/branding", element: <PricingBranding /> },
  { path: "/contact", element: <Contact /> },

  // Admin Routes
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "blogs", element: <BlogList /> },
      { path: "blogs/new", element: <BlogEditor /> },
      { path: "blogs/edit/:id", element: <BlogEditor /> },
      { path: "authors", element: <AuthorList /> },
      { path: "authors/new", element: <AuthorEditor /> },
      { path: "authors/edit/:id", element: <AuthorEditor /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "tags", element: <AdminTags /> },
      { path: "media", element: <AdminMediaLibrary /> },
      { path: "analytics", element: <AdminPlaceholderPage title="Analytics" description="View blog and website performance metrics." icon={BarChart2} /> },
      { path: "newsletter", element: <AdminPlaceholderPage title="Newsletter" description="Manage email campaigns and subscribers." icon={Mail} /> },
      { path: "comments", element: <AdminPlaceholderPage title="Comments" description="Moderate blog comments." icon={MessageSquare} /> },
      { path: "settings", element: <AdminPlaceholderPage title="Settings" description="Global blog settings." icon={Settings} /> },
      { path: "pricing", element: <PricingManager /> },
      { path: "content", element: <ContentEditor /> },
      { path: "contacts", element: <ContactList /> }
    ]
  }
];

// Helper to wrap routes with context providers directly
const withProviders = (Component: React.ComponentType) => {
  return (
    <UserProvider>
      <AdminProvider>
        <Component />
      </AdminProvider>
    </UserProvider>
  );
};

const wrappedRoutes = [
  { path: "/", element: withProviders(App) },
  { path: "/services", element: withProviders(Services) },
  { path: "/services/:slug", element: withProviders(ServicePage) },
  { path: "/about", element: withProviders(About) },
  { path: "/pricing", element: withProviders(Pricing) },
  { path: "/blog", element: withProviders(Blog) },
  { path: "/blog/:id", element: withProviders(BlogPost) },
  { path: "/auth", element: withProviders(Auth) },
  { path: "/pricing/ai-web-design", element: withProviders(PricingWebDesign) },
  { path: "/pricing/social-media", element: withProviders(PricingSocialMedia) },
  { path: "/pricing/seo", element: withProviders(PricingSeo) },
  { path: "/pricing/branding", element: withProviders(PricingBranding) },
  { path: "/contact", element: withProviders(Contact) },

  // Admin Routes
  { path: "/admin/login", element: withProviders(AdminLogin) },
  {
    path: "/admin",
    element: withProviders(AdminLayout),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "blogs", element: <BlogList /> },
      { path: "blogs/new", element: <BlogEditor /> },
      { path: "blogs/edit/:id", element: <BlogEditor /> },
      { path: "authors", element: <AuthorList /> },
      { path: "authors/new", element: <AuthorEditor /> },
      { path: "authors/edit/:id", element: <AuthorEditor /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "tags", element: <AdminTags /> },
      { path: "media", element: <AdminMediaLibrary /> },
      { path: "analytics", element: <AdminPlaceholderPage title="Analytics" description="View blog and website performance metrics." icon={BarChart2} /> },
      { path: "newsletter", element: <AdminPlaceholderPage title="Newsletter" description="Manage email campaigns and subscribers." icon={Mail} /> },
      { path: "comments", element: <AdminPlaceholderPage title="Comments" description="Moderate blog comments." icon={MessageSquare} /> },
      { path: "settings", element: <AdminPlaceholderPage title="Settings" description="Global blog settings." icon={Settings} /> },
      { path: "pricing", element: <PricingManager /> },
      { path: "content", element: <ContentEditor /> },
      { path: "contacts", element: <ContactList /> }
    ]
  }
];

export const createRoot = ViteReactSSG(
  {
    routes: wrappedRoutes
  },
  () => {
    //
  },
  {
    rootContainer: '#root',
  }
);
