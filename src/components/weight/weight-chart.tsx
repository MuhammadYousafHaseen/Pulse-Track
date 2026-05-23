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

/* ========================= */
/* TYPES                    */
/* ========================= */

interface WeightLog {
  weight: number;
  recordedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    weight: number;
    recordedAt: string;
  }[];
}

/* ========================= */
/* COMPONENT                */
/* ========================= */

export default function WeightChart() {
  const [data, setData] = useState<WeightLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<ApiResponse>("/api/weight");

        const logs = res.data?.data ?? [];

        const formatted: WeightLog[] = logs.map((w) => ({
          weight: w.weight,
          recordedAt: new Date(w.recordedAt).toLocaleDateString(),
        }));

        setData(formatted);
      } catch (err) {
        console.error("Failed to load weight chart", err);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return (
      <div className="rounded-2xl bg-gray-900 p-6 text-gray-400">
        No weight data available 📉
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gray-900 p-4 md:p-6">
      <h2 className="mb-4 text-lg font-bold text-white">
        Weight Progress
      </h2>

      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recordedAt" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}