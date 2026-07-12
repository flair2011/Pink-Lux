import React from "react";
import { redirect } from "next/navigation";
import { getVerifiedSession } from "@/lib/auth/session";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getVerifiedSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 min-w-0 px-4 pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] md:p-12 animate-in fade-in duration-500">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
