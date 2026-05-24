"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  Dumbbell,
  UtensilsCrossed,
  ShieldCheck,
} from "lucide-react";

type StatsType = {
  totalUsers: number;
  totalExercises: number;
  totalDietPlans: number;
  blockedUsers: number;
};

const initialStats: StatsType = {
  totalUsers: 0,
  totalExercises: 0,
  totalDietPlans: 0,
  blockedUsers: 0,
};

export default function AdminStatCards() {
  const [stats, setStats] = useState<StatsType>(initialStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, exercisesRes, dietsRes] = await Promise.all([
          axios.get("/api/admin/users"),
          axios.get("/api/admin/exercises"),
          axios.get("/api/admin/diet-plans"),
        ]);

        const users = usersRes.data?.data || [];
        const exercises = exercisesRes.data?.data || [];
        const diets = dietsRes.data?.data || [];

        const blockedUsers = users.filter(
          (user: { isBlocked?: boolean }) => user.isBlocked
        ).length;

        setStats({
          totalUsers: users.length,
          totalExercises: exercises.length,
          totalDietPlans: diets.length,
          blockedUsers,
        });
      } catch (error) {
        console.log("Failed to load stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
    },
    {
      title: "Exercises",
      value: stats.totalExercises,
      icon: Dumbbell,
    },
    {
      title: "Diet Plans",
      value: stats.totalDietPlans,
      icon: UtensilsCrossed,
    },
    {
      title: "Blocked Users",
      value: stats.blockedUsers,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{card.title}</p>
                <h2 className="mt-4 text-4xl font-black">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-2xl bg-linear-to-r from-cyan-500/20 to-green-500/20 p-4 text-cyan-400">
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}