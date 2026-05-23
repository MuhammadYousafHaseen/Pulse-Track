"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import BMIcard from "./bmi-card";

interface Weight {
  weight: number;
  bmi: number;
  bodyFatPercentage?: number;
}

export default function WeightStats({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [latest, setLatest] = useState<Weight | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/weight");
        const data = res.data?.data || [];

        setLatest(data[data.length - 1] || null);
      } catch (err) {
        console.error("WeightStats error:", err);
      }
    })();
  }, [refreshKey]); // 🔥 IMPORTANT FIX

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      
      <div className="rounded-xl bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Current Weight</p>
        <h2 className="text-2xl font-bold text-green-400">
          {latest?.weight ?? 0} kg
        </h2>
      </div>

      <BMIcard bmi={latest?.bmi ?? 0} />

      <div className="rounded-xl bg-gray-900 p-4">
        <p className="text-sm text-gray-400">Body Fat</p>
        <h2 className="text-2xl font-bold text-purple-400">
          {latest?.bodyFatPercentage ?? 0}%
        </h2>
      </div>

    </div>
  );
}