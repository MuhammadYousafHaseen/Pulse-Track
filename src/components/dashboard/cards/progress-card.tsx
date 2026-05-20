"use client";

import { motion } from "framer-motion";

type Props = {
  totalWorkouts: number;

  caloriesBurned: number;
};

export default function ProgressCard({
  totalWorkouts,
  caloriesBurned,
}: Props) {
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">
            Total Workouts
          </p>

          <h2 className="mt-2 text-5xl font-black">
            {totalWorkouts}
          </h2>
        </div>

        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-green-400 p-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#020617]">
            <span className="text-2xl font-bold">
              {Math.min(
                totalWorkouts * 10,
                100
              )}
              %
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-black/30 p-4">
        <p className="text-sm text-gray-400">
          Calories Burned
        </p>

        <div className="mt-2 flex items-center justify-between">
          <h3 className="text-3xl font-bold">
            {caloriesBurned} kcal
          </h3>

          <span className="text-green-400">
            Active
          </span>
        </div>
      </div>
    </motion.div>
  );
}