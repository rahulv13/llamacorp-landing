'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List as ListIcon, Folder, Image as ImageIcon, Loader2 } from 'lucide-react';
import UploadDropzone from '@/components/admin/media/UploadDropzone';
import MediaGrid from '@/components/admin/media/MediaGrid';
import MediaDetails from '@/components/admin/media/MediaDetails';
import { getAdminMedia } from '@/lib/admin/media';

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('all'); // all, unused, images
  
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

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
    fetchMedia(1, search, false);
  }, [search]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMedia(nextPage, search, true);
  };

  const handleUploadComplete = () => {
    // Refresh to show newly uploaded files at the top
    setPage(1);
    fetchMedia(1, search, false);
  };

  const handleUpdate = (updatedItem: any) => {
    setMedia(prev => prev.map(m => m._id === updatedItem._id ? updatedItem : m));
    if (selectedItem?._id === updatedItem._id) {
      setSelectedItem(updatedItem);
    }
  };

  const handleDelete = (deletedId: string) => {
    setMedia(prev => prev.filter(m => m._id !== deletedId));
    if (selectedItem?._id === deletedId) {
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] -m-8">
      
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0a0a0a]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Media Library</h1>
          <p className="text-sm text-white/40 mt-1">Manage and optimize your assets</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar (Folders Placeholder) */}
        <div className="w-64 border-r border-white/10 bg-[#0a0a0a] p-4 hidden md:flex flex-col gap-6 overflow-y-auto">
          <div className="space-y-1">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <Folder size={16} /> All Media
            </button>
            <button 
              onClick={() => setActiveFilter('images')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'images' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <ImageIcon size={16} /> Images
            </button>
            <button 
              onClick={() => setActiveFilter('unused')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'unused' ? 'bg-blue-500/10 text-blue-400' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <Filter size={16} /> Unused Assets
            </button>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-3">Storage</h3>
            <div className="px-3">
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-white/40">45% used of 10GB limit</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-black relative overflow-hidden">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-white/10 bg-[#111]">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search files or alt text..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-black/50 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/50 border border-white/10 rounded-md p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded text-white/60 hover:text-white transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : ''}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded text-white/60 hover:text-white transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : ''}`}
                >
                  <ListIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 pb-32">
            {!search && page === 1 && (
              <UploadDropzone onUploadComplete={handleUploadComplete} />
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-white/40" size={32} />
              </div>
            ) : (
              <>
                <MediaGrid 
                  media={media} 
                  viewMode={viewMode}
                  selectedId={selectedItem?._id || null} 
                  onSelect={setSelectedItem} 
                />
                
                {hasMore && (
                  <div className="flex justify-center pt-8">
                    <button
                      onClick={loadMore}
                      className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm font-medium text-white transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Details Sidebar */}
        {selectedItem && (
          <MediaDetails 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
