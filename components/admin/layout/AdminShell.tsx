'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import CommandPalette from '../dashboard/CommandPalette';

export default function AdminShell({ children, userRole }: { children: React.ReactNode, userRole?: string }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      <CommandPalette />
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <Sidebar userRole={userRole} />
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1 h-screen overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-[#050505]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
