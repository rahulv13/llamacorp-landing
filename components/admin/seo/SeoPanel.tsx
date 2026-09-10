import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface SeoPanelProps {
  metaTitle: string;
  setMetaTitle: (v: string) => void;
  metaDescription: string;
  setMetaDescription: (v: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (v: string) => void;
  metaKeywords: string;
  setMetaKeywords: (v: string) => void;
}

export default function SeoPanel({
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  canonicalUrl,
  setCanonicalUrl,
  metaKeywords,
  setMetaKeywords
}: SeoPanelProps) {
  
  // Character limits
  const TITLE_RECOMMENDED = 60;
  const DESC_RECOMMENDED = 160;

  return (
    <div className="space-y-6">
      {/* SEO Title */}
      <div>
        <label htmlFor="metaTitle" className="block text-sm font-medium text-white/80 mb-2 flex justify-between items-center">
          <span>SEO Title</span>
          <span className={`text-xs ${metaTitle.length > TITLE_RECOMMENDED ? 'text-red-400' : metaTitle.length > 40 ? 'text-green-400' : 'text-white/40'}`}>
            {metaTitle.length} / {TITLE_RECOMMENDED}
          </span>
        </label>
        <input
          type="text"
          id="metaTitle"
          name="metaTitle"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
          placeholder="Leave blank to use blog title"
        />
        <div className="mt-2 flex items-center gap-2 text-xs">
          {metaTitle.length === 0 ? (
            <span className="text-white/40 flex items-center gap-1"><AlertCircle size={12}/> Title will default to Article Title</span>
          ) : metaTitle.length > TITLE_RECOMMENDED ? (
            <span className="text-red-400 flex items-center gap-1"><AlertCircle size={12}/> Title is too long. Google may truncate it.</span>
          ) : metaTitle.length < 40 ? (
            <span className="text-yellow-400 flex items-center gap-1"><AlertCircle size={12}/> Title is a bit short. Add more keywords.</span>
          ) : (
            <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={12}/> Optimal title length!</span>
          )}
        </div>
      </div>

      {/* Meta Description */}
      <div>
        <label htmlFor="metaDescription" className="block text-sm font-medium text-white/80 mb-2 flex justify-between items-center">
          <span>Meta Description</span>
          <span className={`text-xs ${metaDescription.length > DESC_RECOMMENDED ? 'text-red-400' : metaDescription.length > 120 ? 'text-green-400' : 'text-white/40'}`}>
            {metaDescription.length} / {DESC_RECOMMENDED}
          </span>
        </label>
        <textarea
          id="metaDescription"
          name="metaDescription"
          rows={3}
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/50 py-2.5 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
          placeholder="A compelling summary for search engines..."
        />
        <div className="mt-2 flex items-center gap-2 text-xs">
          {metaDescription.length === 0 ? (
            <span className="text-red-400 flex items-center gap-1"><AlertCircle size={12}/> Missing description! This severely hurts CTR.</span>
          ) : metaDescription.length > DESC_RECOMMENDED ? (
            <span className="text-red-400 flex items-center gap-1"><AlertCircle size={12}/> Description is too long and will be truncated.</span>
          ) : metaDescription.length < 120 ? (
            <span className="text-yellow-400 flex items-center gap-1"><AlertCircle size={12}/> Too short. Aim for at least 120 characters.</span>
          ) : (
            <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={12}/> Great description length.</span>
          )}
        </div>
      </div>

      {/* Focus Keywords */}
      <div>
        <label htmlFor="metaKeywords" className="block text-sm font-medium text-white/80 mb-2">
          Focus Keywords
        </label>
        <input
          type="text"
          id="metaKeywords"
          name="metaKeywords"
          value={metaKeywords}
          onChange={(e) => setMetaKeywords(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
          placeholder="Comma separated keywords (e.g., ai agency, web design)"
        />
        <p className="mt-1 text-xs text-white/40">These are used as Open Graph tags and meta keywords.</p>
      </div>

      {/* Canonical URL */}
      <div>
        <label htmlFor="canonicalUrl" className="block text-sm font-medium text-white/80 mb-2">
          Canonical URL
        </label>
        <input
          type="url"
          id="canonicalUrl"
          name="canonicalUrl"
          value={canonicalUrl}
          onChange={(e) => setCanonicalUrl(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-black/50 py-2 px-3 text-white focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 text-sm"
          placeholder="https://www.llamacorp.in/blog/..."
        />
        <p className="mt-1 text-xs text-white/40">Only set this if the content was originally published elsewhere (e.g., Medium).</p>
      </div>
    </div>
  );
}
