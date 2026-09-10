import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface PublishSchedulerProps {
  publishedDate: string;
  setPublishedDate: (date: string) => void;
  status: string;
}

export default function PublishScheduler({ publishedDate, setPublishedDate, status }: PublishSchedulerProps) {
  if (status !== 'scheduled') {
    return null;
  }

  // Ensure datetime-local input gets the right format (YYYY-MM-DDTHH:MM)
  const formattedDate = publishedDate ? new Date(publishedDate).toISOString().slice(0, 16) : '';

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Save as ISO string
    if (e.target.value) {
      setPublishedDate(new Date(e.target.value).toISOString());
    } else {
      setPublishedDate('');
    }
  };

  return (
    <div className="mt-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-3">
      <h4 className="text-xs font-medium text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
        <Calendar size={14} /> Schedule Publication
      </h4>
      <p className="text-xs text-white/50 leading-relaxed">
        Select a future date and time to automatically publish this article. Note: Requires backend cron job support.
      </p>
      
      <div>
        <label htmlFor="publishedDate" className="sr-only">Publish Date & Time</label>
        <div className="relative">
          <input
            type="datetime-local"
            id="publishedDate"
            name="publishedDate"
            value={formattedDate}
            onChange={handleDateChange}
            className="w-full rounded-md border border-white/10 bg-black/50 py-2 pl-9 pr-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 [color-scheme:dark]"
          />
          <Clock size={16} className="absolute left-3 top-2.5 text-white/40" />
        </div>
      </div>
    </div>
  );
}
