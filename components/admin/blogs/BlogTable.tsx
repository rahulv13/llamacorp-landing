'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit, Image as ImageIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import DeleteDialog from './DeleteDialog';
import Image from 'next/image';

export default function BlogTable({ blogs }: { blogs: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
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
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-white/60 sm:pl-6">Image</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-white/60">Title</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-white/60">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-white/60">Date</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-xs font-semibold text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#111]">
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-white/40">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-white/5 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
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
                      <div className="text-sm font-medium text-white max-w-[200px] sm:max-w-[300px] truncate">
                        {blog.title}
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
