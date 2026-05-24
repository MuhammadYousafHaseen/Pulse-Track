"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Dumbbell,
  UtensilsCrossed,
} from "lucide-react";

const navItems = [
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

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-70 border-r border-cyan-500/10 bg-white/5 backdrop-blur-xl lg:block">

      <div className="border-b border-cyan-500/10 p-6">

        <h1 className="bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-3xl font-black text-transparent">
          Pulse Admin
        </h1>

      </div>

      <div className="space-y-2 p-4">

        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-300 ${
                active
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