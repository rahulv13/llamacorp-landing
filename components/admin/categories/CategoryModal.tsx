'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Save } from 'lucide-react';
import { createAdminCategory, updateAdminCategory } from '@/lib/admin/categories';

export default function CategoryModal({ 
  category, 
  onClose 
}: { 
  category?: any | null,
  onClose: () => void 
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(category?.name || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [description, setDescription] = useState(category?.description || '');
  const [color, setColor] = useState(category?.color || '#000000');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const data: any = { name, description, color };
    if (slug) data.slug = slug;

    const res = category
      ? await updateAdminCategory(category._id, data)
      : await createAdminCategory(data);

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
    } else {
      router.refresh();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {category ? 'Edit Category' : 'New Category'}
          </h3>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              placeholder="e.g. Technology"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              placeholder="Auto-generated if left blank"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
              placeholder="Short description (max 200 chars)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Color Code
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-14 rounded-md border border-white/10 bg-black/50 p-1 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm font-mono uppercase"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-md bg-white py-2 px-6 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
