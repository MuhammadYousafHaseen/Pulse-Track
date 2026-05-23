"use client";

const quotes = [
  "No pain, no gain.",
  "Discipline creates results.",
  "Push yourself because no one else will.",
  "Success starts with consistency.",
  "Train hard, stay humble.",
];

function getDailyQuoteIndex() {
  // stable daily index based on date (no randomness)
  const today = new Date();
  const seed =
    today.getFullYear() * 1000 +
    today.getMonth() * 100 +
    today.getDate();

  return seed % quotes.length;
}

export default function MotivationSection() {
  const quote = quotes[getDailyQuoteIndex()];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-900 via-purple-800 to-black p-5 sm:p-6 md:p-8">
      
      {/* Glow Background */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 space-y-4">
        
        {/* TITLE */}
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Motivation 🔥
        </h2>

        {/* QUOTE */}
        <p className="text-sm leading-6 text-gray-200 sm:text-base md:text-lg">
          “{quote}”
        </p>

        {/* MESSAGE */}
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300 sm:text-base">
          💪 You are doing better than yesterday. Keep going!
        </div>

        {/* BADGE ROW */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          
          <div className="text-xs text-gray-400 sm:text-sm">
            Stay consistent. Results will follow.
          </div>

          <div className="w-fit rounded-full bg-white/10 px-4 py-2 text-xs text-purple-200 backdrop-blur-md">
            🧠 Mental Strength Builder
          </div>
        </div>
      </div>
    </section>
  );
}