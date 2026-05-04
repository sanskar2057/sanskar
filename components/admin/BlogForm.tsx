"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BlogStatus } from "@/types/blogs";

const CKEditorClient = dynamic(() => import("./CKEditorClient"), {
  ssr: false,
});

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  status: BlogStatus;
};

type BlogFormProps = {
  mode: "create" | "edit";
  initialValues: BlogFormValues;
  loading?: boolean;
  onSubmit: (values: BlogFormValues) => void | Promise<void>;
  onDelete?: () => void;
};

const generateSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function BlogForm({
  mode,
  initialValues,
  loading = false,
  onSubmit,
  onDelete,
}: BlogFormProps) {
  const [values, setValues] = useState<BlogFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const updateField = <K extends keyof BlogFormValues>(
    key: K,
    value: BlogFormValues[K]
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

    await onSubmit({
      ...values,
      slug: generateSlug(values.slug),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl glass-card rounded-2xl p-6 sm:p-8"
    >
      <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>

      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          {mode === "create" ? "Create Blog" : "Edit Blog"}
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
        <input
          value={values.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Blog title"
          required
          className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
        />

        <input
          value={values.slug}
          onChange={(e) => updateField("slug", generateSlug(e.target.value))}
          placeholder="blog-slug"
          required
          className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
        />

        <textarea
          value={values.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          placeholder="Short excerpt"
          required
          rows={3}
          className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
        />

        <CKEditorClient
          value={values.content}
          onChange={(content) => updateField("content", content)}
        />

        <input
          value={values.tags}
          onChange={(e) => updateField("tags", e.target.value)}
          placeholder="Tags separated by comma: React, Next.js, Firebase"
          className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
        />

        <select
          value={values.status}
          onChange={(e) =>
            updateField("status", e.target.value as BlogStatus)
          }
          className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

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
              ? "Create Blog"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}