import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import axios from 'axios';
import { marked } from 'marked';

import CTA from '../components/CTA';

export default function BlogArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs/${slug}`);
        setPost(res.data.data);
        
        // Fetch related posts (latest 3)
        const relatedRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/blogs?limit=4`);
        setRelatedPosts(relatedRes.data.data.filter(p => p._id !== res.data.data._id).slice(0, 3));
      } catch (err) {
        console.error('Error fetching post:', err);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

        <h1 className="text-2xl font-semibold mb-4">Loading article...</h1>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-lg text-[#555] mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 bg-[#111] text-white rounded-full font-medium">
          Back to Blog
        </Link>
      </div>
    );
  }

  const coverImage = post.coverImage && post.coverImage !== 'no-photo.jpg' 
    ? post.coverImage 
    : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80';

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [ coverImage ],
    "datePublished": new Date(post.createdAt).toISOString(),
    "author": [{
        "@type": "Person",
        "name": post.author?.name || 'Author',
        "url": "#"
      }]
  };

  return (
    <>
      <SEO 
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt || (post.content ? post.content.substring(0, 150).replace(/<[^>]+>/g, '') + '...' : '')}
        image={coverImage}
        canonical={post.canonicalUrl || `/blog/${slug}`}
      >
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </SEO>



      <main className="pt-32 pb-20 min-h-screen bg-white">
        
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#777] hover:text-[#111] transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 md:px-8 mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#777] mb-6">
            <span className="bg-black/5 px-3 py-1 rounded-full text-[#111] font-semibold text-xs uppercase tracking-wider">
              {post.category?.name || post.category || 'Uncategorized'}
            </span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readingTime || '5 min read'}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#111] leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-black/5 py-6">
            <div className="flex items-center gap-4">
              <img src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.name || 'Author')} alt={post.author?.name || 'Author'} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-[#111]">{post.author?.name || 'Author'}</div>
                <div className="text-xs text-[#777]">{post.author?.role || 'Contributor'} @ Llamacorp</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#777] hidden sm:inline">Share:</span>
              <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#555] hover:bg-[#111] hover:text-white transition-colors" aria-label="Share on Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#555] hover:bg-[#111] hover:text-white transition-colors" aria-label="Share on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#555] hover:bg-[#111] hover:text-white transition-colors" aria-label="Share link">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
          <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden bg-black/5">
            <img src={coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12">
          
          {/* Table of Contents (Sticky Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#777] mb-4">Table of Contents</h4>
              <ul className="space-y-3 border-l border-black/10">
                <li className="pl-4 border-l-2 border-[#111] text-[#111] font-medium text-[15px] cursor-pointer">Read Full Article</li>
              </ul>
            </div>
          </aside>

          {/* Content */}
          <article 
            className="prose prose-lg prose-slate max-w-none w-full
            prose-headings:font-bold prose-headings:text-[#111] prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-[#444] prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-[#111] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#555] prose-blockquote:my-8
            prose-img:rounded-[24px] prose-img:my-10
            prose-pre:bg-[#111] prose-pre:text-white prose-pre:rounded-xl prose-pre:p-6"
            dangerouslySetInnerHTML={{ __html: post.content ? marked(post.content) : '' }}
          />
        </div>

        {/* Tags */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 lg:pl-[19rem]">
          <div className="flex flex-wrap gap-2">
            {(post.tags || []).map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-black/5 text-[#555] text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-16 mb-16">
          <div className="w-full h-px bg-black/10"></div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
            <h3 className="text-2xl font-bold text-[#111] mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link to={`/blog/${relatedPost.slug}`} key={relatedPost._id} className="group block bg-white rounded-[24px] border border-black/5 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={relatedPost.coverImage && relatedPost.coverImage !== 'no-photo.jpg' ? relatedPost.coverImage : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80'} alt={relatedPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#111]">
                      {relatedPost.category?.name || relatedPost.category || 'Uncategorized'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-[#111] leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-[#777]">
                      <span className="font-medium text-[#111]">{relatedPost.author?.name || 'Author'}</span>
                      <span>{relatedPost.readingTime || '5 min read'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <CTA />
    </>
  );
}
