"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CKEditorClient = dynamic(() => import("@/components/admin/CKEditorClient"), {
    ssr: false,
});

export type WorkExperienceFormValues = {
    company: string;
    location: string;
    role: string;
    startDate: string;
    endDate: string;
    isPresent: boolean;
    details: string;
    order: number;
};

type Props = {
    mode: "create" | "edit";
    initialValues: WorkExperienceFormValues;
    loading?: boolean;
    onSubmit: (values: WorkExperienceFormValues) => void | Promise<void>;
    onDelete?: () => void;
};

export default function WorkExperienceForm({
    mode,
    initialValues,
    loading,
    onSubmit,
    onDelete,
}: Props) {
    const [values, setValues] =
        useState<WorkExperienceFormValues>(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const updateField = <K extends keyof WorkExperienceFormValues>(
        key: K,
        value: WorkExperienceFormValues[K]
    ) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
            }}
            className="glass-card rounded-2xl p-6 space-y-5"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                    {mode === "create" ? "Add Experience" : "Edit Experience"}
                </h2>

                {mode === "edit" && onDelete && (
                    <button
                        type="button"
                        onClick={onDelete}
                        className="text-red-400 text-sm"
                    >
                        Delete
                    </button>
                )}
            </div>

            <input
                value={values.role}
                onChange={(e) => updateField("role", e.target.value)}
                placeholder="Role"
                required
                className="input"
            />

            <input
                value={values.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Company"
                required
                className="input"
            />

            <input
                value={values.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="Location"
                required
                className="input"
            />

            <div className="grid grid-cols-2 gap-4">
                <input
                    type="date"
                    value={values.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    className="input"
                />

                <input
                    type="date"
                    value={values.endDate}
                    onChange={(e) => updateField("endDate", e.target.value)}
                    disabled={values.isPresent}
                    className="input"
                />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#ABB2BF]">
                <input
                    type="checkbox"
                    checked={values.isPresent}
                    onChange={(e) => updateField("isPresent", e.target.checked)}
                />
                Currently working here
            </label>

            <CKEditorClient
                value={values.details}
                onChange={(val) => updateField("details", val)}
            />

            <input
                type="number"
                value={values.order}
                onChange={(e) => updateField("order", Number(e.target.value))}
                placeholder="Order"
                className="input"
            />

            <button className="btn-primary w-full">
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
}
