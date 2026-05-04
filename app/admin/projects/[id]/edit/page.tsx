"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import ProjectForm, { ProjectFormValues } from "@/components/admin/ProjectForm";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

const emptyValues: ProjectFormValues = {
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
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [initialValues, setInitialValues] =
    useState<ProjectFormValues>(emptyValues);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", params.id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          toast({
            title: "Project not found",
            description: "This project does not exist.",
            variant: "destructive",
          });
          router.push("/admin/projects");
          return;
        }

        const data = snapshot.data();

        setInitialValues({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          technologies: Array.isArray(data.technologies)
            ? data.technologies.join(", ")
            : "",
          highlights: Array.isArray(data.highlights)
            ? data.highlights.join(", ")
            : "",
          type: data.type || "Professional Work",
          icon: data.icon || "BriefcaseBusiness",
          github: data.github || "",
          link: data.link || "",
          status: data.status || "draft",
          featured: Boolean(data.featured),
          order: Number(data.order || 1),
        });
      } catch (error) {
        console.error(error);

        toast({
          title: "Load failed",
          description: "Could not load project. Please check your permissions.",
          variant: "destructive",
        });

        router.push("/admin/projects");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProject();
  }, [params.id, router, toast]);

  const handleUpdate = async (values: ProjectFormValues) => {
    try {
      setSaving(true);

      const today = new Date().toISOString().split("T")[0];

      await updateDoc(doc(db, "projects", params.id), {
        title: values.title,
        slug: values.slug,
        description: values.description,
        technologies: values.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        highlights: values.highlights
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        type: values.type,
        icon: values.icon,
        github: values.github,
        link: values.link,
        status: values.status,
        featured: values.featured,
        order: values.order,
        updatedAt: today,
      });

      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });

      router.push("/admin/projects");
    } catch (error) {
      console.error(error);

      toast({
        title: "Update failed",
        description: "Could not update project. Please check your permissions.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "projects", params.id));

      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully.",
      });

      router.push("/admin/projects");
    } catch (error) {
      console.error(error);

      toast({
        title: "Delete failed",
        description: "Could not delete project. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-6xl">
          <AdminHeader />

          {pageLoading ? (
            <div className="mx-auto max-w-4xl glass-card rounded-2xl p-6">
              Loading project...
            </div>
          ) : (
            <ProjectForm
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