import { Metadata } from 'next';
import AdminShell from '@/components/admin/layout/AdminShell';

export const metadata: Metadata = {
  title: 'LlamaCorp Admin',
  description: 'Admin dashboard for LlamaCorp',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
