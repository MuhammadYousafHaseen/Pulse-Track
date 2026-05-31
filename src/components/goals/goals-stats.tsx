"use client";

import { useEffect, useState } from "react";

type GoalsSummary = {
  totalGoals: number;

  activeGoalsCount: number;

  completedGoalsCount: number;

  cancelledGoalsCount: number;

  successRate: number;
};

type Props = {
  refreshKey?: number;
};

export default function GoalsStats({
  refreshKey,
}: Props) {
  const [summary, setSummary] =
    useState<GoalsSummary>({
      totalGoals: 0,
      activeGoalsCount: 0,
      completedGoalsCount: 0,
      cancelledGoalsCount: 0,
      successRate: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchSummary =
      async () => {
        try {
          const response = await fetch(
            "/api/goals/summary"
          );

          const data =
            await response.json();

          if (data.success) {
            setSummary(data.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchSummary();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl bg-gray-900"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

      <div className="rounded-xl border border-green-500/10 bg-gray-900 p-5">

        <p className="text-sm text-gray-400">
          Active Goals
        </p>

        <h3 className="mt-2 text-3xl font-black text-green-400">
          {
            summary.activeGoalsCount
          }
        </h3>

      </div>

      <div className="rounded-xl border border-cyan-500/10 bg-gray-900 p-5">

        <p className="text-sm text-gray-400">
          Completed Goals
        </p>

        <h3 className="mt-2 text-3xl font-black text-cyan-400">
          {
            summary.completedGoalsCount
          }
        </h3>

      </div>

      <div className="rounded-xl border border-yellow-500/10 bg-gray-900 p-5">

        <p className="text-sm text-gray-400">
          Success Rate
        </p>

        <h3 className="mt-2 text-3xl font-black text-yellow-400">
          {summary.successRate}%
        </h3>

      </div>

    </div>
  );
}