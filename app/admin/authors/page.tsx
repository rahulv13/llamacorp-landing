import { getAdminAuthors } from '@/lib/admin/authors';
import AuthorList from '@/components/admin/authors/AuthorList';

export const dynamic = 'force-dynamic';

export default async function AdminAuthorsPage() {
  const authors = await getAdminAuthors();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Authors</h1>
          <p className="text-sm text-white/60">
            Manage authors for your blog articles.
          </p>
        </div>
      </div>

      <AuthorList authors={authors} />
    </div>
  );
}
