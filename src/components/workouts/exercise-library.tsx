"use client";

import { useState } from "react";

const allExercises = [
  {
    name: "Push Ups",
    category: "Chest",
    instructions: [
      "Keep body straight",
      "Lower chest slowly",
      "Push explosively",
    ],
  },
  {
    name: "Bench Press",
    category: "Chest",
    instructions: [
      "Keep feet stable",
      "Lower bar slowly",
      "Push with control",
    ],
  },
  {
    name: "Squats",
    category: "Legs",
    instructions: [
      "Keep back straight",
      "Go down slowly",
      "Push through heels",
    ],
  },
  {
    name: "Lunges",
    category: "Legs",
    instructions: [
      "Step forward steadily",
      "Keep balance",
      "Push back up",
    ],
  },
  {
    name: "Deadlift",
    category: "Back",
    instructions: [
      "Keep spine neutral",
      "Lift with legs",
      "Avoid rounding back",
    ],
  },
  {
    name: "Pull Ups",
    category: "Back",
    instructions: [
      "Grip bar firmly",
      "Pull chest to bar",
      "Control descent",
    ],
  },
  {
    name: "Plank",
    category: "Core",
    instructions: [
      "Keep body straight",
      "Engage core",
      "Don’t drop hips",
    ],
  },
  {
    name: "Crunches",
    category: "Core",
    instructions: [
      "Lift shoulders only",
      "Don’t strain neck",
      "Controlled movement",
    ],
  },
  {
    name: "Jumping Jacks",
    category: "Cardio",
    instructions: [
      "Keep rhythm",
      "Stay light on feet",
      "Breathe steadily",
    ],
  },
  {
    name: "Running",
    category: "Cardio",
    instructions: [
      "Maintain steady pace",
      "Keep posture upright",
      "Control breathing",
    ],
  },
  {
    name: "Shoulder Press",
    category: "Shoulders",
    instructions: [
      "Keep core tight",
      "Push overhead smoothly",
      "Don’t lock elbows aggressively",
    ],
  },
  {
    name: "Bicep Curls",
    category: "Arms",
    instructions: [
      "Keep elbows fixed",
      "Lift slowly",
      "Avoid swinging",
    ],
  },
];

export default function ExerciseLibrary() {
  const [showMore, setShowMore] = useState(false);

  const visibleExercises = showMore
    ? allExercises
    : allExercises.slice(0, 6);

  return (
    <section className="space-y-5">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white md:text-2xl">
          Exercise Library
        </h2>

        <span className="text-xs text-gray-400">
          {allExercises.length} Exercises
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleExercises.map((e, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900 to-black p-4 transition hover:border-green-500/30"
          >
            
            {/* TITLE */}
            <h3 className="text-lg font-bold text-green-400">
              {e.name}
            </h3>

            {/* CATEGORY */}
            <p className="mt-1 inline-block rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
              {e.category}
            </p>

            {/* INSTRUCTIONS */}
            <ul className="mt-3 space-y-1 text-sm text-gray-300">
              {e.instructions.map((ins, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>{ins}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* SHOW MORE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="rounded-full border border-green-500/30 bg-green-500/10 px-6 py-2 text-sm text-green-300 transition hover:bg-green-500/20"
        >
          {showMore ? "Show Less" : "Show More Exercises"}
        </button>
      </div>
    </section>
  );
}