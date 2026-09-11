'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, UploadCloud, Check } from 'lucide-react';
import Image from 'next/image';
import { getAdminMedia, uploadAdminImage } from '@/lib/admin/media';

interface MediaItem {
  _id: string;
  secureUrl: string;
  filename: string;
  alt?: string;
  format?: string;
  bytes?: number;
  createdAt: string;
}

interface MediaPickerProps {
  onSelect: (item: MediaItem) => void;
  onClose: () => void;
  title?: string;
}

export default function MediaPicker({ onSelect, onClose, title = "Select Media" }: MediaPickerProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchMedia = async (pageNum = 1, searchQuery = search, append = false) => {
    setLoading(!append);
    const res = await getAdminMedia(pageNum, 30, searchQuery);
    
    if (res.data) {
      setMedia(prev => append ? [...prev, ...res.data] : res.data);
      setHasMore(pageNum < (res.pagination?.totalPages || 1));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'library') {
      fetchMedia(1, search, false);
    }
  }, [search, activeTab]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMedia(nextPage, search, true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await uploadAdminImage(formData);
      
      if (!res.error && res.media) {
        setMedia(prev => [res.media, ...prev]);
        setActiveTab('library');
        setSelectedItem(res.media);
      } else {
        alert(`Upload failed: ${res.error}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Upload failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      // Reset input value to allow re-uploading the same file if needed
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#111] border border-white/10 rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 px-6 border-b border-white/10 bg-[#0a0a0a]">
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-3 pt-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'library' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 pt-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'upload' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            Upload New
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {activeTab === 'upload' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div 
                className="w-full max-w-md aspect-video rounded-xl border-2 border-dashed border-white/10 bg-black/50 hover:bg-white/5 hover:border-white/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer"
                onClick={() => document.getElementById('picker-upload')?.click()}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 text-blue-400">
                    <Loader2 size={32} className="animate-spin" />
                    <span className="text-sm font-medium">Uploading image...</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={40} className="text-white/40 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Click to upload image</h3>
                    <p className="text-sm text-white/40">JPG, PNG, WebP, GIF, SVG</p>
                  </>
                )}
                <input 
                  type="file" 
                  id="picker-upload" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 bg-black/30">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search files or alt text..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black">
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-white/40" size={32} />
                  </div>
                ) : media.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center text-white/40">
                    No media found matching your search.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {media.map((item) => {
                      const isSelected = selectedItem?._id === item._id;
                      return (
                        <div 
                          key={item._id}
                          onClick={() => setSelectedItem(item)}
                          className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                            isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Image 
                            src={item.secureUrl} 
                            alt={item.alt || item.filename} 
                            fill 
                            sizes="200px"
                            className="object-cover" 
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white p-1 rounded-md shadow-lg">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-[10px] truncate">{item.filename}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {hasMore && !loading && (
                  <div className="flex justify-center pt-8 pb-4">
                    <button
                      onClick={loadMore}
                      className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm font-medium text-white transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-[#0a0a0a]">
          <div className="text-sm text-white/50">
            {selectedItem ? `Selected: ${selectedItem.filename}` : 'No image selected'}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedItem) onSelect(selectedItem);
              }}
              disabled={!selectedItem}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
            >
              Select Image
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
