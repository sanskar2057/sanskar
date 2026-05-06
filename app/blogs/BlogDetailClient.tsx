"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tags } from "lucide-react";
import { getBlogBySlug } from "@/lib/blogs";
import { Blog } from "@/types/blogs";

export default function BlogDetailClient({ slug }: { slug: string }) {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBlogBySlug(slug)
            .then(setBlog)
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <main className="min-h-screen bg-portfolio text-white p-10">Loading...</main>;
    }

    if (!blog) {
        return <main className="min-h-screen bg-portfolio text-white p-10">Blog not found</main>;
    }

    return (
        <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
            <article className="max-w-3xl mx-auto pt-10">
                <Link href="/#blogs" className="inline-flex items-center gap-2 text-[#C778DD] mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to blogs
                </Link>

                <div className="glass-card rounded-2xl p-5 sm:p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-4 text-[#ABB2BF] text-sm mb-5">
                        {blog.publishedAt && (
                            <span className="inline-flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#C778DD]" />
                                {blog.publishedAt}
                            </span>
                        )}

                        {blog.tags?.length > 0 && (
                            <span className="inline-flex items-center gap-2">
                                <Tags className="w-4 h-4 text-[#C778DD]" />
                                {blog.tags.join(", ")}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                        {blog.title}
                    </h1>

                    <p className="text-[#ABB2BF] text-base sm:text-lg leading-relaxed mb-8">
                        {blog.excerpt}
                    </p>

                    <div className="border-t border-white/10 pt-8">
                        <div
                            className="prose prose-invert max-w-none
      prose-p:text-[#ABB2BF]
      prose-headings:text-white
      prose-a:text-[#C778DD]
      prose-strong:text-white
      prose-li:text-[#ABB2BF]
      prose-blockquote:border-[#C778DD]
      prose-blockquote:text-[#ABB2BF]"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                </div>
            </article>
        </main>
    );
}