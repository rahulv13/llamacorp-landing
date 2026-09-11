'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createAdminBlog, updateAdminBlog } from '@/lib/admin/blogs';
import { Save, ArrowLeft, Upload, X, Eye, Edit2, Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TiptapEditor from '../editor/TiptapEditor';
import SeoPanel from '../seo/SeoPanel';
import SearchPreview from '../seo/SearchPreview';
import TagManager from '../seo/TagManager';
import PublishScheduler from '../seo/PublishScheduler';
import RevisionHistory from '../seo/RevisionHistory';
import PublishChecklist from '../seo/PublishChecklist';
import MediaPicker from '../media/MediaPicker';

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
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  
  // Tabs
  const [activeTab, setActiveTab] = useState<'editor' | 'seo' | 'preview'>('editor');

  // Core Fields
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [slugEdited, setSlugEdited] = useState(!!initialData?.slug);
  const [content, setContent] = useState(initialData?.content || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  
  // Organization
  const [status, setStatus] = useState(initialData?.status || 'draft');
  const [category, setCategory] = useState(initialData?.category?._id || initialData?.category || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [publishedDate, setPublishedDate] = useState(initialData?.publishedDate || '');
  const [featured, setFeatured] = useState(initialData?.featured || false);
  
  // SEO
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || '');
  const [metaKeywords, setMetaKeywords] = useState(initialData?.metaKeywords || '');
  
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
      if (!title || isSubmitting) return;
      setIsAutoSaving(true);
      
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('content', content);
        formData.append('excerpt', excerpt);
        formData.append('status', 'draft'); 
        if (category) formData.append('category', category);
        
        formData.append('tags', JSON.stringify(tags));
        formData.append('metaTitle', metaTitle);
        formData.append('metaDescription', metaDescription);
        formData.append('metaKeywords', metaKeywords);
        formData.append('canonicalUrl', canonicalUrl);
        formData.append('featured', String(featured));

      if (initialData?._id) {
          const dataObj = Object.fromEntries(formData.entries());
          if (dataObj.tags && typeof dataObj.tags === 'string') {
            dataObj.tags = JSON.parse(dataObj.tags);
          }
          await updateAdminBlog(initialData._id, dataObj);
          setLastSaved(new Date());
        }
      } catch (err) {
        console.error('Autosave failed', err);
      } finally {
        setIsAutoSaving(false);
      }
    }, 3000);

    return () => {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
    };
  }, [content, title, slug, excerpt, category, tags, metaTitle, metaDescription, metaKeywords, canonicalUrl, featured, initialData, isSubmitting]);

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

  const handleDuplicate = async () => {
    if (!initialData) return;
    setIsSubmitting(true);
    try {
      const dataObj: any = {
        title: `Copy of ${title}`,
        slug: `copy-of-${slug}-${Date.now()}`,
        content,
        excerpt,
        status: 'draft',
        tags,
        metaTitle,
        metaDescription
      };
      if (category) dataObj.category = category;
      
      const res = await createAdminBlog(dataObj);
      if (!res.error) {
        router.push('/admin/blogs');
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError('Failed to duplicate article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Explicitly append fields not natively captured by standard form inputs
    formData.set('title', title);
    formData.set('slug', slug);
    formData.set('content', content);
    formData.set('excerpt', excerpt);
    formData.set('status', status);
    formData.set('category', category);
    formData.set('tags', JSON.stringify(tags));
    formData.set('publishedDate', publishedDate);
    formData.set('featured', String(featured));
    formData.set('metaTitle', metaTitle);
    formData.set('metaDescription', metaDescription);
    formData.set('metaKeywords', metaKeywords);
    formData.set('canonicalUrl', canonicalUrl);

    if (initialData && !imagePreview && !formData.get('coverImage')) {
      // Empty image handling
    }

    const dataObj = Object.fromEntries(formData.entries());
    if (dataObj.tags && typeof dataObj.tags === 'string') {
      try { dataObj.tags = JSON.parse(dataObj.tags); } catch(e){}
    }
    if (dataObj.featured === 'true') dataObj.featured = true;
    if (dataObj.featured === 'false') dataObj.featured = false;

    const result = initialData 
      ? await updateAdminBlog(initialData._id, dataObj)
      : await createAdminBlog(dataObj);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      router.push('/admin/blogs');
    }
  }

  return (
    <form id="blog-form" onSubmit={handleSubmit} className="space-y-8 max-w-[1400px]">
      {/* Header Actions */}
      <div className="flex items-center justify-between sticky top-0 z-50 bg-[#0a0a0a] py-4 border-b border-white/10 -mt-8 pt-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              {initialData ? 'Edit Blog' : 'Create Blog'}
              {initialData && (
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                  status === 'published' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                  status === 'scheduled' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                  'bg-white/10 text-white/60 border border-white/20'
                }`}>
                  {status}
                </span>
              )}
            </h1>
            <div className="text-xs text-white/40 mt-1 h-4">
              {isAutoSaving ? 'Saving draft...' : lastSaved ? `Draft saved at ${lastSaved.toLocaleTimeString()}` : ''}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {initialData && (
            <button
              type="button"
              onClick={handleDuplicate}
              className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              <Copy className="h-4 w-4" /> Duplicate
            </button>
          )}
          
          <Link
            href="/admin/blogs"
            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-md bg-white py-2 px-6 text-sm font-semibold text-black hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Saving...' : status === 'published' ? 'Publish Now' : status === 'scheduled' ? 'Schedule' : 'Save Draft'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 p-4 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          
          {/* Main Tabs */}
          <div className="flex items-center gap-6 border-b border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'editor' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
            >
              Content Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'seo' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
            >
              SEO & Social
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'preview' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
            >
              Live Preview
            </button>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[600px]">
            {activeTab === 'editor' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-black/50 py-3 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-xl font-semibold"
                    placeholder="Enter an engaging title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-white/80 mb-2">
                    URL Slug <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center bg-black/50 border border-white/10 rounded-md focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/30">
                    <span className="pl-4 pr-1 text-white/40 text-sm select-none border-r border-white/10 py-2.5">llamacorp.in/blog/</span>
                    <input
                      type="text"
                      id="slug"
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setSlugEdited(true);
                      }}
                      className="w-full bg-transparent py-2.5 px-3 text-white focus:outline-none text-sm font-mono"
                      placeholder="blog-post-url"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-white/80 mb-2">
                    Excerpt
                    <span className="text-xs text-white/40 ml-2 font-normal">
                      ({excerpt.length}/500)
                    </span>
                  </label>
                  <textarea
                    id="excerpt"
                    rows={2}
                    value={excerpt}
                    maxLength={500}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-4 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
                    placeholder="A brief summary for the blog listing page..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Content <span className="text-red-400">*</span>
                  </label>
                  <TiptapEditor content={content} onChange={setContent} />
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-8">
                <SeoPanel
                  metaTitle={metaTitle} setMetaTitle={setMetaTitle}
                  metaDescription={metaDescription} setMetaDescription={setMetaDescription}
                  canonicalUrl={canonicalUrl} setCanonicalUrl={setCanonicalUrl}
                  metaKeywords={metaKeywords} setMetaKeywords={setMetaKeywords}
                />
                
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-lg font-semibold text-white mb-6">Search & Social Previews</h3>
                  <SearchPreview 
                    title={title} 
                    metaTitle={metaTitle} 
                    metaDescription={metaDescription} 
                    slug={slug} 
                    coverImage={imagePreview} 
                    ogImage={imagePreview} 
                  />
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="prose prose-invert prose-blue max-w-[800px] mx-auto bg-black p-8 rounded-xl border border-white/10">
                <h1 className="mb-2">{title || 'Untitled Blog Post'}</h1>
                <div className="text-white/50 text-sm mb-8 pb-8 border-b border-white/10 flex items-center gap-4">
                  <span>Category: {categories.find(c => c._id === category)?.name || 'Uncategorized'}</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                {imagePreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Featured" className="w-full rounded-xl mb-8 object-cover aspect-video border border-white/10" />
                )}
                <div dangerouslySetInnerHTML={{ __html: content || '<p>No content yet...</p>' }} />
              </div>
            )}
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <PublishScheduler 
              status={status} 
              publishedDate={publishedDate} 
              setPublishedDate={setPublishedDate} 
            />

            <div className="pt-2 flex items-center gap-2">
              <input 
                type="checkbox" 
                id="featured" 
                checked={featured} 
                onChange={(e) => setFeatured(e.target.checked)} 
                className="rounded border-white/10 bg-black text-blue-500 focus:ring-blue-500/50"
              />
              <label htmlFor="featured" className="text-xs text-white/80 cursor-pointer">Mark as Featured Article</label>
            </div>
          </div>

          {/* Checklist */}
          <PublishChecklist 
            title={title} 
            metaTitle={metaTitle} 
            metaDescription={metaDescription} 
            content={content} 
            coverImage={imagePreview} 
            category={category} 
          />

          {/* Organization */}
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-5">
            <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3">Organization</h3>
            
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-white/60 mb-2">Category <span className="text-red-400">*</span></label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-sm text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Tags</label>
              <TagManager tags={tags} setTags={setTags} />
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-4">
            <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3">Featured Image</h3>
            
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black group">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowMediaPicker(true)}
                      className="flex items-center gap-2 bg-blue-500/90 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full aspect-video rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 hover:bg-white/5 transition-colors"
                  onClick={() => setShowMediaPicker(true)}
                >
                  <Upload className="h-6 w-6 text-white/40 mb-2" />
                  <span className="text-xs text-white/60 font-medium">Click to select image</span>
                </div>
              )}
              
              <input type="hidden" name="coverImage" value={imagePreview || ''} />
            </div>
          </div>

          {/* Revision History */}
          <RevisionHistory 
            createdAt={initialData?.createdAt} 
            updatedAt={initialData?.updatedAt} 
            authorName={initialData?.author?.name} 
          />
          
        </div>
      </div>
      
      {showMediaPicker && (
        <MediaPicker 
          title="Select Featured Image"
          onClose={() => setShowMediaPicker(false)}
          onSelect={(item) => {
            setImagePreview(item.secureUrl);
            setShowMediaPicker(false);
          }}
        />
      )}
    </form>
  );
}
