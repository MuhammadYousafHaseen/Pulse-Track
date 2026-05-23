"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DietLog {
  _id: string;
  mealType: string;
  foodName: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  mealDate: string;
}

interface WaterLog {
  _id: string;
  amount: number;
  date: string;
}

export default function MealHistory({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const [meals, setMeals] = useState<DietLog[]>([]);
  const [water, setWater] = useState<WaterLog[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dietRes, waterRes] = await Promise.all([
          axios.get("/api/diet"),
          axios.get("/api/water"),
        ]);

        setMeals(dietRes.data?.data?.dietLogs || []);
        setWater(waterRes.data?.data?.waterLogs || []);
      } catch (err) {
        console.error("Failed to fetch nutrition data", err);
      }
    };

    fetchData();
  }, [refreshKey]);

  const visibleMeals = showAll ? meals : meals.slice(0, 4);
  const visibleWater = showAll ? water : water.slice(0, 4);

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-white">
        Nutrition History 🍽️ + 💧
      </h2>

      {/* MEALS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleMeals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>

      {/* WATER */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {visibleWater.map((w) => (
          <WaterCard key={w._id} water={w} />
        ))}
      </div>

      {meals.length > 4 || water.length > 4 ? (
        <button
          onClick={() => setShowAll((p) => !p)}
          className="text-sm text-green-400"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      ) : null}
    </section>
  );
}

/* ========================= */
/* MEAL CARD                */
/* ========================= */

function MealCard({ meal }: { meal: DietLog }) {
  return (
    <div className="rounded-2xl border border-green-500/10 bg-gray-900 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-green-400">
          {meal.foodName}
        </h3>
        <span className="text-xs text-gray-400">
          {meal.mealType}
        </span>
      </div>

      <p className="text-sm text-gray-300">
        Calories: {meal.calories}
      </p>

      <div className="flex gap-3 text-xs text-gray-400">
        <span>P: {meal.protein || 0}g</span>
        <span>C: {meal.carbs || 0}g</span>
        <span>F: {meal.fats || 0}g</span>
      </div>
    </div>
  );
}

/* ========================= */
/* WATER CARD               */
/* ========================= */

function WaterCard({ water }: { water: WaterLog }) {
  return (
    <div className="rounded-2xl border border-blue-500/10 bg-gray-900 p-4 space-y-2">
      <h3 className="font-bold text-blue-400">
        Water Intake 💧
      </h3>

      <p className="text-sm text-gray-300">
        {water.amount} ml
      </p>

      <p className="text-xs text-gray-500">
        {new Date(water.date).toLocaleDateString()}
      </p>
    </div>
  );
}