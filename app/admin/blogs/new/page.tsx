"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import BlogForm, { BlogFormValues } from "@/components/admin/BlogForm";
import { db } from "@/lib/firebase";
import AdminHeader from "@/components/admin/AdminHeader";

export default function NewBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (values: BlogFormValues) => {
        try {
            setLoading(true);

            const today = new Date().toISOString().split("T")[0];

            await addDoc(collection(db, "blogs"), {
                title: values.title,
                slug: values.slug,
                excerpt: values.excerpt,
                content: values.content,
                tags: values.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                status: values.status,
                publishedAt: values.status === "published" ? today : "",
                createdAt: today,
                updatedAt: today,
            });

            router.push("/admin/blogs");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
                <AdminHeader />
                <BlogForm
                    mode="create"
                    loading={loading}
                    initialValues={{
                        title: "",
                        slug: "",
                        excerpt: "",
                        content: "",
                        tags: "",
                        status: "draft",
                    }}
                    onSubmit={handleCreate}
                />
            </main>
        </ProtectedRoute>
    );
}