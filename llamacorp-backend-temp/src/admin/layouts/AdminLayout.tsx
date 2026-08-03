import React, { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { LayoutDashboard, FileText, Settings, LogOut, DollarSign, Users, Mail, Menu, X, FolderTree, Image as ImageIcon, BarChart2, MessageSquare, Tag } from 'lucide-react';
import { GlassBlurFilter } from '../../components/ui/GlassBlurFilter';

export default function AdminLayout() {
  const { isAdmin, logout } = useAdmin();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Tags', path: '/admin/tags', icon: Tag },
    { name: 'Authors', path: '/admin/authors', icon: Users },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Newsletter', path: '/admin/newsletter', icon: Mail },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart2 },
    { name: 'Comments', path: '/admin/comments', icon: MessageSquare },
    { name: 'Pages', path: '/admin/content', icon: FileText },
    { name: 'Pricing', path: '/admin/pricing', icon: DollarSign },
    { name: 'Inbox', path: '/admin/contacts', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans relative overflow-x-hidden">

      {/* Global SVG Filter for Refraction */}
      <GlassBlurFilter />

      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none fixed z-0">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4" type="video/mp4" />
      </video>



      {/* Top Navigation */}
      <header className="h-20 liquid-glass border-b border-white/10 z-30 sticky top-0 px-4 md:px-6 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-wide shrink-0">
            llamacorp Admin
          </span>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
                    isActive
                      ? 'liquid-glass-strong rounded-full text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-full'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : ''} />
                  <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white liquid-glass rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="h-8 w-px bg-white/10 hidden lg:block"></div>
          <button
            onClick={logout}
            className="hidden lg:flex items-center gap-2 px-4 py-2 liquid-glass-strong rounded-full text-gray-300 hover:text-white transition-all group"
          >
            <LogOut size={16} className="group-hover:text-red-400 transition-colors" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-20 pt-20 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
           <nav className="flex flex-col gap-2 p-6 h-full overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 transition-all duration-300 ${
                    isActive
                      ? 'liquid-glass-strong rounded-2xl text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : ''} />
                  <span className="font-medium text-lg">{item.name}</span>
                </Link>
              );
            })}

            <div className="mt-8 pt-8 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logout();
                }}
                className="flex w-full items-center justify-center gap-3 px-6 py-4 liquid-glass-strong rounded-2xl text-gray-300 hover:text-white transition-all"
              >
                <LogOut size={20} className="text-red-400" />
                <span className="font-medium text-lg">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
