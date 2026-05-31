"use client";

import { useState } from "react";

import GoalsHero from "@/components/goals/goals-hero";
import GoalsStats from "@/components/goals/goals-stats";
import AddGoalForm from "@/components/goals/add-goal-form";
import GoalsHistory from "@/components/goals/goals-history";
import GoalsProgress from "@/components/goals/goals-progress";

export default function GoalsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const onGoalAdded = () => {
    setRefreshKey((p) => p + 1);
  };

  return (
    <div className="space-y-10">
      
      {/* HERO */}
      <GoalsHero />

      {/* STATS */}
      <GoalsStats  refreshKey={refreshKey} />

      {/* FORM + PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AddGoalForm onSuccess={onGoalAdded} />
        <GoalsProgress />
      </div>

      {/* HISTORY */}
      <GoalsHistory key={refreshKey} />

    </div>
  );
}