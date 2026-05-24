"use client";

import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AdminTopbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-500/10 bg-[#020617]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-5 md:px-6 lg:px-8">
        <div className="ml-14 lg:ml-0">
          <h2 className="text-2xl font-black">Admin Dashboard</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage users, exercises and diet plans
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Button
            size="icon"
            variant="outline"
            className="border-cyan-500/20 bg-white/5 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            <Bell size={20} />
          </Button>

          <div className="text-right">
            <p className="font-semibold">{session?.user?.name}</p>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}