"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import ProtectedRoute from "@/app/admin/ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";
import CKEditorClient from "@/components/admin/CKEditorClient";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { QuickFact, WorkExperience } from "@/types/about";

type WorkExperienceFormValues = {
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  details: string;
  order: number;
};

type QuickFactFormValues = {
  label: string;
  value: string;
  icon: string;
  order: number;
};

const emptyExperience: WorkExperienceFormValues = {
  company: "",
  location: "",
  role: "",
  startDate: "",
  endDate: "",
  isPresent: false,
  details: "",
  order: 1,
};

const emptyFact: QuickFactFormValues = {
  label: "",
  value: "",
  icon: "Sparkles",
  order: 1,
};

const inputClass =
  "w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-[#ABB2BF]/70 outline-none focus:border-[#C778DD] focus:bg-white/[0.13] transition disabled:opacity-60 disabled:cursor-not-allowed";

const labelClass = "block text-sm text-[#ABB2BF] mb-2";

export default function AdminAboutPage() {
  const { toast } = useToast();

  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [facts, setFacts] = useState<QuickFact[]>([]);

  const [experienceValues, setExperienceValues] =
    useState<WorkExperienceFormValues>(emptyExperience);
  const [factValues, setFactValues] = useState<QuickFactFormValues>(emptyFact);

  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(
    null
  );
  const [selectedFactId, setSelectedFactId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [savingExperience, setSavingExperience] = useState(false);
  const [savingFact, setSavingFact] = useState(false);

  const fetchAboutData = async () => {
    try {
      setLoading(true);

      const experienceQuery = query(
        collection(db, "workExperiences"),
        orderBy("order", "asc")
      );

      const factsQuery = query(
        collection(db, "quickFacts"),
        orderBy("order", "asc")
      );

      const [experienceSnapshot, factsSnapshot] = await Promise.all([
        getDocs(experienceQuery),
        getDocs(factsQuery),
      ]);

      setExperiences(
        experienceSnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as WorkExperience[]
      );

      setFacts(
        factsSnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as QuickFact[]
      );
    } catch (error) {
      console.error(error);

      toast({
        title: "Load failed",
        description: "Could not load about data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  const resetExperienceForm = () => {
    setSelectedExperienceId(null);
    setExperienceValues(emptyExperience);
  };

  const resetFactForm = () => {
    setSelectedFactId(null);
    setFactValues(emptyFact);
  };

  const selectExperience = (experience: WorkExperience) => {
    setSelectedExperienceId(experience.id);
    setExperienceValues({
      company: experience.company || "",
      location: experience.location || "",
      role: experience.role || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      isPresent: Boolean(experience.isPresent),
      details: experience.details || "",
      order: Number(experience.order || 1),
    });
  };

  const selectFact = (fact: QuickFact) => {
    setSelectedFactId(fact.id);
    setFactValues({
      label: fact.label || "",
      value: fact.value || "",
      icon: fact.icon || "Sparkles",
      order: Number(fact.order || 1),
    });
  };

  const submitExperience = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSavingExperience(true);

      const today = new Date().toISOString().split("T")[0];

      const payload = {
        ...experienceValues,
        endDate: experienceValues.isPresent ? "" : experienceValues.endDate,
        updatedAt: today,
      };

      if (selectedExperienceId) {
        await updateDoc(doc(db, "workExperiences", selectedExperienceId), payload);

        toast({
          title: "Experience updated",
          description: "Work experience has been updated successfully.",
        });
      } else {
        await addDoc(collection(db, "workExperiences"), {
          ...payload,
          createdAt: today,
        });

        toast({
          title: "Experience added",
          description: "Work experience has been added successfully.",
        });
      }

      resetExperienceForm();
      await fetchAboutData();
    } catch (error) {
      console.error(error);

      toast({
        title: selectedExperienceId ? "Update failed" : "Create failed",
        description: "Could not save work experience.",
        variant: "destructive",
      });
    } finally {
      setSavingExperience(false);
    }
  };

  const deleteExperience = async () => {
    if (!selectedExperienceId) return;
    if (!confirm("Delete this work experience?")) return;

    try {
      await deleteDoc(doc(db, "workExperiences", selectedExperienceId));

      toast({
        title: "Experience deleted",
        description: "Work experience has been deleted successfully.",
      });

      resetExperienceForm();
      await fetchAboutData();
    } catch (error) {
      console.error(error);

      toast({
        title: "Delete failed",
        description: "Could not delete work experience.",
        variant: "destructive",
      });
    }
  };

  const submitFact = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSavingFact(true);

      const today = new Date().toISOString().split("T")[0];

      const payload = {
        ...factValues,
        updatedAt: today,
      };

      if (selectedFactId) {
        await updateDoc(doc(db, "quickFacts", selectedFactId), payload);

        toast({
          title: "Quick fact updated",
          description: "Quick fact has been updated successfully.",
        });
      } else {
        await addDoc(collection(db, "quickFacts"), {
          ...payload,
          createdAt: today,
        });

        toast({
          title: "Quick fact added",
          description: "Quick fact has been added successfully.",
        });
      }

      resetFactForm();
      await fetchAboutData();
    } catch (error) {
      console.error(error);

      toast({
        title: selectedFactId ? "Update failed" : "Create failed",
        description: "Could not save quick fact.",
        variant: "destructive",
      });
    } finally {
      setSavingFact(false);
    }
  };

  const deleteFact = async () => {
    if (!selectedFactId) return;
    if (!confirm("Delete this quick fact?")) return;

    try {
      await deleteDoc(doc(db, "quickFacts", selectedFactId));

      toast({
        title: "Quick fact deleted",
        description: "Quick fact has been deleted successfully.",
      });

      resetFactForm();
      await fetchAboutData();
    } catch (error) {
      console.error(error);

      toast({
        title: "Delete failed",
        description: "Could not delete quick fact.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-portfolio text-white px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <AdminHeader />

          <div className="mb-8">
            <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>
            <h1 className="text-3xl font-bold">About Section</h1>
          </div>

          {loading ? (
            <div className="glass-card rounded-2xl p-6">
              Loading about data...
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="space-y-6">
                <form
                  onSubmit={submitExperience}
                  className="glass-card rounded-2xl p-5 sm:p-6 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-[#C778DD] text-sm mb-2">
                        Work Experience
                      </p>
                      <h2 className="text-2xl font-bold">
                        {selectedExperienceId
                          ? "Edit Experience"
                          : "Add Experience"}
                      </h2>
                    </div>

                    {selectedExperienceId && (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={resetExperienceForm}
                          className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={deleteExperience}
                          className="rounded-xl border border-red-500/30 text-red-300 px-4 py-2 text-sm hover:bg-red-500/10 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Role</label>
                    <input
                      value={experienceValues.role}
                      onChange={(e) =>
                        setExperienceValues((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      placeholder="Full Stack Developer"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      value={experienceValues.company}
                      onChange={(e) =>
                        setExperienceValues((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      placeholder="Arclogi Pvt. Ltd."
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      value={experienceValues.location}
                      onChange={(e) =>
                        setExperienceValues((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="Kathmandu, Nepal"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Start Date</label>
                      <input
                        type="date"
                        value={experienceValues.startDate}
                        onChange={(e) =>
                          setExperienceValues((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                        required
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>End Date</label>
                      <input
                        type="date"
                        value={experienceValues.endDate}
                        disabled={experienceValues.isPresent}
                        onChange={(e) =>
                          setExperienceValues((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 text-sm text-[#ABB2BF]">
                    <input
                      type="checkbox"
                      checked={experienceValues.isPresent}
                      onChange={(e) =>
                        setExperienceValues((prev) => ({
                          ...prev,
                          isPresent: e.target.checked,
                          endDate: e.target.checked ? "" : prev.endDate,
                        }))
                      }
                      className="h-4 w-4 accent-[#C778DD]"
                    />
                    Currently working here
                  </label>

                  <div>
                    <label className={labelClass}>Details</label>
                    <CKEditorClient
                      value={experienceValues.details}
                      onChange={(details) =>
                        setExperienceValues((prev) => ({
                          ...prev,
                          details,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Display Order</label>
                    <input
                      type="number"
                      value={experienceValues.order}
                      onChange={(e) =>
                        setExperienceValues((prev) => ({
                          ...prev,
                          order: Number(e.target.value),
                        }))
                      }
                      required
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={savingExperience}
                    className="rounded-xl bg-[#C778DD] px-6 py-3 font-semibold hover:bg-[#b968cc] transition disabled:opacity-60"
                  >
                    {savingExperience
                      ? "Saving..."
                      : selectedExperienceId
                        ? "Update Experience"
                        : "Add Experience"}
                  </button>
                </form>

                <div className="glass-card rounded-2xl p-5">
                  <h2 className="text-xl font-bold mb-4">Work Experiences</h2>

                  <div className="space-y-3">
                    {experiences.length === 0 ? (
                      <p className="text-[#ABB2BF] text-sm">
                        No work experiences added yet.
                      </p>
                    ) : (
                      experiences.map((experience) => (
                        <button
                          key={experience.id}
                          type="button"
                          onClick={() => selectExperience(experience)}
                          className={`w-full text-left rounded-xl border p-4 transition ${
                            selectedExperienceId === experience.id
                              ? "border-[#C778DD]/70 bg-[#C778DD]/10"
                              : "border-white/10 bg-white/5 hover:border-[#C778DD]/70"
                          }`}
                        >
                          <p className="font-semibold">{experience.role}</p>
                          <p className="text-sm text-[#ABB2BF] mt-1">
                            {experience.company} · Order {experience.order}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <form
                  onSubmit={submitFact}
                  className="glass-card rounded-2xl p-5 sm:p-6 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-[#C778DD] text-sm mb-2">
                        Quick Fact
                      </p>
                      <h2 className="text-2xl font-bold">
                        {selectedFactId ? "Edit Quick Fact" : "Add Quick Fact"}
                      </h2>
                    </div>

                    {selectedFactId && (
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={resetFactForm}
                          className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={deleteFact}
                          className="rounded-xl border border-red-500/30 text-red-300 px-4 py-2 text-sm hover:bg-red-500/10 transition"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Label</label>
                    <input
                      value={factValues.label}
                      onChange={(e) =>
                        setFactValues((prev) => ({
                          ...prev,
                          label: e.target.value,
                        }))
                      }
                      placeholder="Location"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Value</label>
                    <input
                      value={factValues.value}
                      onChange={(e) =>
                        setFactValues((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      placeholder="Kathmandu, Nepal"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Icon</label>
                    <select
                      value={factValues.icon}
                      onChange={(e) =>
                        setFactValues((prev) => ({
                          ...prev,
                          icon: e.target.value,
                        }))
                      }
                      className={inputClass}
                    >
                      <option value="MapPin">MapPin</option>
                      <option value="GraduationCap">GraduationCap</option>
                      <option value="Sparkles">Sparkles</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Display Order</label>
                    <input
                      type="number"
                      value={factValues.order}
                      onChange={(e) =>
                        setFactValues((prev) => ({
                          ...prev,
                          order: Number(e.target.value),
                        }))
                      }
                      required
                      className={inputClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={savingFact}
                    className="rounded-xl bg-[#C778DD] px-6 py-3 font-semibold hover:bg-[#b968cc] transition disabled:opacity-60"
                  >
                    {savingFact
                      ? "Saving..."
                      : selectedFactId
                        ? "Update Quick Fact"
                        : "Add Quick Fact"}
                  </button>
                </form>

                <div className="glass-card rounded-2xl p-5">
                  <h2 className="text-xl font-bold mb-4">Quick Facts</h2>

                  <div className="space-y-3">
                    {facts.length === 0 ? (
                      <p className="text-[#ABB2BF] text-sm">
                        No quick facts added yet.
                      </p>
                    ) : (
                      facts.map((fact) => (
                        <button
                          key={fact.id}
                          type="button"
                          onClick={() => selectFact(fact)}
                          className={`w-full text-left rounded-xl border p-4 transition ${
                            selectedFactId === fact.id
                              ? "border-[#C778DD]/70 bg-[#C778DD]/10"
                              : "border-white/10 bg-white/5 hover:border-[#C778DD]/70"
                          }`}
                        >
                          <p className="font-semibold">{fact.label}</p>
                          <p className="text-sm text-[#ABB2BF] mt-1">
                            {fact.value} · {fact.icon} · Order {fact.order}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}