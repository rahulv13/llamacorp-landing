'use client';

import { LogOut, User } from 'lucide-react';
import { logoutAction } from '@/lib/admin/auth';
import { useTransition } from 'react';

export default function Header() {
  const [isPending, startTransition] = useTransition();

  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-x-6 border-b border-white/10 bg-[#0a0a0a] px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <div className="flex items-center gap-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60">
            <User className="h-5 w-5" />
          </div>
          
          <div className="h-6 w-px bg-white/10" aria-hidden="true" />
          
          <button
            onClick={() => startTransition(() => { logoutAction() })}
            disabled={isPending}
            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            {isPending ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>
    </header>
  );
}
