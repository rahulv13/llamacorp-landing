import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: ''
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/authors`);
      setAuthors(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch authors');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (author = null) => {
    if (author) {
      setEditingId(author._id);
      setFormData({
        name: author.name || '',
        email: author.email || '',
        bio: author.bio || '',
        avatar: author.avatar || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', email: '', bio: '', avatar: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Name is required');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/authors/${editingId}`, formData, config);
        toast.success('Author updated');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/authors`, formData, config);
        toast.success('Author created');
      }
      setIsModalOpen(false);
      fetchAuthors();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this author?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/authors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Author deleted');
      fetchAuthors();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete author');
    }
  };

  const filteredAuthors = authors.filter(author => 
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <Helmet>
        <title>Authors - Llamacorp Admin</title>
      </Helmet>

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111]">Authors</h1>
          <p className="text-[#555] mt-1">Manage author profiles for your blog.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#111] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#333] transition-colors shadow-lg shadow-black/10"
          >
            <Plus size={18} />
            <span>Add Author</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 md:p-6 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search authors..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/20 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-black/5 text-[#777] text-xs uppercase tracking-wider bg-gray-50/50">
                <th className="p-4 font-medium pl-6">Author Details</th>
                <th className="p-4 font-medium">Bio</th>
                <th className="p-4 font-medium text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-[#777]">Loading authors...</td>
                </tr>
              ) : filteredAuthors.length > 0 ? filteredAuthors.map((author) => (
                <tr key={author._id} className="hover:bg-black/[0.02] transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-black/5 bg-gray-100">
                        <img src={author.avatar || 'https://via.placeholder.com/150'} alt={author.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#111]">{author.name}</div>
                        <div className="text-xs text-[#777]">{author.email || 'No email provided'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[#555] max-w-md truncate">
                    {author.bio || 'No bio provided'}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(author)}
                        className="p-2 text-[#777] hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(author._id)}
                        className="p-2 text-[#777] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-[#777]">
                    No authors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Author Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#111]">{editingId ? 'Edit Author' : 'Add New Author'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#111]">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Name *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Avatar URL</label>
                <input 
                  type="text" 
                  value={formData.avatar}
                  onChange={e => setFormData({...formData, avatar: e.target.value})}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none h-24"
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-black/5">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[#555] hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#111] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Create Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
