"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DietLog {
  protein?: number;
  carbs?: number;
  fats?: number;
}

export default function MacroBreakdown() {
  const [logs, setLogs] = useState<DietLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/diet");
        const data = res.data?.data?.dietLogs || [];
        setLogs(data);
      } catch (err) {
        console.error("Failed to fetch macros", err);
      }
    };

    fetchData();
  }, []);

  const protein = logs.reduce((a, b) => a + (b.protein || 0), 0);
  const carbs = logs.reduce((a, b) => a + (b.carbs || 0), 0);
  const fats = logs.reduce((a, b) => a + (b.fats || 0), 0);

  const total = protein + carbs + fats || 1;

  return (
    <div className="space-y-4 rounded-2xl border border-green-500/10 bg-gray-900 p-5">
      <h2 className="text-lg font-bold text-white">
        Macro Breakdown 🧬
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MacroCard label="Protein" value={protein} total={total} color="bg-blue-400" />
        <MacroCard label="Carbs" value={carbs} total={total} color="bg-yellow-400" />
        <MacroCard label="Fats" value={fats} total={total} color="bg-purple-400" />
      </div>

      <p className="text-xs text-gray-400">
        Based on your logged meals 🍽️
      </p>
    </div>
  );
}

/* ========================= */
/* MACRO CARD               */
/* ========================= */

function MacroCard({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percent = Math.round((value / total) * 100);

  // convert percentage → Tailwind width class (NO INLINE STYLE)
  const widthClass = getWidthClass(percent);

  return (
    <div className="space-y-2 rounded-xl bg-black/40 p-4">
      <p className="text-sm text-gray-400">{label}</p>

      <p className="text-xl font-bold text-white">
        {value}g
      </p>

      {/* progress bar */}
      <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500 ${widthClass}`} />
      </div>

      <p className="text-xs text-gray-500">{percent}%</p>
    </div>
  );
}

/* ========================= */
/* WIDTH MAPPER (TAILWIND)  */
/* ========================= */

function getWidthClass(percent: number): string {
  if (percent <= 5) return "w-[5%]";
  if (percent <= 10) return "w-[10%]";
  if (percent <= 20) return "w-[20%]";
  if (percent <= 30) return "w-[30%]";
  if (percent <= 40) return "w-[40%]";
  if (percent <= 50) return "w-[50%]";
  if (percent <= 60) return "w-[60%]";
  if (percent <= 70) return "w-[70%]";
  if (percent <= 80) return "w-[80%]";
  if (percent <= 90) return "w-[90%]";
  return "w-full";
}