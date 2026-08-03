import React from 'react';
import { Mail, Settings, Users, Activity, MessageSquare } from 'lucide-react';

export default function AdminPlaceholderPage({ title, description, icon: Icon }: any) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">{title}</h2>
      <div className="liquid-glass rounded-[1.25rem] p-12 flex flex-col items-center justify-center text-center">
        <div className="p-4 bg-white/5 border border-white/10 rounded-full mb-4">
            <Icon size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title} Management</h3>
        <p className="text-gray-400 max-w-md">{description}</p>
        <button className="mt-6 liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all hover:scale-105">
            Configure {title}
        </button>
      </div>
    </div>
  );
}
