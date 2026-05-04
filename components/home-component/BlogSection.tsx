"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Calendar, Tags } from "lucide-react";
import { Blog } from "@/types/blogs";
import { getPublishedBlogs } from "@/lib/blogs";

export default function BlogSection() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getPublishedBlogs();
                setBlogs(data);
            } catch {
                setBlogs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <p className="text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] whitespace-nowrap">
                    <span className="text-[#C778DD]">#</span>blogs
                </p>

                <hr className="h-[3px] sm:h-[4px] bg-[#C778DD] border-0 w-full sm:flex-1 sm:mr-8 md:mr-16 lg:mr-32 sm:ml-4 md:ml-6 lg:ml-8 rounded-full" />
            </div>

            <div className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 mb-8 relative overflow-hidden">
                <div className="orbit-wheel w-44 h-44 right-[-80px] top-[-80px] opacity-50" />

                <div className="relative z-10 max-w-3xl">
                    <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center mb-5">
                        <BookOpen className="w-5 h-5 text-[#C778DD]" />
                    </div>

                    <p className="text-[#C778DD] text-sm mb-3">Technical writing</p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                        Notes, lessons, and engineering thoughts from real project work.
                    </h2>

                    <p className="text-[#ABB2BF] text-sm sm:text-base leading-relaxed">
                        I write about frontend architecture, reusable UI systems, API
                        integrations, dashboards, workflow systems, and lessons from building
                        production web applications.
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-56 rounded-2xl bg-[#2D323B]/80 border border-white/10 animate-pulse"
                        />
                    ))}
                </div>
            ) : blogs.length === 0 ? (
                <div className="bg-[#2D323B]/80 border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-white font-semibold">No blogs published yet.</p>
                    <p className="text-[#ABB2BF] text-sm mt-2">
                        Articles will appear here once published from the CMS.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                    {blogs.slice(0, 3).map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blogs/${blog.slug}`}
                            className="card-glow group bg-[#2D323B]/80 border border-white/10 hover:border-[#C778DD]/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                                e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                            }}
                        >
                            <div className="flex items-start justify-between gap-4 mb-5">
                                <span className="text-xs text-[#C778DD] bg-[#C778DD]/10 border border-[#C778DD]/20 px-3 py-1 rounded-full">
                                    Blog
                                </span>

                                <ArrowUpRight className="w-5 h-5 text-[#C778DD] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>

                            <h3 className="text-white text-lg sm:text-xl font-bold mb-3 group-hover:text-[#E0B7FF] transition-colors">
                                {blog.title}
                            </h3>

                            <p className="text-[#ABB2BF] text-sm leading-relaxed mb-5">
                                {blog.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-[#ABB2BF] text-xs">
                                {blog.publishedAt && (
                                    <span className="inline-flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-[#C778DD]" />
                                        {blog.publishedAt}
                                    </span>
                                )}

                                {blog.tags?.length > 0 && (
                                    <span className="inline-flex items-center gap-1">
                                        <Tags className="w-3.5 h-3.5 text-[#C778DD]" />
                                        {blog.tags.slice(0, 2).join(", ")}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}