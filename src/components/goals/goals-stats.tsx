"use client";

export default function GoalsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      
      <div className="rounded-xl bg-gray-900 p-5">
        <p className="text-sm text-gray-400">Active Goals</p>
        <h3 className="text-2xl font-bold text-green-400">3</h3>
      </div>

      <div className="rounded-xl bg-gray-900 p-5">
        <p className="text-sm text-gray-400">Completed</p>
        <h3 className="text-2xl font-bold text-cyan-400">5</h3>
      </div>

      <div className="rounded-xl bg-gray-900 p-5">
        <p className="text-sm text-gray-400">Success Rate</p>
        <h3 className="text-2xl font-bold text-yellow-400">72%</h3>
      </div>

    </div>
  );
}