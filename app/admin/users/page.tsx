'use client';

import React, { useState, useEffect } from 'react';
import { getAdminUsers, deleteAdminUser, updateAdminUser, createAdminUser } from '@/lib/admin/users';
import { Search, Plus, User as UserIcon, Shield, Edit2, Trash2, Mail, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Author' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getAdminUsers();
    if (res.data) setUsers(res.data);
    setLoading(false);
  };

  const handleOpenModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '', role: 'Author' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let res;
    if (editingUser) {
      const dataToSubmit: any = { ...formData };
      if (!dataToSubmit.password) delete dataToSubmit.password;
      res = await updateAdminUser(editingUser._id, dataToSubmit);
    } else {
      res = await createAdminUser(formData);
    }

    if (res.success) {
      setIsModalOpen(false);
      fetchUsers();
    } else {
      alert(res.error);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      const res = await deleteAdminUser(id);
      if (res.success) {
        setUsers(users.filter(u => u._id !== id));
      } else {
        alert(res.error);
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] -m-8 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0a0a0a]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Users</h1>
          <p className="text-sm text-white/40 mt-1">Manage team members and their roles</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> New User
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-black p-8">
        
        {/* Controls */}
        <div className="mb-6 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-[#111] py-2 pl-9 pr-4 text-sm text-white placeholder-white/40 focus:border-white/30 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="border border-white/10 rounded-xl bg-[#111] overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="animate-spin text-white/40" size={32} />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-white/40">No users found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-4 text-xs font-semibold text-white/60 uppercase tracking-wider">User</th>
                    <th className="p-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Role</th>
                    <th className="p-4 text-xs font-semibold text-white/60 uppercase tracking-wider">Joined</th>
                    <th className="p-4 text-xs font-semibold text-white/60 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-black border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center text-white/40">
                            {user.avatar && user.avatar !== 'no-photo.jpg' ? (
                              <Image src={user.avatar} alt={user.name} width={40} height={40} className="object-cover" />
                            ) : (
                              <UserIcon size={20} />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-white/50 flex items-center gap-1 mt-0.5">
                              <Mail size={12} /> {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 
                          user.role === 'Editor' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                          'bg-white/10 text-white/70 border border-white/10'
                        }`}>
                          {user.role === 'Admin' && <Shield size={12} />}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-white/60">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenModal(user)}
                            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(user._id, user.name)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#111] border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Password {editingUser && <span className="text-white/40 text-xs">(leave blank to keep current)</span>}
                </label>
                <input 
                  type="password" 
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="Author">Author</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
                <p className="text-xs text-white/40 mt-1">Admins have full access. Editors can publish. Authors can draft.</p>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-white/10 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-white hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex justify-center items-center"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
