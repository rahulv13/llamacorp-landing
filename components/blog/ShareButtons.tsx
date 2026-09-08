"use client";

import React from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButtons({ title, url }: { title: string, url: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#777] hidden sm:inline">Share:</span>
      <button onClick={shareTwitter} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#555] hover:bg-[#111] hover:text-white transition-colors" aria-label="Share on Twitter">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      </button>
      <button onClick={shareLinkedIn} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#555] hover:bg-[#111] hover:text-white transition-colors" aria-label="Share on LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </button>
      <button onClick={copyLink} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#555] hover:bg-[#111] hover:text-white transition-colors" aria-label="Share link">
        <Share2 size={18} />
      </button>
    </div>
  );
}
