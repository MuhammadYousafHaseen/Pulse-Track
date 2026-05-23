"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface WeeklyProgressData {
  day: string;
  calories: number;
}

const weeklyProgressData: WeeklyProgressData[] = [
  {
    day: "Mon",
    calories: 300,
  },
  {
    day: "Tue",
    calories: 500,
  },
  {
    day: "Wed",
    calories: 200,
  },
  {
    day: "Thu",
    calories: 450,
  },
  {
    day: "Fri",
    calories: 600,
  },
  {
    day: "Sat",
    calories: 350,
  },
  {
    day: "Sun",
    calories: 400,
  },
];

export default function WeeklyProgressChart() {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900 to-black p-4 sm:p-6">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div>
          <p className="text-sm text-green-400">
            Weekly Analytics
          </p>

          <h2 className="text-2xl font-bold text-white">
            Weekly Progress
          </h2>
        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
          🔥 2,800 kcal this week
        </div>
      </div>

      {/* CHART */}
      <div className="h-65 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          
          <BarChart
            data={weeklyProgressData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
            />

            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <YAxis
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#ffffff",
              }}
              cursor={{
                fill: "rgba(34,197,94,0.1)",
              }}
            />

            <Bar
              dataKey="calories"
              radius={[10, 10, 0, 0]}
              fill="#22C55E"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER STATS */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        
        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-xs text-gray-400">
            Highest Burn
          </p>

          <h3 className="mt-1 text-lg font-bold text-white">
            600 kcal
          </h3>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-xs text-gray-400">
            Avg Daily
          </p>

          <h3 className="mt-1 text-lg font-bold text-white">
            400 kcal
          </h3>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-xs text-gray-400">
            Active Days
          </p>

          <h3 className="mt-1 text-lg font-bold text-white">
            7 Days
          </h3>
        </div>

        <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
          <p className="text-xs text-gray-400">
            Performance
          </p>

          <h3 className="mt-1 text-lg font-bold text-green-400">
            Excellent
          </h3>
        </div>
      </div>
    </section>
  );
}