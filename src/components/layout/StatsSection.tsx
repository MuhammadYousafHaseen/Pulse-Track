"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "120K+",
    label: "Calories Burned",
  },
  {
    value: "45K+",
    label: "Workout Sessions",
  },
  {
    value: "98%",
    label: "Goal Success Rate",
  },
  {
    value: "24/7",
    label: "Progress Tracking",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Real Fitness.
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              {" "}Real Results
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Pulse Track empowers users to build healthier lifestyles
            through intelligent tracking and progress analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="rounded-3xl border border-blue-500/10 bg-white/5 p-8 text-center backdrop-blur-xl"
            >
              <h3 className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-4xl font-extrabold text-transparent">
                {stat.value}
              </h3>

              <p className="mt-3 text-sm text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}