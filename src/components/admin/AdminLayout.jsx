import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, FileText, FolderTree, Users, Tags, 
  Image as ImageIcon, Mail, Search, MessageSquare, 
  BarChart2, Settings, LogOut, Menu, X, Bell 
} from 'lucide-react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Blogs', icon: FileText, path: '/admin/blogs' },
  { name: 'Categories', icon: FolderTree, path: '/admin/categories' },
  { name: 'Authors', icon: Users, path: '/admin/authors' },
  { name: 'Tags', icon: Tags, path: '/admin/tags' },
  { name: 'Media Library', icon: ImageIcon, path: '/admin/media' },
  { name: 'Newsletter', icon: Mail, path: '/admin/newsletter' },
  { name: 'SEO', icon: Search, path: '/admin/seo' },
  { name: 'Comments', icon: MessageSquare, path: '/admin/comments' },
  { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAdmin, logout } = useAdmin();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden text-[#111] font-sans">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-black/5 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-black/5">
          <Link to="/admin" className="text-xl font-bold tracking-tight">
            Llamacorp <span className="text-blue-600">Admin</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-black/5">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/admin' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#111] text-white shadow-md' 
                    : 'text-[#555] hover:bg-black/5 hover:text-[#111]'
                }`}
              >
                <link.icon size={18} className={isActive ? 'text-white/80' : 'text-[#777]'} />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-black/5">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#555] hover:bg-black/5 hover:text-[#111] transition-all duration-200">
            <LogOut size={18} className="text-[#777]" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 lg:px-10 z-30">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-black/5">
              <Menu size={20} />
            </button>
            
            {/* Global Search */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search blogs, categories..." 
                className="pl-10 pr-4 py-2 bg-black/[0.03] border border-transparent rounded-full focus:bg-white focus:border-black/10 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm w-64 lg:w-96"
              />
              <div className="absolute right-3 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white border border-black/10 text-gray-500">
                ⌘K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
              <Bell size={20} className="text-[#555]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-black/10 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer p-1 pr-3 rounded-full hover:bg-black/5 transition-colors">
              <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-8 h-8 rounded-full border border-black/10" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold leading-none">Admin User</p>
                <p className="text-[11px] text-[#777] mt-1">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
