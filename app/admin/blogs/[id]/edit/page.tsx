import BlogForm from '@/components/admin/blogs/BlogForm';
import { getAdminBlog } from '@/lib/admin/blogs';
import { getAdminCategories } from '@/lib/admin/categories';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [blog, categories] = await Promise.all([
    getAdminBlog(id),
    getAdminCategories()
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div className="pb-12">
      <BlogForm initialData={blog} categories={categories} />
    </div>
  );
}
