export const getPublicAuthors = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to fetch public authors:', error);
    return [];
  }
};

export const getPublicAuthorBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${slug}`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error(`Failed to fetch public author ${slug}:`, error);
    return null;
  }
};
