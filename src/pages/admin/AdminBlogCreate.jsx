import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, Save, Eye, Settings, Image as ImageIcon, 
  AlignLeft, Type, List, Link as LinkIcon, 
  CheckSquare, Video, Code, Table, Grid, Plus
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { marked } from 'marked';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { Table as TableExtension } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import CalloutNode from '../../components/admin/editor-nodes/CalloutNode';
import { useAdmin } from '../../context/AdminContext';
import RichTextEditor from '../../components/admin/RichTextEditor';

// Extensions array for HTML generation
const extensions = [
  StarterKit, LinkExtension, ImageExtension, TableExtension, 
  TableRow, TableCell, TableHeader, TaskList, TaskItem, 
  Underline, TextAlign.configure({ types: ['heading', 'paragraph'] }), Youtube, CalloutNode
];

export default function AdminBlogCreate() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const { adminUser } = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams();

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('tiptap'); // Default to Tiptap
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [versions, setVersions] = useState([]);
  
  // SEO & Stats
  const [seo, setSeo] = useState({
    title: '', description: '', canonical: '', focusKeyword: '', robots: 'index, follow'
  });
  const [stats, setStats] = useState({ words: 0, characters: 0 });
  const [authorsList, setAuthorsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fileInputRef = useRef(null);
  
  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
    if (id) {
      fetchBlogForEdit(id);
    }
  }, [id]);

  const fetchBlogForEdit = async (blogId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs?limit=1000`);
      const blog = res.data.data.find(b => b._id === blogId);
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setContentType(blog.contentType || 'markdown');
        setCategory(blog.category?._id || blog.category || '');
        setAuthor(blog.author?._id || blog.author || '');
        if (blog.seo) setSeo(blog.seo);
        if (blog.versions) setVersions(blog.versions);
        if (blog.coverImage && blog.coverImage !== 'no-photo.jpg') {
          setImagePreview(blog.coverImage);
        }
      }
    } catch (error) {
      console.error('Failed to fetch blog for edit:', error);
      toast.error('Could not load blog details');
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/authors`);
      setAuthorsList(res.data.data);
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/categories`);
      setCategoriesList(res.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Debounced Auto-Save
  useEffect(() => {
    if (!title || !content || !category || !author) return;

    const timer = setTimeout(() => {
      // Auto-save as draft
      handlePublish('Draft', true); // Pass true to indicate it's an auto-save (silent toast)
    }, 10000);

    return () => clearTimeout(timer);
  }, [title, content, category, author, seo]); // Trigger on any of these changes

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async (status = 'Draft', isAutoSave = false) => {
    if (!title || !content || !category || !author) {
      if (!isAutoSave) toast.error('Title, content, category, and author are required');
      return;
    }

    if (!isAutoSave) setIsPublishing(true);
    try {
      const token = localStorage.getItem('adminToken');
      let uploadedImageUrl = '';

      // 1. Upload Image if exists
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/media/upload`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          }
        });
        
        if (uploadRes.data.success) {
          uploadedImageUrl = uploadRes.data.url || uploadRes.data.data.secureUrl;
        }
      }

      // 2. Create or Update Blog
      const blogData = {
        title,
        content,
        contentType,
        category,
        author,
        seo,
        status: status.toLowerCase(),
        ...(uploadedImageUrl ? { coverImage: uploadedImageUrl } : {})
      };

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs/${id}`, blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!isAutoSave) toast.success(`Blog ${status === 'Published' ? 'published' : 'saved'} successfully!`);
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs`, blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!isAutoSave) {
          toast.success(`Blog ${status === 'Published' ? 'published' : 'saved'} successfully!`);
          navigate(`/admin/blogs/edit/${res.data.data._id}`);
        }
      }

      if (!isAutoSave && status === 'Published') {
        navigate('/admin/blogs');
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to publish blog');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden text-[#111] font-sans">
      <Helmet>
        <title>{id ? 'Edit Post' : 'Create Post'} - Llamacorp Admin</title>
      </Helmet>

      {/* Main Editor Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isPreviewOpen ? 'w-1/2 border-r border-black/10 shadow-2xl z-10' : 'w-full'}`}>
        
        {/* Editor Topbar */}
        <header className="h-16 bg-white border-b border-black/5 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <Link to="/admin/blogs" className="p-2 -ml-2 rounded-lg hover:bg-black/5 text-[#555] hover:text-[#111] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#777]">Draft</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </div>
            {title && (
              <span className="text-sm font-semibold text-[#111] line-clamp-1 border-l border-black/10 pl-4 ml-2">
                {title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handlePublish('Draft')}
              disabled={isPublishing}
              className="text-sm font-medium text-[#555] hover:text-[#111] px-3 py-1.5 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button 
              onClick={togglePreview}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isPreviewOpen ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-[#555] hover:bg-gray-200'}`}
            >
              <Eye size={16} />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button 
              onClick={() => handlePublish('Published')}
              disabled={isPublishing}
              className="flex items-center gap-2 px-5 py-2 bg-[#111] text-white rounded-xl text-sm font-medium hover:bg-[#333] transition-colors shadow-lg shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span className="hidden sm:inline">{isPublishing ? 'Publishing...' : 'Publish'}</span>
            </button>
          </div>
        </header>

        {/* Editor Content Area */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <div className="max-w-3xl mx-auto py-12 px-8 md:px-12">
            
            {/* Cover Image Placeholder / Preview */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 mb-10 hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer group relative overflow-hidden"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Cover" className="w-full h-full object-cover absolute inset-0 z-0" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 text-white">
                    <ImageIcon size={32} className="mb-2" />
                    <p className="font-medium">Change Cover Image</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-gray-400" size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Add Cover Image</p>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Title Input */}
            <textarea 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title..."
              className="w-full text-4xl md:text-5xl font-bold text-[#111] placeholder-[#ccc] resize-none focus:outline-none bg-transparent mb-6"
              rows={1}
              style={{ minHeight: '60px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />

            {/* Metadata Inputs */}
            <div className="flex flex-wrap gap-4 mb-12 py-4 border-y border-black/5">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Category *</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="">Select a category</option>
                  {categoriesList.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Author *</label>
                <select 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="">Select an author</option>
                  {authorsList.map(a => (
                    <option key={a._id} value={a._id}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rich Text Editor / Markdown Fallback */}
            <div className="relative group mt-6">
              {contentType === 'markdown' ? (
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing in Markdown... (Use # for headings, ** for bold, etc)"
                  className="w-full min-h-[400px] text-lg text-[#555] leading-relaxed resize-none focus:outline-none bg-transparent"
                />
              ) : (
                <RichTextEditor 
                  content={content} 
                  onChange={setContent} 
                  onStatsChange={setStats}
                />
              )}
            </div>

            {/* SEO Panel */}
            <div className="mt-16 pt-8 border-t border-black/5">
              <h3 className="text-lg font-bold mb-6">SEO Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Meta Title</label>
                  <input type="text" value={seo.title} onChange={e => setSeo({...seo, title: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" placeholder={title} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Focus Keyword</label>
                  <input type="text" value={seo.focusKeyword} onChange={e => setSeo({...seo, focusKeyword: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" placeholder="e.g. web development" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#777] uppercase tracking-wider mb-2">Meta Description</label>
                  <textarea value={seo.description} onChange={e => setSeo({...seo, description: e.target.value})} className="w-full bg-gray-50 border border-black/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" rows={2}></textarea>
                </div>
              </div>
            </div>

            {/* Version History Panel */}
            {versions.length > 0 && (
              <div className="mt-12 pt-8 border-t border-black/5">
                <h3 className="text-lg font-bold mb-6 flex items-center justify-between">
                  Version History
                  <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{versions.length} versions saved</span>
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                  {versions.slice().reverse().map((v, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-black/5 rounded-xl hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-[#333]">Version {versions.length - i}</p>
                        <p className="text-xs text-gray-500">{new Date(v.savedAt).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to restore this version? Current changes will be lost.')) {
                            setContent(v.content);
                            toast.success('Version restored');
                          }
                        }}
                        className="px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-medium hover:bg-black hover:text-white transition-colors shadow-sm"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
        
        {/* Formatting Toolbar (Fixed at bottom) */}
        <div className="h-14 bg-white border-t border-black/5 flex items-center justify-between px-6 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex gap-4 text-xs font-medium text-gray-500">
            <span>{stats.words} words</span>
            <span>{stats.characters} chars</span>
            <span>~{Math.ceil(stats.words / 200)} min read</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setContentType('markdown')} className={`px-2 py-1 rounded ${contentType === 'markdown' ? 'bg-black/10 text-black' : 'text-gray-400 hover:text-black'}`}>Markdown</button>
            <button onClick={() => setContentType('tiptap')} className={`px-2 py-1 rounded ${contentType === 'tiptap' ? 'bg-black/10 text-black' : 'text-gray-400 hover:text-black'}`}>Rich Text</button>
          </div>
        </div>
      </div>

      {/* Live Preview Pane */}
      {isPreviewOpen && (
        <div className="w-1/2 bg-[#f4f5f7] flex flex-col relative animate-in slide-in-from-right duration-300">
          <div className="h-12 border-b border-black/5 bg-white/50 backdrop-blur-sm flex items-center justify-between px-4 absolute top-0 w-full z-20">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Preview</span>
            <div className="flex gap-2">
              <button className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" onClick={togglePreview}></button>
              <button className="w-3 h-3 rounded-full bg-amber-400"></button>
              <button className="w-3 h-3 rounded-full bg-emerald-400"></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pt-12 custom-scrollbar">
            {/* Mock website view */}
            <div className="bg-white min-h-[150%] p-10 pb-32 max-w-2xl mx-auto my-8 rounded-2xl shadow-sm border border-black/5">
              
              {imagePreview && (
                <img src={imagePreview} alt="Cover Preview" className="w-full h-64 object-cover rounded-xl mb-8 shadow-sm" />
              )}
              
              {title ? (
                <h1 className="text-4xl font-bold text-[#111] mb-6 font-sans">{title}</h1>
              ) : (
                <h1 className="text-4xl font-bold text-gray-200 mb-6 font-sans">Article Title...</h1>
              )}
              
              <div className="flex items-center gap-4 text-sm text-[#777] mb-8 pb-8 border-b border-black/5">
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {authorsList.find(a => a._id === author)?.avatar && <img src={authorsList.find(a => a._id === author).avatar} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  {authorsList.find(a => a._id === author)?.name || 'Author Name'}
                </span>
                <span>•</span>
                <span>Just now</span>
                {category && (
                  <>
                    <span>•</span>
                    <span>Selected Category</span>
                  </>
                )}
              </div>

              <div 
                className="space-y-6 text-lg text-[#333] leading-relaxed prose prose-lg prose-headings:font-bold prose-a:text-blue-600 max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: content 
                    ? (contentType === 'tiptap' && typeof content === 'object'
                        ? generateHTML(content, extensions)
                        : (typeof content === 'string' ? marked(content) : ''))
                    : '<p class="text-gray-300">Start writing to see preview...</p>' 
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
