
import Link from "next/link";
import ProtectedRoute from "../ProtectedRoute";
import AdminHeader from "@/components/admin/AdminHeader";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-portfolio text-white p-8">
                <AdminHeader />
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="space-y-4">
                    <Link href="/admin/blogs" className="block text-[#C778DD]">
                        Manage Blogs →
                    </Link>
                </div>
            </div>
        </ProtectedRoute>
    );
}