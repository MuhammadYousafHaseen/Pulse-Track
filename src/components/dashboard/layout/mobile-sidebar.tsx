"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Dumbbell,
  Target,
  Salad,
  Settings,
  Home,
  X,
  Scale,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const links = [
  {
    title: "Home",
    href: "/",
    icon: <Home size={20} />,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: <Dumbbell size={20} />,
  },
  {
    title: "Weight",
    href: "/weight",
    icon: <Scale size={20} />,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: <Target size={20} />,
  },
  {
    title: "Nutrition",
    href: "/nutrition",
    icon: <Salad size={20} />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings size={20} />,
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileSidebar({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 z-50 flex h-full w-[80%] max-w-sm flex-col border-r border-cyan-500/10 bg-[#020617] p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="bg-linear-to-r from-cyan-400 to-green-400 bg-clip-text text-2xl font-black text-transparent">
                Pulse Track
              </h2>

              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="border-cyan-500/20 text-black hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Links */}
            <div className="mt-10 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-2xl px-4 py-4 text-gray-300 transition hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                  {link.icon}
                  <span className="font-medium">{link.title}</span>
                </Link>
              ))}
            </div>

            {/* Bottom */}
            <div className="mt-auto rounded-3xl border border-cyan-500/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm text-gray-400">Daily Progress</p>

              <h3 className="mt-2 text-4xl font-black">82%</h3>

              <div className="mt-4 h-2 rounded-full bg-black/40">
                <div className="h-2 w-[82%] rounded-full bg-linear-to-r from-cyan-400 to-green-400" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}