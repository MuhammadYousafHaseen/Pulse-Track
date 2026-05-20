"use client";

import { useEffect, useState } from "react";

import DashboardGrid from "@/components/dashboard/dashboard-grid";

import DashboardHeader from "@/components/dashboard/sections/dashboard-header";

interface DashboardData {
  overview: any;
  workouts: any;
  water: any;
  weight: any;
  goals: any;
  diet: any;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboardData =
      async () => {
        try {
          const response = await fetch(
            "/api/dashboard"
          );

          const data =
            await response.json();

          if (data.success) {
            setDashboardData(data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardGrid
        dashboardData={dashboardData}
      />
    </div>
  );
}