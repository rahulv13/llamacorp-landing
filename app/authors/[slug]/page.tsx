import React from 'react';
import { getPublicAuthorBySlug, getPublicAuthors } from '@/lib/authors';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Twitter, Linkedin, Github, Globe, Instagram, Youtube } from '@/components/SocialIcons';
import Footer from '@/components/Footer';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = await getPublicAuthorBySlug(params.slug);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  const title = author.seoTitle || `${author.fullName} | Author at Llamacorp`;
  const description = author.seoDescription || (author.bio ? author.bio.substring(0, 157).replace(/<[^>]*>?/gm, '') + '...' : `Read articles by ${author.fullName} on the Llamacorp blog.`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://llamacorp.com/authors/${author.slug}`,
      images: [
        {
          url: author.avatar || 'https://ui-avatars.com/api/?name=' + author.fullName,
          width: 800,
          height: 800,
          alt: author.fullName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [author.avatar || 'https://ui-avatars.com/api/?name=' + author.fullName],
    },
    alternates: {
      canonical: `https://llamacorp.com/authors/${author.slug}`,
    },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const author = await getPublicAuthorBySlug(params.slug);

  if (!author) {
    notFound();
  }

  // Generate JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.fullName,
    url: `https://llamacorp.com/authors/${author.slug}`,
    image: author.avatar || 'https://ui-avatars.com/api/?name=' + author.fullName,
    jobTitle: author.jobTitle || 'Author',
    worksFor: {
      '@type': 'Organization',
      name: 'Llamacorp'
    },
    sameAs: [
      author.website,
      author.linkedin,
      author.x,
      author.instagram,
      author.github,
      author.youtube
    ].filter(Boolean)
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="pt-32 lg:pt-48 pb-20 px-6 lg:px-12 border-b border-white/10 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-50 mix-blend-screen pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-start gap-12 lg:gap-20">
          <img 
            src={author.avatar || 'https://ui-avatars.com/api/?name=' + author.fullName} 
            alt={author.fullName}
            className="w-40 h-40 lg:w-56 lg:h-56 rounded-3xl object-cover border border-white/20 shadow-2xl"
          />
          
          <div className="flex-1 max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4">{author.fullName}</h1>
            <p className="text-xl lg:text-2xl text-white/50 font-medium mb-8">
              {author.jobTitle || 'Contributor at Llamacorp'}
            </p>

            {author.bio && (
              <div 
                className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed mb-10"
                dangerouslySetInnerHTML={{ __html: author.bio }}
              />
            )}

            <div className="flex flex-wrap items-center gap-4">
              {author.x && (
                <a href={author.x} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {author.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {author.instagram && (
                <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {author.github && (
                <a href={author.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {author.youtube && (
                <a href={author.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {author.website && (
                <a href={author.website} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
            <h2 className="text-3xl font-bold tracking-tight">Articles by {author.fullName.split(' ')[0]}</h2>
            <span className="px-4 py-1.5 rounded-full border border-white/20 text-sm font-medium">
              {author.blogs?.length || 0} Published
            </span>
          </div>

          {author.blogs && author.blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {author.blogs.map((blog: any) => (
                <Link 
                  key={blog._id} 
                  href={`/blog/${blog.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-[#111] overflow-hidden hover:border-white/30 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={blog.coverImage || '/placeholder-blog.jpg'} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    {blog.category && (
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-medium text-white">
                        {blog.category.name}
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-xs font-medium text-white/40 mb-4">
                      <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-white/40"></span>
                      <span>{blog.readingTime || '5 min read'}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-white/80 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-6">
                      {blog.excerpt || blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120)}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
                      Read article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#111] rounded-3xl border border-white/10">
              <p className="text-xl text-white/40">No published articles yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
