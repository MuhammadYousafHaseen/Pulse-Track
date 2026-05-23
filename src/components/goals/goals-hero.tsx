"use client";

export default function GoalsHero() {
  return (
    <div className="rounded-2xl bg-linear-to-r from-cyan-700 to-black p-6 md:p-10">
      <h1 className="text-2xl font-bold md:text-4xl">
        Your Fitness Goals 🎯
      </h1>

      <p className="mt-2 text-sm text-gray-300 md:text-base">
        “A goal without a plan is just a wish — stay consistent.”
      </p>

      <div className="mt-4 text-sm text-gray-400 md:text-base">
        Track, achieve, and level up your fitness journey 💪
      </div>
    </div>
  );
}