"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { UtensilsCrossed, Flame, Target } from "lucide-react";

type DietPlan = {
  _id: string;
  title: string;
  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";
  totalCalories: number;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export default function DietPlansSection() {
  const [diets, setDiets] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDiets = async () => {
      try {
        setLoading(true);

        const res = await axios.get<ApiResponse<DietPlan[]>>(
          "/api/admin/diet-plans"
        );

        setDiets(res.data?.data || []);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log("Failed to fetch diets:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiets();

    return () => controller.abort();
  }, []);

  const formatGoal = (goal: DietPlan["goalType"]) => {
    switch (goal) {
      case "weight_loss":
        return "Weight Loss";
      case "muscle_gain":
        return "Muscle Gain";
      case "maintain_fitness":
        return "Maintain Fitness";
      default:
        return goal;
    }
  };

  return (
    <div className="space-y-8 px-4 md:px-0">
      <div className="text-center">
        <h2 className="text-3xl font-black md:text-4xl text-white">
          Nutrition Plans
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-400">
          Choose your perfect diet plan to reach your fitness goals
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">
          Loading diet plans...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diets.map((diet) => (
            <div
              key={diet._id}
              className="group relative overflow-hidden rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                  <UtensilsCrossed size={22} />
                </div>

                <span className="text-xs text-gray-400">
                  {formatGoal(diet.goalType)}
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white">
                {diet.title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-gray-300">
                <Flame className="text-orange-400" size={18} />
                <span>{diet.totalCalories} kcal/day</span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Target size={14} />
                  Fitness Goal
                </div>

                <button className="rounded-xl bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 hover:bg-cyan-500/20">
                  View Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}