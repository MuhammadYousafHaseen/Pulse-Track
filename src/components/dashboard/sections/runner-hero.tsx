"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export default function RunnerHero() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/10
        bg-white/5
        p-6
        backdrop-blur-xl
        min-h-125
        flex
        items-center
        justify-center
      "
    >
      {/* Glow Effects */}

      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />

      {/* Runner */}

      <div className="relative z-10 flex items-center justify-center">

        <Image
          src="/images/dashboard-runner.png"
          alt="Runner"
          width={400}
          height={500}
          className="
            h-auto
            w-full
            max-w-87.5
            object-contain
          "
          priority
        />

      </div>

      {/* Floating Text */}

      <div className="absolute right-6 top-6 rounded-2xl border border-cyan-500/10 bg-black/40 px-4 py-3 backdrop-blur-xl z-20">

        <p className="text-sm text-gray-400">
          Performance
        </p>

        <h3 className="text-2xl font-bold text-green-400">
          +18%
        </h3>

      </div>
    </motion.div>
  );
}