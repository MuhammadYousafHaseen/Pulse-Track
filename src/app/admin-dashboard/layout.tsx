"use client";

import { ReactNode } from "react";

import AdminSidebar from "@/components/admin-dashboard/layout/admin-sidebar";

import MobileAdminSidebar from "@/components/admin-dashboard/layout/mobile-admin-sidebar";

import AdminTopbar from "@/components/admin-dashboard/layout/admin-topbar";

type Props = {
  children: ReactNode;
};

export default function AdminDashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <AdminSidebar />

      <MobileAdminSidebar />

      <div className="lg:ml-70">

        <AdminTopbar />

        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}