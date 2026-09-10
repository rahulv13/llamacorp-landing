import React from 'react';
import { History, Clock, User, CheckCircle2 } from 'lucide-react';

interface RevisionHistoryProps {
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
}

export default function RevisionHistory({ createdAt, updatedAt, authorName }: RevisionHistoryProps) {
  if (!createdAt) return null;

  const created = new Date(createdAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  
  const updated = updatedAt ? new Date(updatedAt).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#111] p-6 space-y-4">
      <h3 className="text-sm font-medium text-white border-b border-white/10 pb-3 flex items-center gap-2">
        <History size={16} className="text-white/40" /> Revision History
      </h3>
      
      <div className="space-y-4">
        <div className="relative pl-4 border-l-2 border-white/10">
          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-white/20"></div>
          <p className="text-xs font-medium text-white/80 flex items-center gap-1.5 mb-0.5">
            <CheckCircle2 size={12} className="text-green-400" /> Created
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1.5 mb-0.5">
            <Clock size={12} /> {created}
          </p>
          {authorName && (
            <p className="text-xs text-white/40 flex items-center gap-1.5">
              <User size={12} /> By {authorName}
            </p>
          )}
        </div>

        {updated && updated !== created && (
          <div className="relative pl-4 border-l-2 border-blue-500/30">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="text-xs font-medium text-white/80 flex items-center gap-1.5 mb-0.5">
              Last Edited
            </p>
            <p className="text-xs text-white/40 flex items-center gap-1.5">
              <Clock size={12} /> {updated}
            </p>
          </div>
        )}
      </div>

      <button 
        type="button" 
        className="w-full mt-2 py-2 rounded-md border border-white/10 bg-white/5 text-xs font-medium text-white/60 hover:bg-white/10 transition-colors"
      >
        Compare Revisions
      </button>
    </div>
  );
}
