"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    return (
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <p className="text-[#C778DD] text-sm">Portfolio CMS</p>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>

            <nav className="flex flex-wrap items-center gap-3">
                <Link
                    href="/admin/dashboard"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    Dashboard
                </Link>
                <Link
                    href="/admin/about"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    About
                </Link>
                <Link
                    href="/admin/blogs"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    Blogs
                </Link>
                <Link
                    href="/admin/projects"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    Projects
                </Link>
                <Link
                    href="/admin/skills"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    Skills
                </Link>
                <Link
                    href="/admin/resume"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    Resume
                </Link>
                <Link
                    href="/"
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:border-[#C778DD]/70 transition"
                >
                    View Site
                </Link>

                <button
                    onClick={handleLogout}
                    className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10 transition"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}
