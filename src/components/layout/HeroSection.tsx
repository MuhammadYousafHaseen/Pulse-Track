"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  Activity,
  Dumbbell,
  HeartPulse,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black pb-24 pt-36 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.18),transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* CENTER CONTENT (full width now) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >

          {/* BADGE */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white/5 px-4 py-2 text-sm text-green-400 backdrop-blur-xl">
            <Activity className="h-4 w-4" />
            AI Powered Fitness Tracking
          </div>

          {/* HEADING */}
          <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Track Your
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent">
              {" "}Fitness Journey{" "}
            </span>
            Smarter With Pulse Track
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Monitor workouts, nutrition, hydration, calories,
            weight progress, and goals — all in one intelligent
            fitness platform built for modern athletes.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

            <Link href="/auth/register">
              <Button className="h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-500 px-8 text-base font-semibold text-white hover:opacity-90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="outline"
                className="h-12 rounded-full border-blue-500/30 bg-white/5 px-8 text-base text-white backdrop-blur-xl hover:bg-white/10"
              >
                Explore Dashboard
              </Button>
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-16 flex flex-wrap justify-center gap-12">

            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-400">
                50K+
              </h3>
              <p className="text-sm text-gray-400">
                Workouts Logged
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-cyan-400">
                12K+
              </h3>
              <p className="text-sm text-gray-400">
                Active Users
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-400">
                95%
              </h3>
              <p className="text-sm text-gray-400">
                Goal Completion
              </p>
            </div>

          </div>

          {/* FLOATING CARDS (kept for visual depth) */}
          <div className="relative mt-20 flex justify-center">

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -left-10 rounded-2xl border border-green-500/20 bg-slate-900/80 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <HeartPulse className="h-10 w-10 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Heart Rate</p>
                  <h4 className="text-xl font-bold">124 BPM</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -right-10 rounded-2xl border border-blue-500/20 bg-slate-900/80 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <Dumbbell className="h-10 w-10 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Calories Burned</p>
                  <h4 className="text-xl font-bold">780 kcal</h4>
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}