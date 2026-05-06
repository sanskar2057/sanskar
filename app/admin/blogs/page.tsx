"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { Edit, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blogs";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { useToast } from "@/hooks/use-toast";

export default function AdminBlogsPage() {
    return (
        <ProtectedRoute>
            <AdminBlogsContent />
        </ProtectedRoute>
    );
}

function AdminBlogsContent() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);

            const blogsQuery = query(
                collection(db, "blogs"),
                orderBy("createdAt", "desc")
            );

            const snapshot = await getDocs(blogsQuery);

            const data = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            })) as Blog[];

            setBlogs(data);
        } catch (error) {
            console.error(error);

            toast({
                title: "Load failed",
                description: "Could not load blogs. Please check your Firestore permissions.",
                variant: "destructive",
            });

            setBlogs([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this blog?");

        if (!confirmed) return;

        try {
            await deleteDoc(doc(db, "blogs", id));
            await fetchBlogs();
        } catch (error) {
            console.error(error);

            toast({
                title: "Delete failed",
                description: "Could not delete this blog. Please check your permissions.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (
        <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
            <div className="mx-auto max-w-6xl">
                <AdminHeader />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>
                            <h1 className="text-3xl sm:text-4xl font-bold">Blogs</h1>
                        </div>

                        <Link
                            href="/admin/blogs/new"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C778DD] px-5 py-3 font-semibold hover:bg-[#b968cc] transition"
                        >
                            <Plus className="w-4 h-4" />
                            New Blog
                        </Link>
                    </div>

                    {loading ? (
                        <div className="glass-card rounded-2xl p-6">Loading blogs...</div>
                    ) : blogs.length === 0 ? (
                        <div className="glass-card rounded-2xl p-8 text-center">
                            <h2 className="text-xl font-semibold mb-2">No blogs found</h2>
                            <p className="text-[#ABB2BF] mb-5">
                                Start by creating your first blog post.
                            </p>

                            <Link
                                href="/admin/blogs/new"
                                className="inline-flex rounded-xl bg-[#C778DD] px-5 py-3 font-semibold"
                            >
                                Create Blog
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h2 className="text-xl font-bold">{blog.title}</h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs border ${blog.status === "published"
                                                        ? "bg-green-500/10 text-green-300 border-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                                                    }`}
                                            >
                                                {blog.status}
                                            </span>
                                        </div>

                                        <p className="text-[#ABB2BF] text-sm mb-2">
                                            /blogs/{blog.slug}
                                        </p>

                                        <p className="text-[#ABB2BF] text-sm line-clamp-2">
                                            {blog.excerpt}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <Link
                                            href={`/admin/blogs/${blog.id}/edit`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:border-[#C778DD]/70 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 text-red-300 px-4 py-2 hover:bg-red-500/10 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
    );
}
