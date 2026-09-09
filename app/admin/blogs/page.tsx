import { getAdminBlogs } from '@/lib/admin/blogs';
import BlogTable from '@/components/admin/blogs/BlogTable';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Blogs</h1>
          <p className="text-sm text-white/60">
            Manage your blog articles, categories, and tags.
          </p>
        </div>
      </div>

      <BlogTable blogs={blogs} />
    </div>
  );
}
