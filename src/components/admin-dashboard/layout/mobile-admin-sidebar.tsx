"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Users,
  Dumbbell,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin-dashboard?tab=users",
    icon: Users,
  },
  {
    title: "Exercises",
    href: "/admin-dashboard?tab=exercises",
    icon: Dumbbell,
  },
  {
    title: "Diet Plans",
    href: "/admin-dashboard?tab=diets",
    icon: UtensilsCrossed,
  },
];

export default function MobileAdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* OPEN BUTTON */}
      <Button
        size="icon"
        variant="outline"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 border-cyan-500/20 bg-black/40 text-cyan-400 backdrop-blur-xl hover:bg-cyan-500/10 hover:text-cyan-300 lg:hidden"
      >
        <Menu size={22} />
      </Button>

      {/* OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
          {/* SIDEBAR */}
          <div className="h-full w-70 border-r border-cyan-500/10 bg-[#020617] p-5">
            {/* HEADER */}
            <div className="mb-10 flex items-center justify-between">
              <h1 className="bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-2xl font-black text-transparent">
                Pulse Admin
              </h1>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <X size={22} />
              </Button>
            </div>

            {/* NAV ITEMS */}
            <div className="space-y-3">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 rounded-2xl border border-transparent bg-white/5 px-4 py-4 text-gray-300 transition-all duration-300 hover:border-cyan-500/20 hover:bg-cyan-500/10 hover:text-white"
                  >
                    <Icon size={22} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}