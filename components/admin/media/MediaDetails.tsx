'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Copy, Trash2, CheckCircle2, Save, ExternalLink } from 'lucide-react';
import { updateAdminMedia, deleteAdminMedia } from '@/lib/admin/media';

interface MediaItem {
  _id: string;
  secureUrl: string;
  filename: string;
  alt?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt: string;
}

interface MediaDetailsProps {
  item: MediaItem;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (item: MediaItem) => void;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function MediaDetails({ item, onClose, onDelete, onUpdate }: MediaDetailsProps) {
  const [alt, setAlt] = useState(item.alt || '');
  const [filename, setFilename] = useState(item.filename || '');
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState<'url' | 'markdown' | 'html' | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset local state when a new item is selected
  useEffect(() => {
    setAlt(item.alt || '');
    setFilename(item.filename || '');
  }, [item]);

  const handleCopy = (type: 'url' | 'markdown' | 'html') => {
    let textToCopy = '';
    
    if (type === 'url') textToCopy = item.secureUrl;
    if (type === 'markdown') textToCopy = `![${item.alt || item.filename}](${item.secureUrl})`;
    if (type === 'html') textToCopy = `<img src="${item.secureUrl}" alt="${item.alt || item.filename}" />`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateAdminMedia(item._id, { alt, filename });
    if (!res.error) {
      onUpdate({ ...item, alt, filename });
    } else {
      alert(res.error);
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this image? It may be used in published articles!")) {
      setIsDeleting(true);
      const res = await deleteAdminMedia(item._id);
      if (!res.error) {
        onDelete(item._id);
      } else {
        alert(res.error);
        setIsDeleting(false);
      }
    }
  };

  const hasChanges = alt !== (item.alt || '') || filename !== (item.filename || '');

  return (
    <div className="w-80 border-l border-white/10 bg-[#0a0a0a] flex flex-col h-full overflow-hidden absolute right-0 top-0 bottom-0 z-40 lg:relative slide-in-from-right animate-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#111]">
        <h3 className="text-sm font-semibold text-white">Attachment Details</h3>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-4 space-y-6">
        
        {/* Preview */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/50 group">
          <Image src={item.secureUrl} alt={alt} fill className="object-contain" sizes="320px" />
          <a 
            href={item.secureUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-blue-500 rounded-md text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md"
            title="Open in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 text-xs text-white/50">
          <div className="flex justify-between">
            <span className="font-medium text-white/70">Uploaded on</span>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-white/70">File size</span>
            <span>{item.bytes ? formatBytes(item.bytes) : 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-white/70">Dimensions</span>
            <span>{item.width && item.height ? `${item.width} x ${item.height}` : 'Unknown'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-white/70">Format</span>
            <span className="uppercase">{item.format || 'Image'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <button 
            onClick={() => handleCopy('url')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors"
          >
            {copied === 'url' ? <CheckCircle2 size={12} className="text-green-400" /> : <Copy size={12} />} URL
          </button>
          <button 
            onClick={() => handleCopy('markdown')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors"
          >
            {copied === 'markdown' ? <CheckCircle2 size={12} className="text-green-400" /> : <Copy size={12} />} Markdown
          </button>
        </div>

        {/* Edit Form */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div>
            <label htmlFor="filename" className="block text-xs font-medium text-white/70 mb-1">File Name</label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black py-1.5 px-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="alt" className="block text-xs font-medium text-white/70 mb-1">
              Alt Text <span className="text-red-400">*</span>
            </label>
            <textarea
              id="alt"
              rows={2}
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black py-1.5 px-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
              placeholder="Describe image for screen readers"
            />
            {alt.length === 0 && <p className="text-[10px] text-yellow-500 mt-1">Missing alt text hurts accessibility & SEO.</p>}
          </div>

          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white text-xs font-medium transition-colors"
          >
            <Save size={14} /> {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-6">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors disabled:opacity-50"
          >
            <Trash2 size={14} /> {isDeleting ? 'Deleting...' : 'Permanently Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
