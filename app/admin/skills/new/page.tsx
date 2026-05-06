"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import SkillForm, { SkillFormValues } from "@/components/admin/SkillForm";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function NewSkillPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (values: SkillFormValues) => {
        try {
            setLoading(true);

            const today = new Date().toISOString().split("T")[0];

            await addDoc(collection(db, "skills"), {
                title: values.title,
                icon: values.icon,
                description: values.description,
                skills: values.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                order: values.order,
                createdAt: today,
                updatedAt: today,
            });

            toast({
                title: "Skill created",
                description: "Skill has been added successfully.",
            });

            router.push("/admin/skills");
        } catch {
            toast({
                title: "Create failed",
                description: "Could not create skill.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-portfolio text-white px-4 py-10">
                <div className="max-w-6xl mx-auto">
                    <AdminHeader />

                    <SkillForm
                        mode="create"
                        loading={loading}
                        initialValues={{
                            title: "",
                            icon: "Layers",
                            description: "",
                            skills: "",
                            order: 1,
                        }}
                        onSubmit={handleCreate}
                    />
                </div>
            </main>
        </ProtectedRoute>
    );
}