"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import GoalCard from "./goal-card";

interface Goal {
  _id: string;
  goalType: string;
  status: string;
  targetWeight?: number;
  targetCaloriesBurn?: number;
  startDate: string;
  endDate: string;
}

export default function GoalsHistory() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/goals");

        const data = Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setGoals(data);
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        setGoals([]);
      }
    })();
  }, []);

  const visibleGoals = showAll ? goals : goals.slice(0, 4);

  return (
    <div className="space-y-5">
      
      <h2 className="text-xl font-bold text-white">
        Goals History
      </h2>

      {goals.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center text-gray-400">
          No goals found 🎯
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleGoals.map((g) => (
              <GoalCard key={g._id} goal={g} />
            ))}
          </div>

          {goals.length > 4 && (
            <button
              onClick={() => setShowAll((p) => !p)}
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}