"use client";

import { useState } from "react";

import NutritionHero from "@/components/nutrition/nutrition-hero";
import NutritionStats from "@/components/nutrition/nutrition-stats";
import AddMealForm from "@/components/nutrition/add-meal-form";
import AddWaterForm from "@/components/nutrition/add-water-form";
import NutritionGuidance from "@/components/nutrition/nutrition-guidance";
import MealHistory from "@/components/nutrition/meal-history";
import CalorieChart from "@/components/nutrition/calorie-chart";
import MacroBreakdown from "@/components/nutrition/macro-breakdown";
import DietPlansSection from "@/components/nutrition/diet-plans-section";

export default function NutritionPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleNutritionUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-10">
      {/* HERO */}
      <NutritionHero />

      {/* STATS */}
     <NutritionStats
  refreshKey={refreshKey}
/>

      {/* FORMS + GUIDANCE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* MEAL FORM */}
        <AddMealForm
          onSuccess={handleNutritionUpdate}
        />

        {/* WATER FORM */}
        <AddWaterForm
          onSuccess={handleNutritionUpdate}
        />

        {/* GUIDANCE */}
        <NutritionGuidance />
      </div>

      {/* HISTORY */}
      <MealHistory
        refreshKey={refreshKey}
      />

        <DietPlansSection />

      {/* CHART */}
      <CalorieChart
        refreshKey={refreshKey}
      />

      {/* MACRO BREAKDOWN */}
      <MacroBreakdown
        refreshKey={refreshKey}
      />
    </div>
  );
}