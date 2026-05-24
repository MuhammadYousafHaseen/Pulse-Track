"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import AddDietPlanForm from "./add-diet-plan-form";
import DietPlansList from "./diet-plans-list";

type DietType = {
  _id: string;
  title: string;
  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";
  totalCalories: number;
};

export default function DietManagement() {
  const [diets, setDiets] = useState<DietType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDiets = async () => {
    try {
      const res = await axios.get("/api/admin/diet-plans");
      setDiets(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await fetchDiets();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black">Diet Management</h2>
        <p className="text-gray-400">
          Create and manage nutrition plans
        </p>
      </div>

      <AddDietPlanForm refresh={fetchDiets} />

      <DietPlansList diets={diets} loading={loading} />
    </div>
  );
}