import Link from "next/link";
import {
    BookOpen,
    BriefcaseBusiness,
    FileText,
    LayoutDashboard,
    Sparkles,
    UserRound,
} from "lucide-react";
import ProtectedRoute from "../ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";

const dashboardItems = [
    {
        title: "Blogs",
        description: "Create, edit, publish, and delete blog posts.",
        href: "/admin/blogs",
        icon: BookOpen,
    },
    {
        title: "Projects",
        description: "Manage selected work, highlights, links, and featured status.",
        href: "/admin/projects",
        icon: BriefcaseBusiness,
    },
    {
        title: "Skills",
        description: "Update skill groups, icons, descriptions, and skill tags.",
        href: "/admin/skills",
        icon: Sparkles,
    },
    {
        title: "About",
        description: "Manage work experience timeline and quick facts.",
        href: "/admin/about",
        icon: UserRound,
    },
    {
        title: "Resume",
        description: "Upload and replace the PDF used by public download buttons.",
        href: "/admin/resume",
        icon: FileText,
    },
];

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-portfolio text-white px-4 sm:px-6 lg:px-8 py-10">
                <div className="mx-auto max-w-6xl">
                    <AdminHeader />

                    <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-[#C778DD]" />
                            </div>

                            <div>
                                <p className="text-[#C778DD] text-sm">Portfolio CMS</p>
                                <h1 className="text-3xl sm:text-4xl font-bold">
                                    Admin Dashboard
                                </h1>
                            </div>
                        </div>

                        <p className="text-[#ABB2BF] text-sm sm:text-base mt-4 max-w-2xl">
                            Manage your portfolio content from one place. Blogs, projects,
                            skills, about section, work experiences, and quick facts are now
                            connected to Firebase.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
                        {dashboardItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="card-glow group bg-[#2D323B]/80 border border-white/10 hover:border-[#C778DD]/70 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-[#C778DD]/15 border border-[#C778DD]/25 flex items-center justify-center mb-5">
                                        <Icon className="w-5 h-5 text-[#C778DD]" />
                                    </div>

                                    <h2 className="text-white text-xl font-bold mb-2 group-hover:text-[#E0B7FF] transition-colors">
                                        {item.title}
                                    </h2>

                                    <p className="text-[#ABB2BF] text-sm leading-relaxed mb-5">
                                        {item.description}
                                    </p>

                                    <span className="text-[#C778DD] text-sm">
                                        Manage {item.title} →
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
