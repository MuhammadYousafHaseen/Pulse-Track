"use client";

import { useState } from "react";

import NutritionHero from "@/components/nutrition/nutrition-hero";
import NutritionStats from "@/components/nutrition/nutrition-stats";
import AddMealForm from "@/components/nutrition/add-meal-form";
import NutritionGuidance from "@/components/nutrition/nutrition-guidance";
import MealHistory from "@/components/nutrition/meal-history";
import CalorieChart from "@/components/nutrition/calorie-chart";
import MacroBreakdown from "@/components/nutrition/macro-breakdown";

export default function NutritionPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMealAdded = () => {
    setRefreshKey((p) => p + 1);
  };

  return (
    <div className="space-y-10">
      {/* HERO */}
      <NutritionHero />

      {/* STATS */}
      <NutritionStats />

      {/* FORM + GUIDANCE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AddMealForm onSuccess={handleMealAdded} />
        <NutritionGuidance />
      </div>

      {/* HISTORY (RELOADS ON ADD) */}
      <MealHistory key={refreshKey} />

      {/* CHART */}
      <CalorieChart />

      {/* MACROS */}
      <MacroBreakdown />
    </div>
  );
}