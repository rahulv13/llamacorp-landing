import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Eye, 
  CheckSquare, Square
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedBlogs, setSelectedBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Blog deleted successfully');
      setBlogs(blogs.filter(b => b._id !== id));
      setSelectedBlogs(selectedBlogs.filter(bId => bId !== id));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete blog');
    }
  };

  // Filtering logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (blog.author?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedBlogs.length === filteredBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(filteredBlogs.map(b => b._id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedBlogs.includes(id)) {
      setSelectedBlogs(selectedBlogs.filter(bId => bId !== id));
    } else {
      setSelectedBlogs([...selectedBlogs, id]);
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Blogs - Llamacorp Admin</title>
      </Helmet>

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111]">Blog Posts</h1>
          <p className="text-[#555] mt-1">Manage, edit, and publish your articles.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/blogs/create" className="bg-[#111] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#333] transition-colors shadow-lg shadow-black/10">
            <Plus size={18} />
            <span>Create Post</span>
          </Link>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all text-sm"
              />
            </div>
            
            <div className="relative hidden md:block">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-black/10 rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all text-sm font-medium text-[#555] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Drafts</option>
                <option value="Scheduled">Scheduled</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          
          {selectedBlogs.length > 0 && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
              <span className="text-sm font-medium text-[#555]">{selectedBlogs.length} selected</span>
              <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                Delete
              </button>
              <button className="px-3 py-1.5 bg-gray-100 text-[#555] rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Bulk Edit
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-black/5 text-[#777] text-xs uppercase tracking-wider bg-gray-50/50">
                <th className="p-4 w-12 text-center">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-[#111]">
                    {selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0 ? (
                      <CheckSquare size={18} className="text-blue-600" />
                    ) : (
                      <Square size={18} />
                    )}
                  </button>
                </th>
                <th className="p-4 font-medium">Post Details</th>
                <th className="p-4 font-medium">Author</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Stats</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-[#777]">
                    Loading blogs...
                  </td>
                </tr>
              ) : filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
                <tr key={blog._id} className={`hover:bg-black/[0.02] transition-colors group ${selectedBlogs.includes(blog._id) ? 'bg-blue-50/30' : ''}`}>
                  <td className="p-4 text-center">
                    <button onClick={() => toggleSelect(blog._id)} className="text-gray-400 hover:text-[#111]">
                      {selectedBlogs.includes(blog._id) ? (
                        <CheckSquare size={18} className="text-blue-600" />
                      ) : (
                        <Square size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-gray-100 relative">
                        <img src={blog.coverImage || 'https://via.placeholder.com/150'} alt={blog.title} className="w-full h-full object-cover" />
                        {blog.featured && (
                          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-blue-500 border border-white"></div>
                        )}
                      </div>
                      <div>
                        <Link to={`/admin/blogs/edit/${blog._id}`} className="font-semibold text-[15px] text-[#111] hover:text-blue-600 transition-colors line-clamp-1">
                          {blog.title}
                        </Link>
                        <div className="text-xs text-[#777] mt-1 flex items-center gap-2">
                          <span className="font-medium bg-gray-100 px-2 py-0.5 rounded text-gray-600">{blog.category?.name || 'Uncategorized'}</span>
                          <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img src={blog.author?.avatar || 'https://via.placeholder.com/150'} alt={blog.author?.name} className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-medium text-[#555]">{blog.author?.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      blog.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      blog.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-[#555]">
                      <div className="font-medium text-[#111]">{blog.views || 0} <span className="text-xs text-[#777] font-normal">views</span></div>
                      <div className="text-xs text-[#777] mt-0.5">5 min read</div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="p-2 text-[#777] hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Live">
                        <Eye size={16} />
                      </a>
                      <Link to={`/admin/blogs/edit/${blog._id}`} className="p-2 text-[#777] hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => deleteBlog(blog._id)} className="p-2 text-[#777] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-[#777]">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={32} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-[#111] mb-1">No articles found</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
                      <button 
                        onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                        className="mt-4 text-blue-600 text-sm font-medium hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-black/5 flex items-center justify-between text-sm text-[#777] bg-gray-50/30">
          <div>Showing {filteredBlogs.length} of {blogs.length} results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-white border border-black/10 hover:bg-black/5 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded bg-[#111] text-white">1</button>
            <button className="px-3 py-1 rounded bg-white border border-black/10 hover:bg-black/5">2</button>
            <button className="px-3 py-1 rounded bg-white border border-black/10 hover:bg-black/5">Next</button>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
