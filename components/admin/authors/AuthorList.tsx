'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { deleteAdminAuthor, updateAdminAuthor } from '@/lib/admin/authors';

export default function AuthorList({ authors }: { authors: any[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const filteredAuthors = authors.filter((author) =>
    author.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    setIsProcessing(id);
    await deleteAdminAuthor(id);
    setIsProcessing(null);
    router.refresh();
  };

  const toggleActive = async (author: any) => {
    setIsProcessing(author._id);
    await updateAdminAuthor(author._id, { isActive: !author.isActive });
    setIsProcessing(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>

        <Link
          href="/admin/authors/new"
          className="flex items-center justify-center gap-2 rounded-md bg-white py-2 px-4 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Author
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/5">
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Author</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Status</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Articles</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#111]">
              {filteredAuthors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-sm text-white/40">
                    No authors found.
                  </td>
                </tr>
              ) : (
                filteredAuthors.map((author) => (
                  <tr key={author._id} className="hover:bg-white/5 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={author.avatar || 'https://ui-avatars.com/api/?name=' + author.fullName} 
                          alt={author.fullName} 
                          className="h-10 w-10 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <div className="text-sm font-medium text-white flex items-center gap-2">
                            {author.fullName}
                            {author.featured && <span className="px-1.5 py-0.5 rounded text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/20">Featured</span>}
                          </div>
                          <div className="text-xs text-white/60">{author.jobTitle || 'Contributor'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button 
                        onClick={() => toggleActive(author)}
                        disabled={isProcessing === author._id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors disabled:opacity-50 ${
                          author.isActive 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {author.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {author.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-white/60">
                        {author.blogs?.length || 0} published
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/authors/${author._id}/edit`}
                          className="text-white/60 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(author._id, author.fullName)}
                          disabled={isProcessing === author._id}
                          className="text-white/60 hover:text-red-400 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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
