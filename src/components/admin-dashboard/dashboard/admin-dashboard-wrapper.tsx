"use client";

import { useSearchParams } from "next/navigation";

import UsersManagement from "../users/users-management";
import ExerciseManagement from "../exercises/exercise-management";
import DietManagement from "../diets/diet-management";
import AdminStatCards from "./admin-stat-cards";

export default function AdminDashboardWrapper() {
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") ?? "dashboard";

  return (
    <div className="space-y-8">
      <AdminStatCards />

      <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-4 backdrop-blur-xl md:p-6">
        {currentTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-black">Welcome Admin</h2>
          </div>
        )}

        {currentTab === "users" && <UsersManagement />}
        {currentTab === "exercises" && <ExerciseManagement />}
        {currentTab === "diets" && <DietManagement />}
      </div>
    </div>
  );
}