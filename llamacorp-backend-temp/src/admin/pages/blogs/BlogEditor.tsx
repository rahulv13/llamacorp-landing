import React, { useState, useCallback, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import Dropcursor from '@tiptap/extension-dropcursor';
import { Bold, Italic, Strikethrough, Underline as UnderlineIcon, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code, Image as ImageIcon, Link as LinkIcon, Youtube as YoutubeIcon, Table as TableIcon, Save, ArrowLeft, Loader2, Check } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const MenuBar = ({ editor }: { editor: any }) => {
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      if (input.files && input.files[0]) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', input.files[0]);

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/upload-image`, formData);
          editor.chain().focus().setImage({ src: res.data.url }).run();
        } catch (error) {
          console.error('Error uploading image', error);
          alert('Failed to upload image. You can still paste an external URL.');
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-900 border-b border-gray-800 rounded-t-xl overflow-hidden sticky top-0 z-10">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Strikethrough size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('underline') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <UnderlineIcon size={18} />
      </button>

      <div className="w-px h-6 bg-gray-700 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Heading3 size={18} />
      </button>

      <div className="w-px h-6 bg-gray-700 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <ListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-gray-700 mx-2"></div>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Quote size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('codeBlock') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <Code size={18} />
      </button>

      <div className="w-px h-6 bg-gray-700 mx-2"></div>

      <button onClick={addImage} disabled={isUploading} className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-50 flex items-center gap-1">
        {isUploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
      </button>
      
      <button
        onClick={() => {
          const url = window.prompt('URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
      >
        <LinkIcon size={18} />
      </button>

      <button
        onClick={() => {
          const url = window.prompt('YouTube URL');
          if (url) editor.commands.setYoutubeVideo({ src: url });
        }}
        className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <YoutubeIcon size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <TableIcon size={18} />
      </button>
    </div>
  );
};

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  const [category, setCategory] = useState('Uncategorized');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState<any[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutosaving, setIsAutosaving] = useState(false);

  // New CMS Fields
  const [excerpt, setExcerpt] = useState('');
  const [readTime, setReadTime] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState(0);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  
  // UI State
  const [activeTab, setActiveTab] = useState('basic'); // basic, seo, settings

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      LinkExtension.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ inline: false }),
      Dropcursor
    ],
    content: '<p>Start writing your amazing blog post here...</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-blue max-w-none focus:outline-none min-h-[400px] p-6 text-gray-300',
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch authors first
        const authorsRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/authors`);
        setAuthors(authorsRes.data);
        if (authorsRes.data.length > 0 && !isEditing) {
          setAuthorId(authorsRes.data[0]._id);
        }

        if (isEditing) {
          const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/${id}`);
          setTitle(res.data.title);
          setSlug(res.data.slug);
          setStatus(res.data.status);
          setCategory(res.data.category || 'Uncategorized');
          // Support both populated object and raw ID string
          setAuthorId(res.data.author?._id || res.data.author || '');
          if (res.data.coverImage) setCoverImagePreview(res.data.coverImage);
          
          // Populate new CMS fields
          setExcerpt(res.data.excerpt || '');
          setReadTime(res.data.readTime || '');
          setTags(res.data.tags ? res.data.tags.join(', ') : '');
          setFeatured(res.data.featured || false);
          setFeaturedOrder(res.data.featuredOrder || 0);
          setMetaTitle(res.data.metaTitle || '');
          setMetaDescription(res.data.metaDescription || '');
          setMetaKeywords(res.data.metaKeywords || '');
          setCanonicalUrl(res.data.canonicalUrl || '');

          if (editor) {
             editor.commands.setContent(res.data.content);
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id, isEditing, editor]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!title) {
        alert('Title is required');
        return;
    }
    if (!authorId) {
        alert('Please select an author. If none exist, create one first in the Authors tab.');
        return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('status', status);
      formData.append('category', category);
      formData.append('author', authorId);
      formData.append('content', editor?.getHTML() || '');
      formData.append('excerpt', excerpt);
      formData.append('readTime', readTime);
      formData.append('tags', tags);
      formData.append('featured', String(featured));
      formData.append('featuredOrder', String(featuredOrder));
      formData.append('metaTitle', metaTitle);
      formData.append('metaDescription', metaDescription);
      formData.append('metaKeywords', metaKeywords);
      formData.append('canonicalUrl', canonicalUrl);

      if (coverImage) {
        formData.append('coverImage', coverImage);
      }

      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/${id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs`, formData);
      }

      setLastSaved(new Date());
      navigate('/admin/blogs');
    } catch (error: any) {
      console.error('Error saving blog:', error);
      alert(error.response?.data?.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  // Autosave Draft
  useEffect(() => {
    if (!title || !authorId || !editor || !isEditing) return;

    const timer = setTimeout(async () => {
      setIsAutosaving(true);
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('status', status);
        formData.append('category', category);
        formData.append('author', authorId);
        formData.append('content', editor.getHTML());
        
        // Background silent save
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/${id}`, formData);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Autosave failed', error);
      } finally {
        setIsAutosaving(false);
      }
    }, 10000); // Autosave every 10 seconds after typing stops

    return () => clearTimeout(timer);
  }, [title, editor?.getHTML(), isEditing]); // Removed other dependencies to avoid too frequent saves

  if (fetching) return <div className="text-gray-400 p-8 flex items-center justify-center"><Loader2 className="animate-spin mr-2"/> Loading editor...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <Link to="/admin/blogs" className="p-2.5 liquid-glass rounded-full text-white text-gray-400 hover:text-white rounded-xl">
                <ArrowLeft size={20} />
            </Link>
            <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm flex items-center gap-3">
              {isEditing ? 'Edit Post' : 'New Post'}
              {lastSaved && <span className="text-xs font-normal text-gray-500 flex items-center gap-1"><Check size={12}/> Saved {lastSaved.toLocaleTimeString()}</span>}
              {isAutosaving && <span className="text-xs font-normal text-gray-500 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Saving...</span>}
            </h2>
        </div>
        <div className="flex gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="liquid-glass rounded-full text-white text-white text-sm rounded-xl block p-2.5 transition-all [&>option]:bg-gray-900"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            onClick={handleSave}
            disabled={loading}
            className="liquid-glass-strong rounded-full text-white px-4 py-2 h-10 rounded-xl text-sm font-medium text-white flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
              <div className="liquid-glass rounded-[1.25rem] flex flex-col h-[calc(100vh-250px)] overflow-hidden">
                  <div className="bg-black/20 border-b border-white/10 z-10 backdrop-blur-md">
                    <MenuBar editor={editor} />
                  </div>
                  <div className="flex-1 overflow-y-auto bg-transparent">
                     <EditorContent editor={editor} className="h-full" />
                  </div>
              </div>
          </div>

          <div className="space-y-6">
              <div className="liquid-glass rounded-[1.25rem] p-5 space-y-4">
                  <div className="flex gap-2 border-b border-white/10 pb-2 mb-4">
                    <button onClick={() => setActiveTab('basic')} className={`text-sm pb-2 border-b-2 transition-colors ${activeTab === 'basic' ? 'border-white text-white font-medium' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>Basic</button>
                    <button onClick={() => setActiveTab('seo')} className={`text-sm pb-2 border-b-2 transition-colors ${activeTab === 'seo' ? 'border-white text-white font-medium' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>SEO</button>
                    <button onClick={() => setActiveTab('settings')} className={`text-sm pb-2 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-white text-white font-medium' : 'border-transparent text-gray-400 hover:text-gray-300'}`}>Settings</button>
                  </div>

                  {activeTab === 'basic' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Future of AI" className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Excerpt</label>
                        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Short description..." className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10 resize-none" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all [&>option]:bg-gray-900 bg-white/5 border border-white/10">
                            <option value="AI & Technology">AI & Technology</option>
                            <option value="Marketing">Marketing</option>
                            <option value="SEO">SEO</option>
                            <option value="Business Growth">Business Growth</option>
                            <option value="Design">Design</option>
                            <option value="Uncategorized">Uncategorized</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Author</label>
                        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all [&>option]:bg-gray-900 bg-white/5 border border-white/10">
                            {authors.length === 0 && <option value="">No authors found</option>}
                            {authors.map((a) => (
                              <option key={a._id} value={a._id}>{a.name}</option>
                            ))}
                        </select>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-sm font-medium text-gray-300 block mb-2">Cover Image</label>
                        <div className="flex items-center justify-center w-full">
                            <label className={`flex flex-col items-center justify-center w-full ${coverImagePreview ? 'h-40' : 'h-32'} border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all relative overflow-hidden group`}>
                                {coverImagePreview ? (
                                    <img src={coverImagePreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <ImageIcon className="w-8 h-8 mb-3 text-gray-400 group-hover:text-white transition-colors" />
                                        <p className="mb-2 text-xs text-gray-300"><span className="font-semibold text-white">Click to upload</span></p>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'seo' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex justify-between">
                          <span>Slug</span>
                          <span className="text-xs text-gray-500">Auto-generated if empty</span>
                        </label>
                        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="your-post-slug" className="w-full liquid-glass text-gray-300 font-mono rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Meta Title</label>
                        <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO Title (60 chars max)" className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Meta Description</label>
                        <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} placeholder="SEO Description (160 chars max)" className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10 resize-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Keywords</label>
                        <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="React, Node.js, Tutorial" className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Canonical URL</label>
                        <input type="url" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} placeholder="https://llamacorp.com/blog/..." className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Tags (comma separated)</label>
                        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="technology, marketing, ai" className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Read Time</label>
                        <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g. 5 min" className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all placeholder-gray-500 bg-white/5 border border-white/10" />
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <input type="checkbox" id="featured" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500/50" />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-300 cursor-pointer">Featured Article</label>
                      </div>
                      {featured && (
                        <div className="space-y-2 pt-2 animate-in fade-in">
                          <label className="text-sm font-medium text-gray-300">Featured Order</label>
                          <input type="number" value={featuredOrder} onChange={(e) => setFeaturedOrder(Number(e.target.value))} className="w-full liquid-glass text-white rounded-xl px-4 py-2 text-sm focus:outline-none transition-all bg-white/5 border border-white/10" />
                        </div>
                      )}
                    </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
