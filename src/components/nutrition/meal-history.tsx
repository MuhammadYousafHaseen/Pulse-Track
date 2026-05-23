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

export default function MealHistory({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const [meals, setMeals] = useState<DietLog[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get("/api/diet");

        const data: DietLog[] =
          res.data?.data?.dietLogs || [];

        setMeals(data);
      } catch (err) {
        console.error("Failed to fetch meals", err);
      }
    };

    fetchMeals();
  }, [refreshKey]);

  const visibleMeals = showAll ? meals : meals.slice(0, 4);

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold text-white">
        Meal History 🍽️
      </h2>

      {meals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900 p-6 text-center text-gray-400">
          No meals logged yet
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {visibleMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>

          {meals.length > 4 && (
            <button
              onClick={() => setShowAll((p) => !p)}
              className="text-sm text-green-400 hover:text-green-300"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      )}
    </section>
  );
}

/* ========================= */
/* CARD COMPONENT           */
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
        Calories: {meal.calories} kcal
      </p>

      <div className="flex gap-3 text-xs text-gray-400">
        <span>P: {meal.protein || 0}g</span>
        <span>C: {meal.carbs || 0}g</span>
        <span>F: {meal.fats || 0}g</span>
      </div>

      <p className="text-xs text-gray-500">
        {new Date(meal.mealDate).toLocaleDateString()}
      </p>
    </div>
  );
}