"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

type Workout = {
  caloriesBurned?: number;

  duration?: number;

  workoutDate?: string;
};

type Props = {
  workouts: Workout[];
};

export default function AnalyticsChart({
  workouts,
}: Props) {
  const data = workouts.map(
    (workout) => ({
      day: workout.workoutDate
        ? new Date(
            workout.workoutDate
          ).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          )
        : "N/A",

      calories:
        workout.caloriesBurned || 0,

      workout:
        workout.duration || 0,
    })
  );

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Weekly Performance Insights
        </h2>

        <p className="mt-2 text-gray-400">
          Workout analytics
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="day" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="calories"
              stroke="#22d3ee"
              strokeWidth={4}
            />

            <Line
              type="monotone"
              dataKey="workout"
              stroke="#4ade80"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}