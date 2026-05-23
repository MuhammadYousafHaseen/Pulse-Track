"use client";

import { useSession } from "next-auth/react";

export default function WorkoutsHero() {
  const { data: session } = useSession();

  const userName =
    session?.user?.name?.split(" ")[0] || "Champion";

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-green-700 via-green-800 to-black p-5 sm:p-6 md:p-8 lg:p-10">
      
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          
          <p className="text-sm font-medium text-green-200">
            Welcome Back 👋
          </p>

          <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {userName}, stay strong and keep pushing 💪
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-200 sm:text-base">
            Discipline beats motivation every single time. 
            Every workout brings you one step closer to your goals.
          </p>

          {/* STREAK */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-sm text-green-200 backdrop-blur-sm">
            <span className="text-lg">🔥</span>
            <span>
              Current Streak:{" "}
              <span className="font-bold text-white">
                7 Days
              </span>
            </span>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:max-w-xs">
          
          <h2 className="text-lg font-semibold text-white">
            Today's Goal
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            Complete your workout and maintain your consistency.
          </p>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-300">
              <span>Progress</span>
              <span>70%</span>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
              <div className="h-full w-[70%] rounded-full bg-green-500" />
            </div>
          </div>

          <button className="mt-5 w-full rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400">
            Log Today's Workout
          </button>
        </div>
      </div>
    </section>
  );
}