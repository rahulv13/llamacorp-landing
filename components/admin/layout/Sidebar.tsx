'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  Image as ImageIcon, 
  Settings,
  Users,
  Activity
} from 'lucide-react';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Users', href: '/admin/users', icon: Users, roles: ['Admin'] },
  { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['Admin'] },
  { name: 'System Health', href: '/admin/health', icon: Activity, roles: ['Admin'] },
];

export default function Sidebar({ userRole = 'Author' }: { userRole?: string }) {
  const pathname = usePathname();

  // Filter navigation based on role
  const visibleNav = navigation.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(userRole);
  });

  return (
    <div className="flex h-full w-64 flex-col bg-[#0a0a0a] border-r border-white/10">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image src="/logo2.svg" alt="LlamaCorp Logo" width={24} height={24} className="filter brightness-0 invert" />
          <span className="font-semibold text-lg text-white tracking-tight">Admin</span>
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto pt-6 pb-4">
        <nav className="flex-1 space-y-1 px-4">
          {visibleNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
