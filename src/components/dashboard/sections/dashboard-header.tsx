"use client";

import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <h1 className="text-4xl font-black">
        Welcome Back,
        <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
          {" "}Alex!
        </span>
      </h1>

      <p className="mt-2 text-gray-400">
        Let&apos;s hit your limits today.
      </p>
    </motion.div>
  );
}