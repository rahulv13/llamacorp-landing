'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface MediaItem {
  _id: string;
  secureUrl: string;
  filename: string;
  alt?: string;
  format?: string;
  bytes?: number;
  createdAt: string;
}

interface MediaGridProps {
  media: MediaItem[];
  selectedId: string | null;
  onSelect: (item: MediaItem) => void;
  viewMode: 'grid' | 'list';
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function MediaGrid({ media, selectedId, onSelect, viewMode }: MediaGridProps) {
  if (media.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center">
        <p className="text-white/40">No media found.</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
        <table className="min-w-full divide-y divide-white/5">
          <thead>
            <tr className="bg-white/5">
              <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-semibold text-white/60">Preview</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-white/60">Filename</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-white/60">Date</th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-white/60">Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#111]">
            {media.map((item) => (
              <tr 
                key={item._id} 
                onClick={() => onSelect(item)}
                className={`cursor-pointer transition-colors ${selectedId === item._id ? 'bg-blue-500/10' : 'hover:bg-white/5'}`}
              >
                <td className="whitespace-nowrap py-3 pl-4 pr-3">
                  <div className="h-10 w-16 relative rounded overflow-hidden border border-white/10 bg-black">
                    <Image src={item.secureUrl} alt={item.alt || item.filename} fill className="object-cover" sizes="64px" />
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-white">
                  <div className="max-w-[200px] truncate">{item.filename || 'Unnamed'}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-white/60">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-3 py-3 text-sm text-white/60">
                  {item.bytes ? formatBytes(item.bytes) : 'Unknown'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {media.map((item) => {
        const isSelected = selectedId === item._id;
        
        return (
          <div 
            key={item._id}
            onClick={() => onSelect(item)}
            className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
              isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
            
            <Image 
              src={item.secureUrl} 
              alt={item.alt || item.filename} 
              fill 
              sizes="(max-width: 768px) 33vw, 20vw"
              className={`object-cover transition-transform duration-300 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`} 
            />
            
            {isSelected && (
              <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white p-1 rounded-md shadow-lg shadow-black/50">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 z-20">
              <p className="text-white text-xs font-medium truncate drop-shadow-md">{item.filename || 'Unnamed'}</p>
              <p className="text-white/70 text-[10px] truncate drop-shadow-md mt-0.5">
                {item.bytes ? formatBytes(item.bytes) : (item.format || 'Image')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
