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

  // -----------------------------------------
  // STATES
  // -----------------------------------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  // -----------------------------------------
  // HANDLE BLOCKED USER
  // -----------------------------------------
  if (
    user &&
    "isBlocked" in user &&
    user.isBlocked
  ) {
    signOut({
      callbackUrl: "/auth/login",
    });
  }

  const closeMobileMenu = () =>
    setIsMobileMenuOpen(false);

  // -----------------------------------------
  // LINKS
  // -----------------------------------------
  const publicLinks: NavLink[] = [
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
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
      label: "Diet",
      href: "/diet",
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

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-blue-500/20 bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

          {/* LEFT */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo.png"
              alt="Pulse Track Logo"
              width={42}
              height={42}
              priority
            />

            <motion.span
              whileHover={{ scale: 1.05 }}
              className="bg-linear-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-2xl font-bold text-transparent"
            >
              Pulse Track
            </motion.span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-6 md:flex">

            {!session &&
              publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-green-400"
                >
                  {link.label}
                </Link>
              ))}

            {session &&
              protectedLinks.map((link) => {
                const isActive =
                  pathname === link.href;

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

            {session &&
              user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-400"
                >
                  <ShieldCheck size={18} />
                  Admin
                </Link>
              )}
          </div>

          {/* RIGHT */}
          <div className="hidden items-center gap-4 md:flex">

            {status === "loading" ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-blue-500/20" />
            ) : session ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/auth/login",
                  })
                }
                className="rounded-full bg-red-500 text-white"
              >
                <LogOut size={18} />
                Logout
              </Button>
            ) : (
              <div className="flex gap-3">

                <Link href="/auth/login">
                  <Button variant="ghost">
                    Login
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button className="rounded-full bg-linear-to-r from-blue-600 to-green-500 text-white">
                    Get Started
                  </Button>
                </Link>

              </div>
            )}
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-3 md:hidden">

            <button
              onClick={() =>
                setIsMobileMenuOpen(
                  (prev) => !prev
                )
              }
              className="rounded-full border border-blue-500/20 bg-white/5 p-2 transition"
            >
              {isMobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>

            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/60"
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 z-50 flex h-full w-[80%] flex-col bg-slate-950 p-6"
            >

              {/* CLOSE */}
              <button
                onClick={closeMobileMenu}
                className="flex items-center gap-2 text-white"
              >
                Close <X size={24} />
              </button>

              {/* LINKS */}
              <div className="mt-10 flex flex-col gap-4">

                {!session &&
                  publicLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="text-gray-300 transition hover:text-green-400"
                    >
                      {link.label}
                    </Link>
                  ))}

                {session &&
                  protectedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 text-gray-300 transition hover:text-green-400"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}

                {session &&
                  user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 text-red-400"
                    >
                      <ShieldCheck size={18} />
                      Admin
                    </Link>
                  )}

              </div>

              {/* BUTTONS */}
              <div className="mt-auto pt-10">

                {session ? (
                  <Button
                    onClick={() =>
                      signOut({
                        callbackUrl:
                          "/auth/login",
                      })
                    }
                    className="w-full bg-red-500"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">

                    <Button
                      onClick={() =>
                        router.push(
                          "/auth/login"
                        )
                      }
                    >
                      Login
                    </Button>

                    <Button
                      onClick={() =>
                        router.push(
                          "/auth/register"
                        )
                      }
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