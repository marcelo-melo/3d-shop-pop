import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin - 3D Shop Pop",
  description: "Painel administrativo da 3D Shop Pop",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminSidebar />
      <div className="lg:ml-64">
        <AdminHeader />
        <main className="p-4 lg:p-6 pt-16 lg:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
