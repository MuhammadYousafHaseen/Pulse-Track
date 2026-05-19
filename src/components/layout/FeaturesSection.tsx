"use client";

import { motion } from "framer-motion";

import {
  Dumbbell,
  Salad,
  Droplets,
  Weight,
  Goal,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Workout Tracking",
    description:
      "Track exercises, sets, reps, calories burned, and workout history.",
    icon: Dumbbell,
  },
  {
    title: "Nutrition Monitoring",
    description:
      "Manage meals, calories, protein, carbs, and fats easily.",
    icon: Salad,
  },
  {
    title: "Water Tracking",
    description:
      "Monitor hydration goals with smart daily water tracking.",
    icon: Droplets,
  },
  {
    title: "Weight Progress",
    description:
      "Track body weight, BMI, and long-term transformation progress.",
    icon: Weight,
  },
  {
    title: "Goal Management",
    description:
      "Create and monitor custom fitness and health goals.",
    icon: Goal,
  },
  {
    title: "Advanced Analytics",
    description:
      "Visualize progress with modern charts and analytics dashboards.",
    icon: BarChart3,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold md:text-5xl"
          >
            Everything You Need To
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              {" "}Transform Yourself
            </span>
          </motion.h2>

          <p className="mt-6 text-lg text-gray-400">
            Powerful fitness tracking tools designed to help you
            stay healthy, disciplined, and motivated every day.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-blue-500/20 bg-white/5 p-8 backdrop-blur-xl transition"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-green-500">

                  <Icon className="h-8 w-8 text-white" />

                </div>

                <h3 className="text-2xl font-bold transition group-hover:text-green-400">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}