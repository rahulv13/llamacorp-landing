import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FileText, Eye, Users, MessageCircle, 
  Plus, Edit3, Image as ImageIcon, TrendingUp,
  ArrowRight, MoreVertical, FolderTree, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from 'axios';
import { useAdmin } from '../../context/AdminContext';

const StatCard = ({ title, value, icon: Icon, trend, colorClass, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${colorClass}`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
        <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} className="mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h4 className="text-[#777] font-medium text-sm mb-1">{title}</h4>
    <p className="text-3xl font-bold text-[#111]">{value}</p>
  </motion.div>
);

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({
    totalBlogs: 0,
    totalViews: 0,
    published: 0,
    drafts: 0,
    recentBlogs: []
  });
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <Helmet>
        <title>Dashboard - Llamacorp Admin</title>
      </Helmet>

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111]">Dashboard Overview</h1>
          <p className="text-[#555] mt-1">Welcome back. Here's what's happening with your blog today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/blogs/create" className="bg-[#111] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#333] transition-colors shadow-lg shadow-black/10">
            <Plus size={18} />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Blogs" 
          value={loading ? "..." : stats.totalBlogs} 
          icon={FileText} 
          trend={null} 
          colorClass="bg-blue-600" 
          delay={0.1} 
        />
        <StatCard 
          title="Total Views" 
          value={loading ? "..." : stats.totalViews} 
          icon={Eye} 
          trend={null} 
          colorClass="bg-violet-600" 
          delay={0.2} 
        />
        <StatCard 
          title="Published Posts" 
          value={loading ? "..." : stats.published} 
          icon={Users} 
          trend={null} 
          colorClass="bg-emerald-600" 
          delay={0.3} 
        />
        <StatCard 
          title="Drafts" 
          value={loading ? "..." : stats.drafts} 
          icon={Edit3} 
          colorClass="bg-amber-500" 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Posts Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden"
        >
          <div className="p-6 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-lg text-[#111]">Recent Posts</h3>
            <Link to="/admin/blogs" className="text-sm text-blue-600 font-medium hover:underline flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-[#777] text-xs uppercase tracking-wider bg-gray-50/50">
                  <th className="p-4 font-medium">Post Details</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Views</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {stats.recentBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-black/[0.02] transition-colors group">
                    <td className="p-4 flex items-center gap-4">
                      {blog.coverImage ? (
                        <img src={blog.coverImage} alt={blog.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                      )}
                      <div>
                        <div className="font-semibold text-sm text-[#111] line-clamp-1">{blog.title}</div>
                        <div className="text-xs text-[#777] mt-1">{new Date(blog.createdAt).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        blog.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        blog.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[#555] font-medium">{blog.views || 0}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-[#777] hover:text-[#111] hover:bg-black/5 rounded-lg transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {stats.recentBlogs.length === 0 && !loading && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-sm text-gray-500">No recent posts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions & Drafts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-col gap-6"
        >
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-5 border-b border-black/5 bg-gray-50/50">
              <h3 className="font-bold text-lg text-[#111]">Quick Actions</h3>
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              <Link to="/admin/blogs/create" className="flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-black/5 hover:bg-black/5 transition-all gap-2 text-[#555] hover:text-[#111]">
                <Edit3 size={24} className="text-blue-600" />
                <span className="text-sm font-medium">Write Post</span>
              </Link>
              <Link to="/admin/media" className="flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-black/5 hover:bg-black/5 transition-all gap-2 text-[#555] hover:text-[#111]">
                <ImageIcon size={24} className="text-purple-600" />
                <span className="text-sm font-medium">Add Media</span>
              </Link>
              <Link to="/admin/categories" className="flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-black/5 hover:bg-black/5 transition-all gap-2 text-[#555] hover:text-[#111]">
                <FolderTree size={24} className="text-amber-500" />
                <span className="text-sm font-medium">Categories</span>
              </Link>
              <Link to="/admin/newsletter" className="flex flex-col items-center justify-center p-4 rounded-xl border border-transparent hover:border-black/5 hover:bg-black/5 transition-all gap-2 text-[#555] hover:text-[#111]">
                <Mail size={24} className="text-rose-500" />
                <span className="text-sm font-medium">Newsletter</span>
              </Link>
            </div>
          </div>

          {/* Recently Edited Drafts */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex-1">
            <div className="p-5 border-b border-black/5 bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-bold text-lg text-[#111]">Recent Drafts</h3>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {stats.recentBlogs.filter(b => b.status === 'draft' || b.status === 'scheduled').slice(0,3).map(draft => (
                <div key={draft._id} className="flex gap-3 group cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#111] group-hover:text-blue-600 transition-colors line-clamp-2">{draft.title}</h4>
                    <p className="text-xs text-[#777] mt-1">Last edited {new Date(draft.updatedAt || draft.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {stats.recentBlogs.filter(b => b.status === 'draft').length === 0 && !loading && (
                <p className="text-sm text-[#777] text-center py-4">No recent drafts.</p>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </AdminLayout>
  );
}
