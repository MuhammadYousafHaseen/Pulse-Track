"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/layout/sidebar";
import Topbar from "@/components/dashboard/layout/topbar";
import MobileSidebar from "@/components/dashboard/layout/mobile-sidebar";

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <MobileSidebar open={open} onClose={() => setOpen(false)} />

      <div className="lg:ml-72">
        <Topbar onMenuClick={() => setOpen(true)} />

        <main className="min-h-screen p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}