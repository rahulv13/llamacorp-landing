'use client';

import { usePathname } from 'next/navigation';
import MagneticTopNavbar from './MagneticTopNavbar';

export function PublicNavbar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  
  return <MagneticTopNavbar />;
}

export function PublicFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  
  return <>{children}</>;
}
