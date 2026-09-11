import { getAdminCategories } from '@/lib/admin/categories';
import CategoryClient from '@/components/admin/categories/CategoryClient';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Categories</h1>
          <p className="text-sm text-white/60">
            Manage your blog categories.
          </p>
        </div>
      </div>

      <CategoryClient categories={categories} />
    </div>
  );
}
