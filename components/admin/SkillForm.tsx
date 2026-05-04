"use client";

import { useEffect, useState } from "react";

export type SkillFormValues = {
    title: string;
    icon: string;
    description: string;
    skills: string;
    order: number;
};

type SkillFormProps = {
    mode: "create" | "edit";
    initialValues: SkillFormValues;
    loading?: boolean;
    onSubmit: (values: SkillFormValues) => void | Promise<void>;
    onDelete?: () => void;
};

export default function SkillForm({
    mode,
    initialValues,
    loading = false,
    onSubmit,
    onDelete,
}: SkillFormProps) {
    const [values, setValues] = useState<SkillFormValues>(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const updateField = <K extends keyof SkillFormValues>(
        key: K,
        value: SkillFormValues[K]
    ) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(values);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl glass-card rounded-2xl p-6 sm:p-8"
        >
            <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                    <p className="text-[#C778DD] text-sm mb-2">Admin CMS</p>
                    <h1 className="text-3xl font-bold">
                        {mode === "create" ? "Create Skill" : "Edit Skill"}
                    </h1>
                </div>

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
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Group title e.g. Frontend"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
                />

                <input
                    value={values.icon}
                    onChange={(e) => updateField("icon", e.target.value)}
                    placeholder="Icon name e.g. Layers, Server, Database"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
                />

                <textarea
                    value={values.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Group description"
                    required
                    rows={4}
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
                />

                <input
                    value={values.skills}
                    onChange={(e) => updateField("skills", e.target.value)}
                    placeholder="Skills: React, Next.js, TypeScript"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
                />

                <input
                    type="number"
                    value={values.order}
                    onChange={(e) => updateField("order", Number(e.target.value))}
                    placeholder="Display order"
                    required
                    className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-[#C778DD]"
                />

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
                            ? "Create Skill"
                            : "Save Changes"}
                </button>
            </div>
        </form>
    );
}