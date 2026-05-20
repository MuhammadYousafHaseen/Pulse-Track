"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

type Workout = {
  duration?: number;
};

type Props = {
  workouts: Workout[];
};

export default function WorkoutLoadChart({
  workouts,
}: Props) {
  const data = workouts.map(
    (workout) => ({
      value:
        workout.duration || 0,
    })
  );

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">
        Workout Load
      </h2>

      <div className="mt-8 h-62.5">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.2}
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}