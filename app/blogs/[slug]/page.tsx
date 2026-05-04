// app/blogs/[slug]/page.tsx

import BlogDetailClient from "../BlogDetailClient";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  return <BlogDetailClient slug={params.slug} />;
}