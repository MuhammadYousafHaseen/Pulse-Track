"use client";

import { useSession } from "next-auth/react";

const badges = [
  {
    title: "7 Day Streak",
    icon: "🔥",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "Strength Starter",
    icon: "🏋️",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Cardio Beast",
    icon: "⚡",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Fitness King",
    icon: "👑",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

export default function AchievementBadges() {
  const { data: session } = useSession();

  const userName =
    session?.user?.name?.split(" ")[0] || "Athlete";

  return (
    <section className="rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900 to-black p-4 sm:p-6 space-y-5">
      
      {/* HEADER */}
      <div className="space-y-1">
        <p className="text-xs text-gray-400">
          Personalized for {userName}
        </p>

        <h2 className="text-lg font-bold text-white sm:text-xl">
          Achievements 🏆
        </h2>
      </div>

      {/* BADGES GRID */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-xl border border-gray-800 p-3 sm:p-4 ${b.bg} transition hover:scale-[1.02]`}
          >
            
            {/* ICON */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/30 text-lg">
              {b.icon}
            </div>

            {/* TEXT */}
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${b.color}`}>
                {b.title}
              </p>

              <p className="text-xs text-gray-400">
                Keep pushing to unlock more
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER MESSAGE */}
      <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
        💪 {userName}, consistency is turning you into a champion.
      </div>
    </section>
  );
}