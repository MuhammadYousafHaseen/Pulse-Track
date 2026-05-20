"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;

  value: string;

  icon: React.ReactNode;

  increase: string;
};

export default function StatCard({
  title,
  value,
  icon,
  increase,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl"
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-black">
            {value}
          </h2>

        </div>

        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-green-500/20 p-4 text-cyan-400">
          {icon}
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="h-2 w-full rounded-full bg-black/40">
          <div className="h-2 w-[70%] rounded-full bg-gradient-to-r from-cyan-400 to-green-400" />
        </div>

        <span
          className={`ml-4 text-sm font-semibold ${
            increase.startsWith("-")
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {increase}
        </span>

      </div>
    </motion.div>
  );
}