"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { Edit, Plus, Trash2 } from "lucide-react";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import { db } from "@/lib/firebase";
import { Project } from "@/types/projects";
import { useToast } from "@/hooks/use-toast";

export default function AdminProjectsPage() {
    return (
        <ProtectedRoute>
            <AdminProjectsContent />
        </ProtectedRoute>
    );
}

function AdminProjectsContent() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);

            const projectsQuery = query(
                collection(db, "projects"),
                orderBy("order", "asc")
            );

            const snapshot = await getDocs(projectsQuery);

            const data = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            })) as Project[];

            setProjects(data);
        } catch (error) {
            console.error(error);

            toast({
                title: "Permission denied",
                description:
                    "You do not have permission to load projects. Please check Firestore rules.",
                variant: "destructive",
            });

            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, [toast]);
    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;

        try {
            await deleteDoc(doc(db, "projects", id));

            toast({
                title: "Project deleted",
                description: "The project has been deleted successfully.",
            });

            await fetchProjects();
        } catch (error) {
            console.error(error);

            toast({
                title: "Delete failed",
                description:
                    "You do not have permission to delete this project.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
            <div className="mx-auto max-w-6xl">
                <AdminHeader />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>
                            <h1 className="text-3xl sm:text-4xl font-bold">Projects</h1>
                        </div>

                        <Link
                            href="/admin/projects/new"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C778DD] px-5 py-3 font-semibold hover:bg-[#b968cc] transition"
                        >
                            <Plus className="w-4 h-4" />
                            New Project
                        </Link>
                    </div>

                    {loading ? (
                        <div className="glass-card rounded-2xl p-6">
                            Loading projects...
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="glass-card rounded-2xl p-8 text-center">
                            <h2 className="text-xl font-semibold mb-2">No projects found</h2>
                            <p className="text-[#ABB2BF] mb-5">
                                Start by creating your first portfolio project.
                            </p>

                            <Link
                                href="/admin/projects/new"
                                className="inline-flex rounded-xl bg-[#C778DD] px-5 py-3 font-semibold"
                            >
                                Create Project
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h2 className="text-xl font-bold">{project.title}</h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs border ${project.status === "published"
                                                    ? "bg-green-500/10 text-green-300 border-green-500/20"
                                                    : "bg-yellow-500/10 text-yellow-300 border-yellow-500/20"
                                                    }`}
                                            >
                                                {project.status}
                                            </span>

                                            {project.featured && (
                                                <span className="rounded-full px-3 py-1 text-xs border bg-[#C778DD]/10 text-[#E0B7FF] border-[#C778DD]/20">
                                                    featured
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[#ABB2BF] text-sm mb-2">
                                            Order: {project.order} · /projects/{project.slug}
                                        </p>

                                        <p className="text-[#ABB2BF] text-sm line-clamp-2">
                                            {project.type} · {project.technologies?.slice(0, 4).join(", ")}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                        <Link
                                            href={`/admin/projects/${project.id}/edit`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:border-[#C778DD]/70 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(project.id)}
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
