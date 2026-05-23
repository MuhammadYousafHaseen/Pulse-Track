"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Weight {
  _id: string;
  weight: number;
  bmi: number;
  bodyFatPercentage?: number;
  recordedAt: string;
}

export default function WeightHistory({
  refreshKey,
}: {
  refreshKey: number;
}) {
  const [data, setData] = useState<Weight[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/weight");
      setData(res.data?.data || []);
    })();
  }, [refreshKey]);

  const visible = showAll ? data : data.slice(-4);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Weight History</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {visible
          .slice()
          .reverse()
          .map((w) => (
            <div
              key={w._id}
              className="rounded-xl bg-gray-900 p-4"
            >
              <p>⚖️ {w.weight} kg</p>
              <p>📊 BMI: {w.bmi}</p>
              <p>🔥 Fat: {w.bodyFatPercentage}%</p>
              <p className="text-xs text-gray-400">
                {new Date(w.recordedAt).toDateString()}
              </p>
            </div>
          ))}
      </div>

      {data.length > 4 && (
        <button
          onClick={() => setShowAll((p) => !p)}
          className="text-sm text-cyan-400"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}