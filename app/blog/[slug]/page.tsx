import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Check, Facebook, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Twitter, Linkedin, Github, Instagram, Globe, Youtube as YoutubeIcon } from '@/components/SocialIcons';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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

import CalloutNode from '../../../components/blog/CalloutNode';
import { getBlogs, getBlogBySlug } from '../../../lib/api/blog';
import { getBlogExcerpt } from '../../../utils/blogUtils';
import ShareButtons from '../../../components/blog/ShareButtons';
import CTA from '../../../components/CTA';

const extensions = [
  StarterKit, LinkExtension, ImageExtension, TableExtension, 
  TableRow, TableCell, TableHeader, TaskList, TaskItem, 
  Underline, TextAlign.configure({ types: ['heading', 'paragraph'] }), Youtube, CalloutNode
];

export const revalidate = 60;

// Dynamic Metadata Generation
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | LlamaCorp',
    };
  }

  const coverImage = post.coverImage && post.coverImage !== 'no-photo.jpg' 
    ? post.coverImage 
    : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80';

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || getBlogExcerpt(post, 150),
    alternates: {
      canonical: post.canonicalUrl || `https://llamacorp.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || getBlogExcerpt(post, 150),
      type: 'article',
      publishedTime: new Date(post.createdAt).toISOString(),
      authors: [post.author?.fullName || post.author?.name || 'Llamacorp Team'],
      images: [{ url: coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || getBlogExcerpt(post, 150),
      images: [coverImage],
    }
  };
}

// Static Generation
export async function generateStaticParams() {
  const blogs = await getBlogs(100); // Pre-build top 100
  return blogs.map((blog: any) => ({
    slug: blog.slug,
  }));
}

export default async function BlogArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const [post, allBlogs] = await Promise.all([
    getBlogBySlug(params.slug),
    getBlogs(4)
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allBlogs.filter((p: any) => p._id !== post._id).slice(0, 3);

  const coverImage = post.coverImage && post.coverImage !== 'no-photo.jpg' 
    ? post.coverImage 
    : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [coverImage],
    "datePublished": new Date(post.createdAt).toISOString(),
    "author": [{
        "@type": "Person",
        "name": post.author?.fullName || post.author?.name || 'Llamacorp Team',
        "url": `https://llamacorp.com/authors/${post.author?.slug || 'llamacorp-team'}`
    }]
  };

  const articleHtml = post.content 
    ? (post.contentType === 'tiptap' && typeof post.content === 'object'
        ? generateHTML(post.content, extensions)
        : (typeof post.content === 'string' ? marked(post.content) : ''))
    : '';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="pt-32 pb-20 min-h-screen bg-white">
        
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#777] hover:text-[#111] transition-colors text-sm font-medium">
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
              <img src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.fullName || post.author?.name || 'Llamacorp Team')} alt={post.author?.fullName || 'Llamacorp Team'} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-[#111]">
                  <Link href={`/authors/${post.author?.slug || 'llamacorp-team'}`} className="hover:underline">
                    {post.author?.fullName || post.author?.name || 'Llamacorp Team'}
                  </Link>
                </div>
                <div className="text-xs text-[#777]">{post.author?.jobTitle || post.author?.role || 'Contributor'} @ Llamacorp</div>
              </div>
            </div>

            <ShareButtons title={post.title} url={`https://llamacorp.com/blog/${post.slug}`} />
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
          <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden bg-black/5">
            { }
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
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />
        </div>

        {/* Tags */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12 lg:pl-[19rem]">
          <div className="flex flex-wrap gap-2">
            {(post.tags || []).map((tag: string) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-black/5 text-[#555] text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-16 lg:pl-[19rem]">
          <div className="bg-[#f8f9fa] rounded-3xl p-8 md:p-10 border border-black/5 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <img 
              src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.fullName || post.author?.name || 'Llamacorp Team')} 
              alt={post.author?.fullName || 'Llamacorp Team'} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-black/10 shrink-0" 
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 text-xs font-medium text-[#777] mb-3 uppercase tracking-wider">
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-black/20"></span>
                <span>{post.readingTime || '5 min read'}</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111] mb-1">
                {post.author?.fullName || post.author?.name || 'Llamacorp Team'}
              </h3>
              <p className="text-sm font-medium text-[#555] mb-4">
                {post.author?.jobTitle || 'Contributor'}
              </p>
              
              {post.author?.bio && (
                <p className="text-[#555] text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.author.bio.replace(/<[^>]*>?/gm, '')}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                <div className="flex items-center gap-4">
                  {post.author?.x && (
                    <a href={post.author.x} target="_blank" rel="noopener noreferrer" className="text-[#777] hover:text-[#111] transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {post.author?.linkedin && (
                    <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#777] hover:text-[#111] transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {post.author?.github && (
                    <a href={post.author.github} target="_blank" rel="noopener noreferrer" className="text-[#777] hover:text-[#111] transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {post.author?.instagram && (
                    <a href={post.author.instagram} target="_blank" rel="noopener noreferrer" className="text-[#777] hover:text-[#111] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {post.author?.youtube && (
                    <a href={post.author.youtube} target="_blank" rel="noopener noreferrer" className="text-[#777] hover:text-[#111] transition-colors">
                      <YoutubeIcon className="w-4 h-4" />
                    </a>
                  )}
                  {post.author?.website && (
                    <a href={post.author.website} target="_blank" rel="noopener noreferrer" className="text-[#777] hover:text-[#111] transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
                
                <Link 
                  href={`/authors/${post.author?.slug || 'llamacorp-team'}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#111] hover:opacity-70 transition-opacity"
                >
                  View all articles by this author <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
              {relatedPosts.map((relatedPost: any) => (
                <Link href={`/blog/${relatedPost.slug}`} key={relatedPost._id} className="group block bg-white rounded-[24px] border border-black/5 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    { }
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
                      <span className="font-medium text-[#111]">{relatedPost.author?.fullName || relatedPost.author?.name || 'Llamacorp Team'}</span>
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
