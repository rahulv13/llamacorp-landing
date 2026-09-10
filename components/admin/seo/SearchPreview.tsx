import React, { useState } from 'react';

interface SearchPreviewProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  coverImage: string | null;
  ogImage: string | null;
}

export default function SearchPreview({
  title,
  metaTitle,
  metaDescription,
  slug,
  coverImage,
  ogImage
}: SearchPreviewProps) {
  const [activeTab, setActiveTab] = useState<'google' | 'og' | 'twitter'>('google');

  const displayTitle = metaTitle || title || 'Your Blog Title';
  const displayDesc = metaDescription || 'This is how your description will appear in search results. Make it compelling to improve click-through rates...';
  const url = `https://www.llamacorp.in/blog/${slug || 'blog-post-url'}`;
  const image = ogImage || coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';

  return (
    <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden flex flex-col">
      <div className="flex items-center border-b border-white/10 bg-[#1a1a1a]">
        <button
          type="button"
          onClick={() => setActiveTab('google')}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'google' ? 'border-blue-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
        >
          Google Search
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('og')}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'og' ? 'border-blue-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
        >
          Open Graph (Social)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('twitter')}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'twitter' ? 'border-blue-500 text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
        >
          Twitter (X)
        </button>
      </div>

      <div className="p-6 bg-[#0a0a0a]">
        {activeTab === 'google' && (
          <div className="max-w-[600px]">
            <div className="flex items-center gap-2 text-sm text-[#dadce0] mb-1">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shrink-0">L</div>
              <div>
                <span className="block text-xs leading-tight">LlamaCorp</span>
                <span className="block text-xs text-[#bdc1c6] leading-tight">{url}</span>
              </div>
            </div>
            <h3 className="text-[#8ab4f8] text-xl font-medium cursor-pointer hover:underline mb-1 truncate">
              {displayTitle}
            </h3>
            <p className="text-[#bdc1c6] text-sm leading-snug line-clamp-2">
              {displayDesc}
            </p>
          </div>
        )}

        {activeTab === 'og' && (
          <div className="max-w-[500px] border border-white/10 rounded-xl overflow-hidden bg-[#1a1a1a]">
            <div className="w-full aspect-[1.91/1] relative bg-black/50 border-b border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="OG Preview" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-1">llamacorp.in</div>
              <h3 className="text-white font-semibold mb-1 truncate">{displayTitle}</h3>
              <p className="text-white/60 text-sm line-clamp-1">{displayDesc}</p>
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div className="max-w-[500px] border border-white/10 rounded-xl overflow-hidden bg-transparent">
            <div className="w-full aspect-[1.91/1] relative bg-black/50 border-b border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Twitter Preview" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 bg-black">
              <div className="text-white/40 text-sm truncate mb-0.5">llamacorp.in</div>
              <h3 className="text-white text-sm line-clamp-1">{displayTitle}</h3>
              <p className="text-white/50 text-sm line-clamp-1">{displayDesc}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
