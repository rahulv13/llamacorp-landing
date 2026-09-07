import { constructMetadata } from '@/lib/metadata';
import BlogArticleClient from './page.client';
import axios from 'axios';
import { JsonLd } from '@/components/seo/JsonLd';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Await params per Next.js 15 requirements
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/blogs/${slug}`);
    const post = res.data.data;
    if (!post) {
      return constructMetadata({ title: "Post Not Found | Llamacorp" });
    }
    return constructMetadata({
      title: `${post.title} | Llamacorp Blog`,
      description: post.excerpt || `Read ${post.title} on the Llamacorp Blog.`,
      image: post.coverImage,
      path: `/blog/${slug}`,
      type: 'article',
    });
  } catch (error) {
    return constructMetadata({ title: "Blog | Llamacorp", path: "/blog" });
  }
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;
  
  let post = null;
  let relatedPosts = [];

  try {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const res = await axios.get(`${apiUrl}/blogs/${slug}`);
    post = res.data.data;
    
    // Fetch related posts (latest 3)
    const relatedRes = await axios.get(`${apiUrl}/blogs?limit=4`);
    relatedPosts = relatedRes.data.data.filter((p: any) => p._id !== post?._id).slice(0, 3);
  } catch (error) {
    console.error('Error fetching blog article on server:', error);
  }

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post?.title || 'Article', url: `${SITE_URL}/blog/${slug}` }
  ]);

  const articleSchema = post ? getArticleSchema({
    title: post.title,
    description: post.excerpt || post.title,
    url: `${SITE_URL}/blog/${slug}`,
    image: post.coverImage || `${SITE_URL}/og-image.jpg`,
    authorName: post.author?.name || 'Llamacorp Team',
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
  }) : null;

  return (
    <>
      <JsonLd schema={breadcrumbs} />
      {articleSchema && <JsonLd schema={articleSchema} />}
      <BlogArticleClient initialPost={post} initialRelatedPosts={relatedPosts} />
    </>
  );
}
