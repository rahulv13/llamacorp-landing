import { constructMetadata } from '@/lib/metadata';
import BlogClient from './page.client';
import axios from 'axios';

export const metadata = constructMetadata({
  title: "Blog | Llamacorp",
  description: "Read our latest articles on web design, development, and digital experiences.",
  path: "/blog",
});

export default async function BlogIndex() {
  let initialBlogs = [];
  let initialCategories = ['All'];
  
  try {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const [blogsRes, catsRes] = await Promise.all([
      axios.get(`${apiUrl}/blogs`),
      axios.get(`${apiUrl}/categories`)
    ]);
    initialBlogs = blogsRes.data.data;
    const dynamicCats = catsRes.data.data.map((c: any) => c.name);
    initialCategories = ['All', ...dynamicCats];
  } catch (error) {
    console.error('Error fetching blog data on server:', error);
  }

  return <BlogClient initialBlogs={initialBlogs} initialCategories={initialCategories} />;
}
