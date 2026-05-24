
"use client";

import { ReactNode, Suspense } from "react";
import AdminSidebar from "@/components/admin-dashboard/layout/admin-sidebar";
import MobileAdminSidebar from "@/components/admin-dashboard/layout/mobile-admin-sidebar";
import AdminTopbar from "@/components/admin-dashboard/layout/admin-topbar";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* 🚀 Suspense boundary isolates searchParams from failing the layout static compilation! */}
      <Suspense fallback={null}>
        <AdminSidebar />
        <MobileAdminSidebar />
      </Suspense>

      <div className="lg:ml-70">
        <AdminTopbar />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}