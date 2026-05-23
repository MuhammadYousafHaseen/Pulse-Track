"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DietSummary {
  totalCalories: number;
}

export default function NutritionHero() {
  const [calories, setCalories] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/diet");

        const data: DietSummary = res.data?.data;

        setCalories(data?.totalCalories || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-green-500/10 bg-linear-to-br from-green-900 via-black to-black p-6">
      
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 space-y-3">
        <h1 className="text-2xl font-bold text-white">
          Nutrition Tracker 🥗
        </h1>

        <p className="text-sm text-gray-300">
          Track your meals, calories & macros for better fitness results.
        </p>

        <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
          <div>
            <p className="text-xs text-gray-400">Today&apos;s Calories</p>
            <p className="text-2xl font-bold text-green-400">
              {calories} kcal
            </p>
          </div>

          <div className="text-xs text-gray-400">
            Stay consistent 🔥
          </div>
        </div>
      </div>
    </section>
  );
}