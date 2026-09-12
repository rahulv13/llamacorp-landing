import { getAdminAuthor } from '@/lib/admin/authors';
import AuthorForm from '@/components/admin/authors/AuthorForm';
import { notFound } from 'next/navigation';

export default async function EditAuthorPage({ params }: { params: { id: string } }) {
  const author = await getAdminAuthor(params.id);

  if (!author) {
    notFound();
  }

  return (
    <div>
      <AuthorForm initialData={author} />
    </div>
  );
}
