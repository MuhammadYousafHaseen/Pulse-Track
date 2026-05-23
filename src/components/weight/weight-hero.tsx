"use client";

import { useSession } from "next-auth/react";

export default function WeightHero() {
  const { data } = useSession();

  return (
    <div className="rounded-2xl bg-linear-to-r from-blue-700 to-black p-6 md:p-10">
      <h1 className="text-2xl font-bold md:text-4xl">
        Welcome back, {data?.user?.name || "Athlete"} 💪
      </h1>

      <p className="mt-2 text-sm text-gray-200 md:text-base">
        Track your transformation — every kilo tells a story.
      </p>
    </div>
  );
}