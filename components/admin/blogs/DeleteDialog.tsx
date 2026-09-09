'use client';

import { useState } from 'react';
import { deleteAdminBlog } from '@/lib/admin/blogs';
import { Trash2, X, AlertTriangle } from 'lucide-react';

export default function DeleteDialog({ 
  id, 
  title, 
  onSuccess 
}: { 
  id: string, 
  title: string,
  onSuccess?: () => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    setIsDeleting(true);
    setError('');
    const result = await deleteAdminBlog(id);
    
    if (result.error) {
      setError(result.error);
      setIsDeleting(false);
    } else {
      setIsOpen(false);
      setIsDeleting(false);
      if (onSuccess) onSuccess();
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-white/60 hover:text-red-400 transition-colors p-1"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white/60 hover:text-red-400 transition-colors p-1"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
          
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <AlertTriangle className="h-6 w-6" />
            <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
          </div>
          
          <p className="text-white/60 text-sm mb-6">
            Are you sure you want to delete <strong className="text-white">"{title}"</strong>? This action cannot be undone.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
              className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-md bg-red-500/90 hover:bg-red-500 text-white transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
            >
              {isDeleting ? 'Deleting...' : 'Delete Blog'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
