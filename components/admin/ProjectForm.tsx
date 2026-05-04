"use client";

import { useEffect, useState } from "react";
import { ProjectStatus } from "@/types/projects";

export type ProjectFormValues = {
  title: string;
  slug: string;
  description: string;
  technologies: string;
  highlights: string;
  type: string;
  icon: string;
  github: string;
  link: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
};

type ProjectFormProps = {
  mode: "create" | "edit";
  initialValues: ProjectFormValues;
  loading?: boolean;
  onSubmit: (values: ProjectFormValues) => void | Promise<void>;
  onDelete?: () => void;
};

const inputClass =
  "w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-[#ABB2BF]/70 outline-none focus:border-[#C778DD] focus:bg-white/[0.13] transition";

const labelClass = "block text-sm text-[#ABB2BF] mb-2";

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function ProjectForm({
  mode,
  initialValues,
  loading = false,
  onSubmit,
  onDelete,
}: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const updateField = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    setValues((prev) => ({
      ...prev,
      title,
      slug: mode === "create" ? generateSlug(title) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...values, slug: generateSlug(values.slug) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl glass-card rounded-2xl p-6 sm:p-8"
    >
      <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>

      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "Create Project" : "Edit Project"}
        </h1>

        {mode === "edit" && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-xl border border-red-500/30 text-red-300 px-4 py-2 hover:bg-red-500/10 transition"
          >
            Delete
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Title</label>
          <input
            value={values.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Employee Management System"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            value={values.slug}
            onChange={(e) => updateField("slug", generateSlug(e.target.value))}
            placeholder="employee-management-system"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Project description"
            required
            rows={5}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Technologies</label>
          <input
            value={values.technologies}
            onChange={(e) => updateField("technologies", e.target.value)}
            placeholder="React, TypeScript, Chakra UI"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Highlights</label>
          <input
            value={values.highlights}
            onChange={(e) => updateField("highlights", e.target.value)}
            placeholder="Reusable UI system, Role permissions, Analytics"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Project Type</label>
          <input
            value={values.type}
            onChange={(e) => updateField("type", e.target.value)}
            placeholder="Professional Work"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Icon</label>
          <select
            value={values.icon}
            onChange={(e) => updateField("icon", e.target.value)}
            className={inputClass}
          >
            <option value="BriefcaseBusiness">BriefcaseBusiness</option>
            <option value="Layers">Layers</option>
            <option value="Database">Database</option>
            <option value="Code2">Code2</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>GitHub URL</label>
          <input
            value={values.github}
            onChange={(e) => updateField("github", e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Live URL</label>
          <input
            value={values.link}
            onChange={(e) => updateField("link", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input
            type="number"
            value={values.order}
            onChange={(e) => updateField("order", Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <select
            value={values.status}
            onChange={(e) =>
              updateField("status", e.target.value as ProjectStatus)
            }
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <label className="flex items-center gap-3 text-[#ABB2BF]">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="h-4 w-4 accent-[#C778DD]"
          />
          Featured project
        </label>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#C778DD] px-6 py-3 font-semibold hover:bg-[#b968cc] transition disabled:opacity-60"
        >
          {loading
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Project"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}