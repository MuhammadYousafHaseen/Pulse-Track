"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Dumbbell,
  Target,
  Salad,
  Settings,
  LifeBuoy,
  Home,
  Scale,
} from "lucide-react";

const links = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
  },
  {
    name: "Weight",
    href: "/weight",
    icon: Scale,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Nutrition",
    href: "/nutrition",
    icon: Salad,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-cyan-500/10 bg-black/40 backdrop-blur-xl lg:flex lg:flex-col">
      
      {/* LOGO */}
      <div className="border-b border-cyan-500/10 p-6">
        <Link href="/">
          <h1 className="cursor-pointer bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-3xl font-black text-transparent">
            Pulse Track
          </h1>
        </Link>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-1 flex-col justify-between p-4">
        
        {/* TOP LINKS */}
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* BOTTOM SECTION */}
        <div className="space-y-2">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition hover:bg-cyan-500/10 hover:text-cyan-400">
            <Settings size={20} />
            Settings
          </button>

          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition hover:bg-cyan-500/10 hover:text-cyan-400">
            <LifeBuoy size={20} />
            Support
          </button>
        </div>

      </div>
    </aside>
  );
}