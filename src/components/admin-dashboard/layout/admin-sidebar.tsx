"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Users,
  Dumbbell,
  UtensilsCrossed,
  Home,
  LayoutDashboard,
} from "lucide-react";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    external: true,
  },
  {
    title: "Dashboard",
    tab: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    tab: "users",
    icon: Users,
  },
  {
    title: "Exercises",
    tab: "exercises",
    icon: Dumbbell,
  },
  {
    title: "Diet Plans",
    tab: "diets",
    icon: UtensilsCrossed,
  },
];

export default function AdminSidebar() {
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "dashboard";

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-70 border-r border-cyan-500/10 bg-white/5 backdrop-blur-xl lg:block">
      
      {/* HEADER */}
      <div className="border-b border-cyan-500/10 p-6">
        <h1 className="bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-3xl font-black text-transparent">
          Pulse Admin
        </h1>
      </div>

      {/* NAV */}
      <div className="space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.tab && activeTab === item.tab;

          return (
            <Link
              key={item.title}
              href={item.href || `/admin-dashboard?tab=${item.tab}`}
              className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-linear-to-r from-cyan-500/20 to-green-500/20 text-cyan-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}