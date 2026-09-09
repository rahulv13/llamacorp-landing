import { Clock, CheckCircle } from 'lucide-react';

export default function StatusBadge({ status }: { status: string }) {
  if (status === 'published') {
    return (
      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="h-3 w-3" />
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-full bg-white/5 px-2 py-1 text-xs font-medium text-white/60 border border-white/10">
      <Clock className="h-3 w-3" />
      Draft
    </span>
  );
}
