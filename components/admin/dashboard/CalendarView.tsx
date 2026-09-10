import React from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CalendarViewProps {
  recentBlogs: any[];
}

export default function CalendarView({ recentBlogs }: CalendarViewProps) {
  // Mock calendar showing recent blogs as an agenda
  const scheduled = recentBlogs.filter(b => b.status === 'scheduled');
  const published = recentBlogs.filter(b => b.status === 'published');
  
  const agendaItems = [...scheduled, ...published].sort((a, b) => {
    const dateA = new Date(a.publishedDate || a.createdAt).getTime();
    const dateB = new Date(b.publishedDate || b.createdAt).getTime();
    return dateB - dateA;
  }).slice(0, 5);

  if (agendaItems.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-white/40">
        <CalendarIcon size={32} className="mb-2 opacity-50" />
        <p className="text-sm">No upcoming scheduled posts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {agendaItems.map((item) => {
        const date = new Date(item.publishedDate || item.createdAt);
        const isScheduled = item.status === 'scheduled';
        
        return (
          <Link key={item._id} href={`/admin/blogs/${item._id}/edit`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex flex-col items-center justify-center text-white">
              <span className="text-xs font-semibold uppercase text-blue-400">
                {date.toLocaleString('default', { month: 'short' })}
              </span>
              <span className="text-lg font-bold leading-none">
                {date.getDate()}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                {isScheduled ? (
                  <span className="flex items-center gap-1 text-xs text-blue-400">
                    <Clock size={12} /> Scheduled for {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle size={12} /> Published
                  </span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
