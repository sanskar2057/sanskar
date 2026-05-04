"use client";

import { useEffect, useState } from "react";

export type QuickFactFormValues = {
    label: string;
    value: string;
    icon: string;
    order: number;
};

type Props = {
    mode: "create" | "edit";
    initialValues: QuickFactFormValues;
    onSubmit: (values: QuickFactFormValues) => void;
    onDelete?: () => void;
};

export default function QuickFactForm({
    mode,
    initialValues,
    onSubmit,
    onDelete,
}: Props) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const update = (k: keyof QuickFactFormValues, v: any) =>
        setValues((p) => ({ ...p, [k]: v }));

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(values);
            }}
            className="glass-card p-5 rounded-xl space-y-4"
        >
            <input
                value={values.label}
                onChange={(e) => update("label", e.target.value)}
                placeholder="Label"
                className="input"
            />

            <input
                value={values.value}
                onChange={(e) => update("value", e.target.value)}
                placeholder="Value"
                className="input"
            />

            <input
                value={values.icon}
                onChange={(e) => update("icon", e.target.value)}
                placeholder="Icon (MapPin, GraduationCap, Sparkles)"
                className="input"
            />

            <input
                type="number"
                value={values.order}
                onChange={(e) => update("order", Number(e.target.value))}
                placeholder="Order"
                className="input"
            />

            <button className="btn-primary w-full">
                {mode === "create" ? "Add Fact" : "Update"}
            </button>

            {mode === "edit" && onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    className="text-red-400 text-sm w-full"
                >
                    Delete
                </button>
            )}
        </form>
    );
}