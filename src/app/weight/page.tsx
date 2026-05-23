"use client";

import { useState } from "react";

import WeightHero from "@/components/weight/weight-hero";
import WeightStats from "@/components/weight/weight-stats";
import AddWeightForm from "@/components/weight/add-weight-form";
import WeightHistory from "@/components/weight/weight-history";
import WeightGuidance from "@/components/weight/weight-guidance";
import WeightChart from "@/components/weight/weight-chart";

export default function WeightPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="space-y-10">

      <WeightHero />

      {/* 🔥 BOTH MUST SYNC */}
      <WeightStats refreshKey={refresh} />

      <div className="grid gap-6 lg:grid-cols-2">
        <AddWeightForm onSuccess={() => setRefresh((p) => p + 1)} />
        <WeightGuidance />
      </div>
      <WeightHistory refreshKey={refresh} />

      <WeightChart />



    </div>
  );
}