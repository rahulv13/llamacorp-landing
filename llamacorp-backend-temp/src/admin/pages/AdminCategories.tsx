import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tag, Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/blogs/admin`);
        const catMap = new Map();
        res.data.forEach((b: any) => {
          const c = b.category || 'Uncategorized';
          catMap.set(c, (catMap.get(c) || 0) + 1);
        });
        setCategories(Array.from(catMap.entries()).map(([name, count]) => ({name, count})));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Categories</h2>
        <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2">
          <Plus size={16} /> New Category
        </button>
      </div>
      <div className="liquid-glass rounded-[1.25rem] overflow-hidden p-6">
        {loading ? <p className="text-gray-500">Loading categories...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(c => (
              <div key={c.name} className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-white">{c.name}</h3>
                  <p className="text-sm text-gray-400">{c.count} Posts</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-white transition-colors"><Edit size={16}/></button>
                  <button className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
