"use client";

import { motion } from "framer-motion";

import {
  Dumbbell,
  HeartPulse,
  Salad,
  Flame,
} from "lucide-react";

const programs = [
  {
    title: "Strength Training",
    icon: Dumbbell,
    desc: "Build muscles and improve endurance with structured workouts.",
  },
  {
    title: "Cardio Fitness",
    icon: HeartPulse,
    desc: "Boost heart health and stamina using cardio programs.",
  },
  {
    title: "Nutrition Tracking",
    icon: Salad,
    desc: "Track calories, proteins, carbs, and healthy eating habits.",
  },
  {
    title: "Fat Burning",
    icon: Flame,
    desc: "Optimize workouts and calorie burn for effective weight loss.",
  },
];

export default function FitnessProgramsSection() {
  return (
    <section className="bg-slate-950 py-24 text-white">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Explore Our
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              {" "}Fitness Features
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Designed for athletes, gym enthusiasts, and healthy lifestyles.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="rounded-3xl border border-blue-500/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-green-500">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold">
                  {program.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {program.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}