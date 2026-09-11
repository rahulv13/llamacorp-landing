'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import CategoryModal from './CategoryModal';
import { deleteAdminCategory } from '@/lib/admin/categories';

export default function CategoryClient({ categories }: { categories: any[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"?`)) return;
    setIsDeleting(id);
    const res = await deleteAdminCategory(id);
    if (!res.error) {
      router.refresh();
    } else {
      alert(res.error);
    }
    setIsDeleting(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 rounded-md bg-white py-2 px-4 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Category
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="bg-white/5">
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Color</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Name</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Slug</th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold text-white/60">Description</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[#111]">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-white/40">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-white/5 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div 
                        className="w-6 h-6 rounded-md border border-white/20" 
                        style={{ backgroundColor: category.color || '#000000' }}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-white">{category.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-white/60">{category.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white/60 max-w-xs truncate">{category.description || '-'}</div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-white/60 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id, category.name)}
                          disabled={isDeleting === category._id}
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

      {isModalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
