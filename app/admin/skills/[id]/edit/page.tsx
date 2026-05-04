"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import SkillForm, { SkillFormValues } from "@/components/admin/SkillForm";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface EditSkillPageProps {
    params: {
        id: string;
    };
}

const emptyValues: SkillFormValues = {
    title: "",
    icon: "",
    description: "",
    skills: "",
    order: 1,
};

export default function EditSkillPage({ params }: EditSkillPageProps) {
    const router = useRouter();
    const { toast } = useToast();

    const [initialValues, setInitialValues] =
        useState<SkillFormValues>(emptyValues);
    const [pageLoading, setPageLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const docRef = doc(db, "skills", params.id);
                const snapshot = await getDoc(docRef);

                if (!snapshot.exists()) {
                    toast({
                        title: "Skill not found",
                        description: "This skill does not exist.",
                        variant: "destructive",
                    });

                    router.push("/admin/skills");
                    return;
                }

                const data = snapshot.data();

                setInitialValues({
                    title: data.title || "",
                    icon: data.icon || "Layers",
                    description: data.description || "",
                    skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
                    order: Number(data.order || 1),
                });
            } catch (error) {
                console.error(error);

                toast({
                    title: "Load failed",
                    description: "Could not load skill. Please check your permissions.",
                    variant: "destructive",
                });

                router.push("/admin/skills");
            } finally {
                setPageLoading(false);
            }
        };

        fetchSkill();
    }, [params.id, router, toast]);

    const handleUpdate = async (values: SkillFormValues) => {
        try {
            setSaving(true);

            const today = new Date().toISOString().split("T")[0];

            await updateDoc(doc(db, "skills", params.id), {
                title: values.title,
                icon: values.icon,
                description: values.description,
                skills: values.skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
                order: values.order,
                updatedAt: today,
            });

            toast({
                title: "Skill updated",
                description: "Skill has been updated successfully.",
            });

            router.push("/admin/skills");
        } catch (error) {
            console.error(error);

            toast({
                title: "Update failed",
                description: "Could not update skill.",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm("Delete this skill?");
        if (!confirmed) return;

        try {
            await deleteDoc(doc(db, "skills", params.id));

            toast({
                title: "Skill deleted",
                description: "Skill has been deleted successfully.",
            });

            router.push("/admin/skills");
        } catch (error) {
            console.error(error);

            toast({
                title: "Delete failed",
                description: "Could not delete skill.",
                variant: "destructive",
            });
        }
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-portfolio text-white px-4 py-10">
                <div className="max-w-6xl mx-auto">
                    <AdminHeader />

                    {pageLoading ? (
                        <div className="mx-auto max-w-4xl glass-card rounded-2xl p-6">
                            Loading skill...
                        </div>
                    ) : (
                        <SkillForm
                            mode="edit"
                            loading={saving}
                            initialValues={initialValues}
                            onSubmit={handleUpdate}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </main>
        </ProtectedRoute>
    );
}