"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.15),transparent_30%)]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[40px] border border-blue-500/20 bg-white/5 p-12 backdrop-blur-2xl"
        >

          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Start Your
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              {" "}Fitness Journey{" "}
            </span>
            Today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Join Pulse Track and transform the way you track workouts,
            calories, hydration, goals, and health analytics.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

            <Link href="/auth/register">
              <Button className="h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-500 px-8 text-base font-semibold text-white">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/auth/login">
              <Button
                variant="outline"
                className="h-12 rounded-full border-blue-500/30 bg-white/5 px-8 text-base text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>

          </div>
        </motion.div>
      </div>
    </section>
  );
}