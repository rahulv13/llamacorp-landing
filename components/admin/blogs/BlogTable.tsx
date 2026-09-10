'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit, Image as ImageIcon, Trash2, Send, Archive } from 'lucide-react';
import StatusBadge from './StatusBadge';
import DeleteDialog from './DeleteDialog';
import Image from 'next/image';
import { bulkUpdateBlogStatus, bulkDeleteBlogs } from '@/lib/admin/blogs';

export default function BlogTable({ blogs }: { blogs: any[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredBlogs.map(b => b._id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkStatus = async (status: string) => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to mark ${selectedIds.size} blogs as ${status}?`)) return;
    
    setIsProcessing(true);
    await bulkUpdateBlogStatus(Array.from(selectedIds), status);
    setSelectedIds(new Set());
    setIsProcessing(false);
    router.refresh();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Are you sure you want to PERMANENTLY DELETE ${selectedIds.size} blogs?`)) return;
    
    setIsProcessing(true);
    await bulkDeleteBlogs(Array.from(selectedIds));
    setSelectedIds(new Set());
    setIsProcessing(false);
    router.refresh();
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Sticky Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] border border-blue-500/30 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-8">
          <div className="text-sm font-medium text-white">
            <span className="text-blue-400">{selectedIds.size}</span> selected
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatus('published')}
              disabled={isProcessing}
              className="px-3 py-1.5 flex items-center gap-2 rounded-md hover:bg-white/10 text-sm font-medium text-white/80 transition-colors"
            >
              <Send size={14} /> Publish
            </button>
            <button
              onClick={() => handleBulkStatus('draft')}
              disabled={isProcessing}
              className="px-3 py-1.5 flex items-center gap-2 rounded-md hover:bg-white/10 text-sm font-medium text-white/80 transition-colors"
            >
              <Edit size={14} /> Draft
            </button>
            <button
              onClick={() => handleBulkStatus('archived')}
              disabled={isProcessing}
              className="px-3 py-1.5 flex items-center gap-2 rounded-md hover:bg-white/10 text-sm font-medium text-white/80 transition-colors"
            >
              <Archive size={14} /> Archive
            </button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <button
              onClick={handleBulkDelete}
              disabled={isProcessing}
              className="px-3 py-1.5 flex items-center gap-2 rounded-md hover:bg-red-500/20 text-sm font-medium text-red-400 transition-colors"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 rounded-md border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-white/10 bg-black/50 py-2 px-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 rounded-md bg-white py-2 px-4 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Blog
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/5">
                <th scope="col" className="py-3.5 pl-4 sm:pl-6 text-left w-12">
                  <input
                    type="checkbox"
                    checked={filteredBlogs.length > 0 && selectedIds.size === filteredBlogs.length}
                    onChange={handleSelectAll}
                    className="rounded border-white/10 bg-black text-blue-500 focus:ring-blue-500/50"
                  />
                </th>
                <th scope="col" className="py-3.5 pl-2 pr-3 text-left text-xs font-semibold text-white/60">Image</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-white/60">Title</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-white/60">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-white/60">Date</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-xs font-semibold text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#111]">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-white/40">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id} className={`transition-colors ${selectedIds.has(blog._id) ? 'bg-blue-500/5' : 'hover:bg-white/5'}`}>
                    <td className="whitespace-nowrap py-4 pl-4 sm:pl-6 w-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(blog._id)}
                        onChange={() => handleSelectOne(blog._id)}
                        className="rounded border-white/10 bg-black text-blue-500 focus:ring-blue-500/50"
                      />
                    </td>
                    <td className="whitespace-nowrap py-4 pl-2 pr-3">
                      {blog.coverImage && blog.coverImage !== 'no-photo.jpg' ? (
                        <div className="h-10 w-16 relative rounded overflow-hidden border border-white/10">
                          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-16 bg-white/5 rounded border border-white/10 flex items-center justify-center text-white/20">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="text-sm font-medium text-white max-w-[200px] sm:max-w-[300px] truncate flex items-center gap-2">
                        {blog.title}
                        {blog.featured && <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/20">Featured</span>}
                      </div>
                      <div className="text-xs text-white/40 truncate">
                        /{blog.slug}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <StatusBadge status={blog.status} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-white/60">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
                          className="text-white/60 hover:text-white transition-colors p-1"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <DeleteDialog id={blog._id} title={blog.title} />
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
