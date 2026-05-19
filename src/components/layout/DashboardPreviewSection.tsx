"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DashboardPreviewSection() {
  return (
    <section className="bg-black py-24 text-white">

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="mb-5 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400">
            Smart Analytics Dashboard
          </div>

          <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Everything You Need
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              {" "}In One Dashboard
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Analyze workouts, calories, hydration, body progress,
            and goals with powerful visual analytics and smart
            tracking tools.
          </p>

          <div className="mt-10 space-y-5">

            <div className="rounded-2xl border border-blue-500/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">
                Workout Analytics
              </h3>

              <p className="mt-2 text-gray-400">
                Track exercise performance and weekly activity.
              </p>
            </div>

            <div className="rounded-2xl border border-green-500/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">
                Nutrition Insights
              </h3>

              <p className="mt-2 text-gray-400">
                Monitor macros, calories, and diet plans.
              </p>
            </div>

          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >

          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[40px] border border-blue-500/20 bg-white/5 shadow-2xl backdrop-blur-2xl">

            <Image
              src="/images/dashboard-ui.png"
              alt="Pulse Track Dashboard"
              width={1400}
              height={900}
              className="h-auto w-full object-cover"
            />

          </div>
        </motion.div>
      </div>
    </section>
  );
}