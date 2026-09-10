import { Metadata } from 'next';
import AdminShell from '@/components/admin/layout/AdminShell';
import { getCurrentUser } from '@/lib/admin/auth';

export const metadata: Metadata = {
  title: 'LlamaCorp Admin',
  description: 'Admin dashboard for LlamaCorp',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  return <AdminShell userRole={user?.role}>{children}</AdminShell>;
}
