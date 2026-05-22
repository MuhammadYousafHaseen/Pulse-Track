"use client";

import { useMemo } from "react";

import AnalyticsChart from "./charts/analytics-chart";

import WorkoutLoadChart from "./charts/workout-load-chart";

import ProgressCard from "./cards/progress-card";

import BMICard from "./cards/bmi-card";

import GoalsCard from "./cards/goals-card";

import NutritionCard from "./cards/nutrition-card";

import WaterCard from "./cards/water-card";

import RunnerHero from "./sections/runner-hero";

import RecentActivity from "./sections/recent-activity";

import WorkoutPlan from "./sections/workout-plan";

import StatCard from "./cards/stat-card";

import {
  Flame,
  HeartPulse,
  Dumbbell,
  Droplets,
} from "lucide-react";

type WorkoutType = {
  workoutType?: string;

  caloriesBurned?: number;

  duration?: number;

  workoutDate?: string;
};

type GoalType = {
  title?: string;

  targetValue?: number;

  currentValue?: number;
};

type DietLogType = {
  protein?: number;

  carbs?: number;

  fats?: number;
};

type DashboardData = {
  overview?: {
    data?: {
      totalWorkouts?: number;

      totalCaloriesBurned?: number;

      currentWeight?: number;

      bmi?: number;

      todayWater?: number;

      activeGoal?: {
        title?: string;

        targetValue?: number;

        currentValue?: number;
      };
    };
  };

  workouts?: {
    data?: WorkoutType[];
  };

  water?: {
    data?: {
      totalWater?: number;
    };
  };

  weight?: {
    data?: Array<{
      weight?: number;

      bmi?: number;

      recordedAt?: string;
    }>;
  };

  goals?: {
    data?: GoalType[];
  };

  diet?: {
    data?: {
      totalCalories?: number;

      dietLogs?: DietLogType[];
    };
  };
};

type Props = {
  dashboardData: DashboardData | null;
};

type NutritionTotalsType = {
  protein: number;

  carbs: number;

  fats: number;
};

export default function DashboardGrid({
  dashboardData,
}: Props) {
  const data = dashboardData;

  const overview =
    data?.overview?.data;

  const workouts: WorkoutType[] =
    data?.workouts?.data || [];

  const goals: GoalType[] =
    data?.goals?.data || [];

  const nutritionTotals =
    useMemo<NutritionTotalsType>(() => {
      const dietLogs: DietLogType[] =
        data?.diet?.data?.dietLogs || [];

      return dietLogs.reduce<NutritionTotalsType>(
        (acc, curr) => {
          acc.protein +=
            curr.protein || 0;

          acc.carbs +=
            curr.carbs || 0;

          acc.fats +=
            curr.fats || 0;

          return acc;
        },
        {
          protein: 0,
          carbs: 0,
          fats: 0,
        }
      );
    }, [data?.diet?.data?.dietLogs]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

      {/* TOP STATS */}

      <div className="lg:col-span-3">
        <StatCard
          title="Calories Burned"
          value={`${
            overview?.totalCaloriesBurned || 0
          }`}
          icon={<Flame size={28} />}
          increase="+12%"
        />
      </div>

      <div className="lg:col-span-3">
        <StatCard
          title="Total Workouts"
          value={`${
            overview?.totalWorkouts || 0
          }`}
          icon={<Dumbbell size={28} />}
          increase="+18%"
        />
      </div>

      <div className="lg:col-span-3">
        <StatCard
          title="BMI"
          value={`${overview?.bmi || 0}`}
          icon={<HeartPulse size={28} />}
          increase="-3%"
        />
      </div>

      <div className="lg:col-span-3">
        <StatCard
          title="Water Intake"
          value={`${
            overview?.todayWater || 0
          } ml`}
          icon={<Droplets size={28} />}
          increase="+8%"
        />
      </div>

      {/* RUNNER HERO */}

      <div className="lg:col-span-5">
        <RunnerHero />
      </div>

      {/* ANALYTICS */}

      <div className="lg:col-span-7">
        <AnalyticsChart
          workouts={workouts}
        />
      </div>

      {/* SECOND ROW */}

      <div className="lg:col-span-4">
        <ProgressCard
          totalWorkouts={
            overview?.totalWorkouts || 0
          }
          caloriesBurned={
            overview?.totalCaloriesBurned ||
            0
          }
        />
      </div>

      <div className="lg:col-span-4">
        <BMICard
          bmi={overview?.bmi || 0}
          currentWeight={
            overview?.currentWeight || 0
          }
        />
      </div>

      <div className="lg:col-span-4">
        <GoalsCard goals={goals} />
      </div>

      {/* THIRD ROW */}

      <div className="lg:col-span-4">
        <NutritionCard
          protein={
            nutritionTotals.protein
          }
          carbs={
            nutritionTotals.carbs
          }
          fats={nutritionTotals.fats}
        />
      </div>

      <div className="lg:col-span-4">
        <WaterCard
          waterIntake={
            overview?.todayWater || 0
          }
        />
      </div>

      <div className="lg:col-span-4">
        <WorkoutLoadChart
          workouts={workouts}
        />
      </div>

      {/* FOURTH ROW */}

      <div className="lg:col-span-6">
        <RecentActivity
          workouts={workouts}
        />
      </div>

      <div className="lg:col-span-6">
        <WorkoutPlan />
      </div>

    </div>
  );
}