import React from 'react';
import Link from 'next/link';
import { getPublicAuthors } from '@/lib/authors';
import { ArrowRight } from 'lucide-react';
import { Twitter, Linkedin, Github, Globe } from '@/components/SocialIcons';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Authors | Llamacorp',
  description: 'Meet the team of expert writers and creators behind the Llamacorp blog.',
};

export default async function AuthorsPage() {
  const authors = await getPublicAuthors();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 pt-24 lg:pt-32">
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-24">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-24">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">Our Authors</h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Meet the expert writers, designers, and engineers behind the Llamacorp blog.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author: any) => (
            <Link 
              key={author._id} 
              href={`/authors/${author.slug}`}
              className="group block rounded-2xl border border-white/10 bg-[#111] p-8 hover:bg-white/5 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-8">
                <img 
                  src={author.avatar || 'https://ui-avatars.com/api/?name=' + author.fullName} 
                  alt={author.fullName}
                  className="w-20 h-20 rounded-full object-cover border border-white/10"
                />
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 group-hover:bg-white text-white group-hover:text-black transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold">{author.fullName}</h3>
                <p className="text-white/50 font-medium">{author.jobTitle || 'Contributor'}</p>
              </div>

              {author.bio && (
                <p className="text-white/70 line-clamp-3 mb-8 text-sm leading-relaxed">
                  {author.bio.replace(/<[^>]*>?/gm, '')}
                </p>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-sm font-medium text-white/60">
                  {author.blogs?.length || 0} Article{author.blogs?.length !== 1 ? 's' : ''}
                </span>
                
                <div className="flex gap-3 text-white/40">
                  {author.x && <Twitter className="w-4 h-4" />}
                  {author.linkedin && <Linkedin className="w-4 h-4" />}
                  {author.github && <Github className="w-4 h-4" />}
                  {author.website && <Globe className="w-4 h-4" />}
                </div>
              </div>
            </Link>
          ))}

          {authors.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="text-xl text-white/40">No authors found.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
