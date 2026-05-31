"use client";

import {
  useEffect,
  useState,
} from "react";

type SummaryType = {
  totalWorkouts: number;

  totalCaloriesBurned: number;

  totalDuration: number;

  topCategory: string;
};

type Props = {
  refreshKey: number;
};

export default function WorkoutStats({
  refreshKey,
}: Props) {
  const [summary, setSummary] =
    useState<SummaryType>({
      totalWorkouts: 0,

      totalCaloriesBurned: 0,

      totalDuration: 0,

      topCategory:
        "No Category",
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchSummary =
      async () => {
        try {
          setLoading(true);

          const response =
            await fetch(
              "/api/workouts/summary"
            );

          const data =
            await response.json();

          if (data.success) {
            setSummary(
              data.data
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchSummary();
  }, [refreshKey]);

  const stats = [
    {
      label:
        "Total Workouts",

      value:
        summary.totalWorkouts,
    },

    {
      label:
        "Calories Burned",

      value: `${summary.totalCaloriesBurned} kcal`,
    },

    {
      label:
        "Total Duration",

      value: `${summary.totalDuration} mins`,
    },

    {
      label:
        "Top Category",

      value:
        summary.topCategory,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

      {stats.map(
        (stat, index) => (
          <div
            key={index}
            className="rounded-3xl border border-cyan-500/10 bg-white/5 p-5 text-center backdrop-blur-xl"
          >

            <p className="text-sm text-gray-400">
              {stat.label}
            </p>

            <h2 className="mt-3 text-2xl font-black">

              {loading
                ? "..."
                : stat.value}

            </h2>

          </div>
        )
      )}

    </div>
  );
}