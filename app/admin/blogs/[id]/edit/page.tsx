"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import BlogForm, { BlogFormValues } from "@/components/admin/BlogForm";
import { db } from "@/lib/firebase";
import AdminHeader from "@/components/admin/AdminHeader";

interface EditBlogPageProps {
    params: {
        id: string;
    };
}

const emptyValues: BlogFormValues = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    status: "draft",
};

export default function EditBlogPage({ params }: EditBlogPageProps) {
    const router = useRouter();

    const [initialValues, setInitialValues] = useState<BlogFormValues>(emptyValues);
    const [pageLoading, setPageLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const docRef = doc(db, "blogs", params.id);
                const snapshot = await getDoc(docRef);

                if (!snapshot.exists()) {
                    router.push("/admin/blogs");
                    return;
                }

                const data = snapshot.data();

                setInitialValues({
                    title: data.title || "",
                    slug: data.slug || "",
                    excerpt: data.excerpt || "",
                    content: data.content || "",
                    tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
                    status: data.status || "draft",
                });
            } finally {
                setPageLoading(false);
            }
        };

        fetchBlog();
    }, [params.id, router]);

    const handleUpdate = async (values: BlogFormValues) => {
        try {
            setSaving(true);

            const today = new Date().toISOString().split("T")[0];

            await updateDoc(doc(db, "blogs", params.id), {
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
                updatedAt: today,
            });

            router.push("/admin/blogs");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this blog?");

        if (!confirmed) return;

        await deleteDoc(doc(db, "blogs", params.id));
        router.push("/admin/blogs");
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
                <AdminHeader />
                {pageLoading ? (
                    <div className="mx-auto max-w-4xl glass-card rounded-2xl p-6">
                        Loading blog...
                    </div>
                ) : (
                    <BlogForm
                        mode="edit"
                        loading={saving}
                        initialValues={initialValues}
                        onSubmit={handleUpdate}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </ProtectedRoute>
    );
}