'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Image as ImageIcon, Users, Settings, Activity } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Activity, group: 'Navigation' },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText, group: 'Navigation' },
    { name: 'Create New Blog', href: '/admin/blogs/new', icon: FileText, group: 'Actions' },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon, group: 'Navigation' },
    { name: 'Users', href: '/admin/users', icon: Users, group: 'Navigation' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, group: 'Navigation' },
    { name: 'System Health', href: '/admin/health', icon: Activity, group: 'Navigation' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-black/50">
          <Search className="w-5 h-5 text-white/40 mr-3" />
          <input
            autoFocus
            type="text"
            placeholder="Search or jump to... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 text-sm"
          />
        </div>
        
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-sm text-white/40">No results found.</div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => navigate(cmd.href)}
                  className="w-full flex items-center px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <cmd.icon className="w-4 h-4 mr-3 text-white/40 group-hover:text-blue-400" />
                  {cmd.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-2 border-t border-white/10 bg-black/30 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-wider">
          <span>Search global actions</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
