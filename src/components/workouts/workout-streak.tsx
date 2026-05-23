export default function WorkoutStreak() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-green-700 via-emerald-800 to-black p-5 sm:p-6 md:p-8">
      
      {/* Background Glow Effects */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-400/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
          <div>
            <p className="text-sm uppercase tracking-widest text-green-200">
              Consistency Tracker
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Workout Streak 🔥
            </h2>
          </div>

          {/* STREAK BADGE */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-400/30 bg-white/10 px-4 py-2 backdrop-blur-md">
            <span className="text-2xl">🔥</span>

            <div>
              <p className="text-xs text-gray-300">
                Current Streak
              </p>

              <h3 className="text-lg font-bold text-white">
                7 Days
              </h3>
            </div>
          </div>
        </div>

        {/* MOTIVATION */}
        <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
          Keep pushing forward. Every workout strengthens your body,
          sharpens your mind, and builds unstoppable discipline.
        </p>

        {/* STATS */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <p className="text-xs text-gray-400">
              Best Streak
            </p>

            <h3 className="mt-1 text-xl font-bold text-green-300">
              21 Days
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <p className="text-xs text-gray-400">
              This Month
            </p>

            <h3 className="mt-1 text-xl font-bold text-green-300">
              18 Workouts
            </h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md col-span-2 sm:col-span-1">
            <p className="text-xs text-gray-400">
              Consistency
            </p>

            <h3 className="mt-1 text-xl font-bold text-green-300">
              Elite Level
            </h3>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-300">
            <span>Monthly Goal Progress</span>
            <span>70%</span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-black/40">
            <div className="h-full w-[70%] rounded-full bg-green-400 transition-all duration-500" />
          </div>
        </div>

        {/* FOOTER MESSAGE */}
        <div className="mt-6 rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-100">
          💪 You are ahead of most people because you stayed consistent.
        </div>
      </div>
    </section>
  );
}