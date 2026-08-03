import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tag, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminTags() {
  const [tags, setTags] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/admin`);
        const tagMap = new Map();
        res.data.forEach((b: any) => {
          if(b.tags && Array.isArray(b.tags)){
            b.tags.forEach((t: string) => {
               tagMap.set(t, (tagMap.get(t) || 0) + 1);
            });
          }
        });
        setTags(Array.from(tagMap.entries()).map(([name, count]) => ({name, count})));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Tags</h2>
        <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2">
          <Plus size={16} /> New Tag
        </button>
      </div>
      <div className="liquid-glass rounded-[1.25rem] overflow-hidden p-6">
        {loading ? <p className="text-gray-500">Loading tags...</p> : (
          <div className="flex flex-wrap gap-3">
            {tags.map(t => (
              <div key={t.name} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                <Tag size={14} className="text-gray-400" />
                <span className="font-medium text-white">{t.name}</span>
                <span className="text-xs text-gray-500 bg-black/30 px-2 py-0.5 rounded-full">{t.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
