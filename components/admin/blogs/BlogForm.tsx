'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createAdminBlog, updateAdminBlog } from '@/lib/admin/blogs';
import { Image as ImageIcon, Save, ArrowLeft, Upload, X, Eye, Edit2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TiptapEditor from '../editor/TiptapEditor';

export default function BlogForm({ 
  initialData, 
  categories 
}: { 
  initialData?: any,
  categories: any[]
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [slugEdited, setSlugEdited] = useState(!!initialData?.slug);
  const [content, setContent] = useState(initialData?.content || '');
  const [previewMode, setPreviewMode] = useState(false);
  
  // Track content changes for auto-save
  const contentRef = useRef(content);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.coverImage && initialData.coverImage !== 'no-photo.jpg' ? initialData.coverImage : null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from title if not manually edited
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, slugEdited]);

  // Handle auto-save
  useEffect(() => {
    if (contentRef.current === content) return;
    contentRef.current = content;

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(async () => {
      // Don't auto-save if we don't even have a title or we're currently submitting
      if (!title || isSubmitting) return;
      
      setIsAutoSaving(true);
      
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('content', content);
        formData.append('status', 'draft'); // Auto-saves are always drafts
        
        // Grab values from other inputs if possible, or just save partial
        const form = document.getElementById('blog-form') as HTMLFormElement;
        if (form) {
           const category = (form.elements.namedItem('category') as HTMLSelectElement)?.value;
           if (category) formData.append('category', category);
        }

        if (initialData?._id) {
          await updateAdminBlog(initialData._id, formData);
        } else {
          // Note: Creating a new blog on auto-save might be tricky because we won't have the ID 
          // to update next time without a page reload or state update.
          // For safety, we only auto-save if it's already an existing blog (Edit mode).
          // If you want to support auto-save on Create, you'd need to redirect to the Edit route upon first save.
        }
        
        setLastSaved(new Date());
      } catch (err) {
        console.error('Autosave failed', err);
      } finally {
        setIsAutoSaving(false);
      }
    }, 3000);

    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [content, title, slug, initialData, isSubmitting]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Explicitly add slug if disabled/not in FormData
    if (!formData.get('slug')) {
        formData.append('slug', slug);
    }
    
    // Explicitly add tiptap content
    formData.append('content', content);

    // Handle empty image removal on update
    if (initialData && !imagePreview && !formData.get('coverImage')) {
       // Backend logic might need explicit instruction, but for now we'll just not send a file
    }

    const result = initialData 
      ? await updateAdminBlog(initialData._id, formData)
      : await createAdminBlog(formData);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push('/admin/blogs');
    }
  }

  return (
    <form id="blog-form" onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {initialData ? 'Edit Blog' : 'Create Blog'}
            </h1>
            <div className="text-xs text-white/40 mt-1 h-4">
              {isAutoSaving ? 'Saving...' : lastSaved ? `Last saved at ${lastSaved.toLocaleTimeString()}` : ''}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white/80 hover:bg-white/5 rounded-md transition-colors"
          >
            {previewMode ? <><Edit2 className="h-4 w-4" /> Edit Mode</> : <><Eye className="h-4 w-4" /> Preview</>}
          </button>
          
          <Link
            href="/admin/blogs"
            className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-md bg-white py-2 px-4 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 p-4 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-6">
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-lg font-medium"
                placeholder="Enter blog title"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-white/80 mb-2">
                Slug <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center bg-black/50 border border-white/10 rounded-md focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/30">
                <span className="pl-3 text-white/40 text-sm select-none">llamacorp.in/blog/</span>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugEdited(true);
                  }}
                  className="w-full bg-transparent py-2.5 px-2 text-white focus:outline-none text-sm"
                  placeholder="blog-post-url"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-white/80 mb-2">
                Short Description / Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                defaultValue={initialData?.excerpt}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
                placeholder="A brief summary of the article..."
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2 flex items-center justify-between">
                <span>Content <span className="text-red-400">*</span></span>
              </label>
              
              {previewMode ? (
                <div className="prose prose-invert prose-blue max-w-none min-h-[400px] p-6 rounded-xl border border-white/10 bg-black/50"
                     dangerouslySetInnerHTML={{ __html: content }} 
                />
              ) : (
                <TiptapEditor 
                  content={content} 
                  onChange={setContent}
                />
              )}
            </div>

          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-6">
          
          {/* Status & Publish */}
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-4">
            <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3">Publishing</h3>
            
            <div>
              <label htmlFor="status" className="block text-xs font-medium text-white/60 mb-2">Status</label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status || 'draft'}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-white/60 mb-2">Category <span className="text-red-400">*</span></label>
              <select
                id="category"
                name="category"
                required
                defaultValue={initialData?.category?._id || initialData?.category}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-4">
            <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3">Featured Image</h3>
            
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black group">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-500"
                    >
                      <X className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full aspect-video rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 hover:bg-white/5 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6 text-white/40 mb-2" />
                  <span className="text-xs text-white/60 font-medium">Click to upload image</span>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* SEO Meta */}
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-4">
            <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3">SEO Metadata</h3>
            
            <div>
              <label htmlFor="metaTitle" className="block text-xs font-medium text-white/60 mb-2">Meta Title</label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                defaultValue={initialData?.metaTitle}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-sm text-white focus:border-white/30 focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="metaDescription" className="block text-xs font-medium text-white/60 mb-2">Meta Description</label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={3}
                defaultValue={initialData?.metaDescription}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-sm text-white focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
          
        </div>
      </div>
    </form>
  );
}
