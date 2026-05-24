"use client";

import { useState } from "react";

import WorkoutsHero from "@/components/workouts/workouts-hero";
import WorkoutStats from "@/components/workouts/workout-stats";
import AddWorkoutForm from "@/components/workouts/add-workout-form";
import MotivationSection from "@/components/workouts/motivation-section";
import WorkoutHistory from "@/components/workouts/workout-history";
import WeeklyProgressChart from "@/components/workouts/weekly-progress-chart";
import ExerciseLibrary from "@/components/workouts/exercise-library";
import AchievementBadges from "@/components/workouts/achievement-badges";
import WorkoutStreak from "@/components/workouts/workout-streak";

export default function WorkoutsPage() {
  // ✅ refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ called after adding workout
  const handleWorkoutAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-10">
      {/* HERO */}
      <WorkoutsHero />

      {/* STATS */}
      <WorkoutStats />

      {/* FORM + MOTIVATION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AddWorkoutForm
          onSuccess={handleWorkoutAdded}
        />

        <MotivationSection />
      </div>

      {/* HISTORY */}
      <WorkoutHistory
        refreshKey={refreshKey}
      />

      {/* CHART */}
      <WeeklyProgressChart />

      {/* EXERCISE LIBRARY */}
      <ExerciseLibrary />

      {/* ACHIEVEMENTS + STREAK */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AchievementBadges />
        <WorkoutStreak />
      </div>
    </div>
  );
}