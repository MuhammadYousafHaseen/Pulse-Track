"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/layout/sidebar";

import Topbar from "@/components/dashboard/layout/topbar";

import MobileSidebar from "@/components/dashboard/layout/mobile-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* DESKTOP SIDEBAR */}

      <Sidebar />

      {/* MOBILE SIDEBAR */}

      <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* MAIN CONTENT */}

      <div className="lg:ml-70">
        <Topbar
          onMenuClick={() =>
            setOpen(true)
          }
        />

        <main className="min-h-screen p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}