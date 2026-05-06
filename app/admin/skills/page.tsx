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
import { useToast } from "@/hooks/use-toast";
import { SkillGroup } from "@/types/skills";

export default function AdminSkillsPage() {
  return (
    <ProtectedRoute>
      <AdminSkillsContent />
    </ProtectedRoute>
  );
}

function AdminSkillsContent() {
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);

      const q = query(collection(db, "skills"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as SkillGroup[];

      setSkills(data);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to load skill groups.",
        variant: "destructive",
      });

      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill group?")) return;

    try {
      await deleteDoc(doc(db, "skills", id));

      toast({
        title: "Skill group deleted",
        description: "The skill group has been deleted successfully.",
      });

      await fetchSkills();
    } catch (error) {
      console.error(error);

      toast({
        title: "Delete failed",
        description: "Could not delete this skill group.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <main className="min-h-screen bg-portfolio text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <AdminHeader />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>
              <h1 className="text-3xl font-bold">Skill Groups</h1>
            </div>

            <Link
              href="/admin/skills/new"
              className="inline-flex items-center justify-center gap-2 bg-[#C778DD] px-5 py-3 rounded-xl font-semibold hover:bg-[#b968cc] transition"
            >
              <Plus className="w-4 h-4" />
              Add Skill Group
            </Link>
          </div>

          {loading ? (
            <div className="glass-card rounded-2xl p-6">
              Loading skill groups...
            </div>
          ) : skills.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">
                No skill groups found
              </h2>
              <p className="text-[#ABB2BF] mb-5">
                Start by creating your first skill group.
              </p>

              <Link
                href="/admin/skills/new"
                className="inline-flex rounded-xl bg-[#C778DD] px-5 py-3 font-semibold"
              >
                Create Skill Group
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="glass-card p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold">{skill.title}</h2>

                      <span className="rounded-full px-3 py-1 text-xs border bg-[#C778DD]/10 text-[#E0B7FF] border-[#C778DD]/20">
                        {skill.icon}
                      </span>

                      <span className="rounded-full px-3 py-1 text-xs border border-white/10 text-[#ABB2BF]">
                        Order: {skill.order}
                      </span>
                    </div>

                    <p className="text-[#ABB2BF] text-sm mb-3">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skill.skills?.map((item) => (
                        <span
                          key={item}
                          className="text-[#C778DD] text-xs bg-[#C778DD]/10 px-2 py-1 rounded-md border border-[#C778DD]/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:border-[#C778DD]/70 transition"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(skill.id)}
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
