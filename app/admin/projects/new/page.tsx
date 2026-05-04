"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm, { ProjectFormValues } from "@/components/admin/ProjectForm";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function NewProjectPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (values: ProjectFormValues) => {
        try {
            setLoading(true);

            const today = new Date().toISOString().split("T")[0];

            await addDoc(collection(db, "projects"), {
                title: values.title,
                slug: values.slug,
                description: values.description,
                technologies: values.technologies.split(",").map((item) => item.trim()).filter(Boolean),
                highlights: values.highlights.split(",").map((item) => item.trim()).filter(Boolean),
                type: values.type,
                icon: values.icon,
                github: values.github,
                link: values.link,
                status: values.status,
                featured: values.featured,
                order: values.order,
                createdAt: today,
                updatedAt: today,
            });

            toast({
                title: "Project created",
                description: "Your project has been created successfully.",
            });

            router.push("/admin/projects");
        } catch (error) {
            console.error(error);

            toast({
                title: "Create failed",
                description: "Could not create project. Please check your permissions.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
                <div className="mx-auto max-w-6xl">
                    <AdminHeader />

                    <ProjectForm
                        mode="create"
                        loading={loading}
                        initialValues={{
                            title: "",
                            slug: "",
                            description: "",
                            technologies: "",
                            highlights: "",
                            type: "Professional Work",
                            icon: "BriefcaseBusiness",
                            github: "",
                            link: "",
                            status: "draft",
                            featured: false,
                            order: 1,
                        }}
                        onSubmit={handleCreate}
                    />
                </div>
            </main>
        </ProtectedRoute>
    );
}