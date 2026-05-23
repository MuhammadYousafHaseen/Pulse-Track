"use client";

export default function GoalsProgress() {
  return (
    <div className="rounded-2xl border border-cyan-500/10 bg-gray-900 p-5">
      
      <h2 className="text-lg font-bold text-white md:text-xl">
        Progress Overview 📊
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Your consistency is building results over time.
      </p>

      {/* Progress Bars */}
      <div className="mt-5 space-y-4">
        
        <div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Weight Goals</span>
            <span>65%</span>
          </div>

          <div className="h-2 rounded-full bg-black">
            <div className="h-2 w-[65%] rounded-full bg-cyan-400" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Calories Target</span>
            <span>80%</span>
          </div>

          <div className="h-2 rounded-full bg-black">
            <div className="h-2 w-[80%] rounded-full bg-green-400" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Consistency</span>
            <span>72%</span>
          </div>

          <div className="h-2 rounded-full bg-black">
            <div className="h-2 w-[72%] rounded-full bg-yellow-400" />
          </div>
        </div>

      </div>
    </div>
  );
}