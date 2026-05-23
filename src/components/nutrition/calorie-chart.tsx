"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";



interface ApiResponse {
  success: boolean;
  data: {
    dietLogs: {
      calories: number;
      mealDate: string;
    }[];
  };
}

interface ChartData {
  date: string;
  calories: number;
}

export default function CalorieChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<ApiResponse>("/api/diet");

        const logs = res.data?.data?.dietLogs || [];

        const formatted: ChartData[] = logs.map((item) => ({
          date: new Date(item.mealDate).toLocaleDateString(),
          calories: item.calories,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Failed to load calorie chart", err);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return (
      <div className="rounded-2xl bg-gray-900 p-6 text-gray-400">
        No calorie data available 📉
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-green-500/10 bg-gray-900 p-4 md:p-6">
      <h2 className="mb-4 text-lg font-bold text-white md:text-xl">
        Calorie Trend 📊
      </h2>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}