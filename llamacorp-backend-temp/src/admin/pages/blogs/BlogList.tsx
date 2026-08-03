import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
  views: number;
  featured: boolean;
  author: {
    name: string;
  };
  coverImage?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs`);
      setBlogs(res.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Blogs</h2>
        <Link
          to="/admin/blogs/new"
          className="liquid-glass-strong rounded-full text-white px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2"
        >
          <Plus size={16} />
          New Blog Post
        </Link>
      </div>

      <div className="liquid-glass rounded-[1.25rem] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-transparent">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {['all', 'published', 'draft', 'scheduled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === status ? 'liquid-glass-strong text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full liquid-glass rounded-full text-white pl-9 pr-3 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-black/40 border-b border-white/10 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider w-16">Thumbnail</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Post Title</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Category</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Author</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Status</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider text-center">Views</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Read Time</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider">Date</th>
                <th scope="col" className="px-6 py-5 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-transparent">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">Loading blogs...</td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">No blogs found. Create your first post!</td>
                </tr>
              ) : (
                blogs
                  .filter(b => filter === 'all' || b.status === filter)
                  .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
                  .map((blog) => (
                  <tr key={blog._id} className="hover:bg-white/5 transition-colors duration-300">
                    <td className="px-6 py-5">
                      {blog.coverImage ? (
                        <img src={blog.coverImage} alt={blog.title} className="w-10 h-10 object-cover rounded-lg" />
                      ) : (
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-500 text-xs">No img</div>
                      )}
                    </td>
                    <td className="px-6 py-5 font-medium text-white drop-shadow-sm">
                      <div className="flex flex-col gap-1">
                        <span>{blog.title}</span>
                        {blog.featured && <span className="w-max bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30">Featured</span>}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {blog.category && <span className="bg-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded-full border border-white/20">{blog.category}</span>}
                    </td>
                    <td className="px-6 py-5">{blog.author?.name || 'Unknown'}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                        blog.status === 'published' ? 'bg-white/20 text-white border border-white/30' : 
                        blog.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 
                        'bg-white/10 text-gray-300 border border-white/20'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">{blog.views || 0}</td>
                    <td className="px-6 py-5">{blog.readTime || '-'}</td>
                    <td className="px-6 py-5">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="p-2 liquid-glass rounded-full text-white text-gray-400 hover:text-white transition-all rounded-xl"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="p-2 liquid-glass rounded-full text-white hover:bg-white/10 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
