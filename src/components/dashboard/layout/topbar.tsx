"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: Props) {
  const { data: session } = useSession();

  const userName = session?.user?.name || "User";

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-cyan-500/10 bg-[#020617]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* MOBILE MENU BUTTON */}
          <Button
            onClick={onMenuClick}
            variant="ghost"
            className="rounded-xl border border-cyan-500/20 bg-white/5 p-2 text-white lg:hidden hover:bg-white/10"
          >
            <Menu size={22} />
          </Button>

          {/* SEARCH */}
          <div className="hidden items-center gap-3 rounded-2xl border border-cyan-500/10 bg-white/5 px-4 py-3 md:flex">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}
          <Button
            variant="ghost"
            className="relative rounded-2xl border border-cyan-500/10 bg-white/5 p-3 hover:bg-white/10"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-400" />
          </Button>

          {/* USER */}
          <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/10 bg-white/5 px-3 py-2">

            <Avatar>
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>

            <div className="hidden md:block">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}