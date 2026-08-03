import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image as ImageIcon, Search } from 'lucide-react';

export default function AdminMediaLibrary() {
  const [media, setMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/admin`);
        const allMedia = new Set<string>();
        res.data.forEach((b: any) => {
          if (b.coverImage) allMedia.add(b.coverImage);
          if (b.ogImage) allMedia.add(b.ogImage);
        });
        setMedia(Array.from(allMedia));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/upload-image`, formData);
        setMedia([res.data.url, ...media]);
      } catch (err) {
        console.error('Error uploading image', err);
        alert('Failed to upload image');
      }
    }
  };

  const handleDelete = (urlToDelete: string) => {
    if (window.confirm('Delete this image? (Note: This only removes it from this view as the backend does not support Cloudinary deletion yet)')) {
      setMedia(media.filter(url => url !== urlToDelete));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Media Library</h2>
        <label className="liquid-glass-strong rounded-full text-white px-5 py-2.5 text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">
          <span>Upload Image</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
        </label>
      </div>
      <div className="liquid-glass rounded-[1.25rem] overflow-hidden p-6">
        {loading ? <p className="text-gray-500">Loading media...</p> : media.length === 0 ? <p className="text-gray-500 text-center py-12">No media found.</p> : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {media.map((url, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10 group relative">
                <img src={url} alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <button onClick={() => window.open(url, '_blank')} className="bg-white/20 hover:bg-white/40 text-white rounded-full px-4 py-1 text-sm backdrop-blur-md transition-colors">View</button>
                    <button onClick={() => handleDelete(url)} className="bg-red-500/20 hover:bg-red-500/40 text-red-100 rounded-full px-4 py-1 text-sm backdrop-blur-md transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
