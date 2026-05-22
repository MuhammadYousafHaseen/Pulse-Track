"use client";

import { useEffect, useState } from "react";

import DashboardGrid from "@/components/dashboard/dashboard-grid";

import DashboardHeader from "@/components/dashboard/sections/dashboard-header";

import type {
  DashboardData,
} from "@/types/dashboard";

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
          const [
            overviewRes,
            workoutsRes,
            waterRes,
            weightRes,
            goalsRes,
            dietRes,
          ] = await Promise.all([
            fetch("/api/overview"),

            fetch("/api/workouts"),

            fetch("/api/water"),

            fetch("/api/weight"),

            fetch("/api/goals"),

            fetch("/api/diet"),
          ]);

          const [
            overview,
            workouts,
            water,
            weight,
            goals,
            diet,
          ] = await Promise.all([
            overviewRes.json(),

            workoutsRes.json(),

            waterRes.json(),

            weightRes.json(),

            goalsRes.json(),

            dietRes.json(),
          ]);

          setDashboardData({
            overview,
            workouts,
            water,
            weight,
            goals,
            diet,
          });
        } catch (error) {
          console.error(
            "Dashboard fetch error:",
            error
          );
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