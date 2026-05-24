"use client";

import { useMemo } from "react";

import { useSearchParams } from "next/navigation";

import UsersManagement from "../users/users-management";

import ExerciseManagement from "../exercises/exercise-management";

import DietManagement from "../diets/diet-management";

import AdminStatCards from "./admin-stat-cards";

export default function AdminDashboardWrapper() {
  const searchParams =
    useSearchParams();

  const currentTab = useMemo(
    () =>
      searchParams.get("tab") ||
      "dashboard",
    [searchParams]
  );

  return (
    <div className="space-y-8">

      {/* TOP STATISTICS */}

      <AdminStatCards />

      {/* DYNAMIC CONTENT */}

      <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-4 backdrop-blur-xl md:p-6">

        {currentTab ===
          "dashboard" && (
          <div className="space-y-4">

            <h2 className="text-3xl font-black">
              Welcome Admin
            </h2>

            <p className="max-w-3xl text-gray-400">
              Manage your platform users,
              exercises and diet plans
              from one central futuristic
              dashboard panel.
            </p>

          </div>
        )}

        {currentTab === "users" && (
          <UsersManagement />
        )}

        {currentTab ===
          "exercises" && (
          <ExerciseManagement />
        )}

        {currentTab === "diets" && (
          <DietManagement />
        )}

      </div>

    </div>
  );
}