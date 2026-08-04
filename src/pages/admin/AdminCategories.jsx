import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Trash2, Edit, Search, Tag } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#000000',
    icon: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/categories`);
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingId(category._id);
      setFormData({
        name: category.name || '',
        description: category.description || '',
        color: category.color || '#000000',
        icon: category.icon || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', color: '#000000', icon: '' });
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
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/categories/${editingId}`, formData, config);
        toast.success('Category updated');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/categories`, formData, config);
        toast.success('Category created');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Category deleted');
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete category');
    }
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <Helmet>
        <title>Categories - Llamacorp Admin</title>
      </Helmet>

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111]">Categories</h1>
          <p className="text-[#555] mt-1">Manage categories for your blog posts.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#111] text-white px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-[#333] transition-colors shadow-lg shadow-black/10"
          >
            <Plus size={18} />
            <span>Add Category</span>
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
                placeholder="Search categories..." 
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
                <th className="p-4 font-medium pl-6">Category Details</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-[#777]">Loading categories...</td>
                </tr>
              ) : filteredCategories.length > 0 ? filteredCategories.map((category) => (
                <tr key={category._id} className="hover:bg-black/[0.02] transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-black/5"
                        style={{ backgroundColor: category.color || '#f3f4f6' }}
                      >
                        <Tag size={18} className="text-white drop-shadow-sm" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#111]">{category.name}</div>
                        <div className="text-xs text-[#777]">Slug: {category.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[#555] max-w-md truncate">
                    {category.description || 'No description'}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(category)}
                        className="p-2 text-[#777] hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" 
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(category._id)}
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
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#111]">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
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
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Color</label>
                <div className="flex gap-3 items-center">
                  <input 
                    type="color" 
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                    className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="text-sm font-mono text-[#555]">{formData.color}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
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
                  {editingId ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
