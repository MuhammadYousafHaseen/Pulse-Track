"use client";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import {
  Mail,
  PhoneCall,
  MapPin,
  HeartPulse,
  Dumbbell,
  Salad,
  Goal,
  Activity,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const quickLinks = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: "Workouts",
      href: "/workouts",
      icon: <Dumbbell className="h-4 w-4" />,
    },
    {
      label: "Nutrition",
      href: "/nutrition",
      icon: <Salad className="h-4 w-4" />,
    },
    {
      label: "Goals",
      href: "/goals",
      icon: <Goal className="h-4 w-4" />,
    },
  ];

  const companyLinks = [
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-blue-500/20 bg-black text-gray-300">

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.15),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Pulse Track Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />

              <span className="bg-linear-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-2xl font-bold text-transparent">
                Pulse Track
              </span>
            </div>

            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Your intelligent fitness companion for tracking workouts,
              nutrition, hydration, body progress, and achieving long-term
              health goals.
            </p>

            <div className="mt-5 flex items-center gap-2 text-green-400">
              <HeartPulse className="h-5 w-5" />
              <span className="text-sm font-medium">
                Train Smarter. Live Stronger.
              </span>
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-green-400"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COMPANY */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-5 text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">

              <li className="flex items-start gap-3">
                <PhoneCall className="mt-0.5 h-4 w-4 text-green-400" />

                <span>
                  +92 321 8971071
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-400" />

                <span>
                  support@pulsetrack.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-400" />

                <span>
                  Sahiwal, Punjab, Pakistan
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* SEPARATOR */}
        <Separator className="my-8 bg-blue-500/20" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Pulse Track. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="transition hover:text-green-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-cyan-400"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-blue-400"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}