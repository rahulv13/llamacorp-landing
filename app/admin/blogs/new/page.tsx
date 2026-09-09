import BlogForm from '@/components/admin/blogs/BlogForm';
import { getAdminCategories } from '@/lib/admin/categories';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage() {
  const categories = await getAdminCategories();

  return (
    <div className="pb-12">
      <BlogForm categories={categories} />
    </div>
  );
}
