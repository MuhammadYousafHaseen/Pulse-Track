"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react";

import {
  Menu,
  X,
  LayoutDashboard,
  Dumbbell,
  Salad,
  Goal,
  Weight,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

type NavLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;

  const isAdmin = session && user?.role === "admin";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (user && "isBlocked" in user && user.isBlocked) {
    signOut({ callbackUrl: "/auth/login" });
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleScrollToSection = (id: string) => {
    closeMobileMenu();

    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const publicLinks: NavLink[] = [
    { label: "Features", href: "features" },
    { label: "About", href: "about" },
  ];

  const protectedLinks: NavLink[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Workouts",
      href: "/workouts",
      icon: <Dumbbell size={18} />,
    },
    {
      label: "Nutrition",
      href: "/nutrition",
      icon: <Salad size={18} />,
    },
    {
      label: "Goals",
      href: "/goals",
      icon: <Goal size={18} />,
    },
    {
      label: "Weight",
      href: "/weight",
      icon: <Weight size={18} />,
    },
  ];

  const adminLinks: NavLink[] = [
    {
      label: "Admin Dashboard",
      href: "/admin-dashboard",
      icon: <ShieldCheck size={18} />,
    },
  ];

  const currentLinks = isAdmin ? adminLinks : protectedLinks;

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-blue-500/20 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Pulse Track Logo"
              width={44}
              height={44}
              className="rounded-full"
              priority
            />

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="bg-linear-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-2xl font-bold text-transparent"
            >
              Pulse Track
            </motion.span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-6 md:flex">
            {!session &&
              publicLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleScrollToSection(link.href)}
                  className="text-sm font-medium text-gray-300 hover:text-green-400"
                >
                  {link.label}
                </button>
              ))}

            {session &&
              currentLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-linear-to-r from-blue-600 to-green-500 text-white"
                        : "text-gray-300 hover:bg-blue-500/10 hover:text-green-400"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
          </div>

          {/* AUTH DESKTOP */}
          <div className="hidden items-center gap-4 md:flex">
            {status === "loading" ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-blue-500/20" />
            ) : session ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <div className="flex gap-3">
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>

                <Link href="/auth/register">
                  <Button className="bg-linear-to-r from-blue-600 to-green-500 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              className="rounded-full border border-blue-500/20 bg-slate-900 p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/70"
            />

            {/* sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed left-0 top-0 z-50 flex h-full w-[82%] flex-col bg-slate-950 p-6"
            >
              
              {/* CLOSE ICON ONLY */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  onClick={closeMobileMenu}
                  className="text-gray-200 hover:bg-blue-500/10 hover:text-green-400"
                >
                  <X size={22} />
                </Button>
              </div>

              {/* LINKS */}
              <div className="mt-8 flex flex-col gap-3">
                {!session &&
                  publicLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      onClick={() => handleScrollToSection(link.href)}
                      className="justify-start text-gray-200 hover:bg-blue-500/10 hover:text-green-400"
                    >
                      {link.label}
                    </Button>
                  ))}

                {session &&
                  currentLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <Button
                        key={link.href}
                        variant="ghost"
                        onClick={() => {
                          router.push(link.href);
                          closeMobileMenu();
                        }}
                        className={`justify-start gap-2 ${
                          isActive
                            ? "bg-linear-to-r from-blue-600 to-green-500 text-white"
                            : "text-gray-200 hover:bg-blue-500/10 hover:text-green-400"
                        }`}
                      >
                        {link.icon}
                        {link.label}
                      </Button>
                    );
                  })}
              </div>

              {/* AUTH */}
              <div className="mt-auto pt-10">
                {session ? (
                  <Button
                    onClick={() =>
                      signOut({ callbackUrl: "/auth/login" })
                    }
                    className="w-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      onClick={() => router.push("/auth/login")}
                    >
                      Login
                    </Button>

                    <Button
                      onClick={() => router.push("/auth/register")}
                      className="bg-linear-to-r from-blue-600 to-green-500 text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}