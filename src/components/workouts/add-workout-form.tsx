"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

interface WorkoutFormData {
  exerciseName: string;
  category: string;
  duration: number;
  sets: number;
  reps: number;
  caloriesBurned: number;
  notes?: string;
  workoutDate: string;
}

const exercises = [
  "Push Ups",
  "Squats",
  "Bench Press",
  "Running",
  "Deadlift",
];

const categories = [
  "Strength",
  "Cardio",
  "HIIT",
  "Core",
  "Flexibility",
];

export default function AddWorkoutForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<WorkoutFormData>();

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      const response = await axios.post("/api/workouts", {
        ...data,
        duration: Number(data.duration),
        sets: Number(data.sets),
        reps: Number(data.reps),
        caloriesBurned: Number(data.caloriesBurned),
        workoutDate: new Date(data.workoutDate).toISOString(),
      });

      reset();

      // ✅ SUCCESS NOTIFY
      notify(
        response.data?.message || "Workout added successfully 💪",
        "success"
      );

      // ✅ refresh history
      onSuccess?.();
    } catch (error) {
      console.error("Error adding workout:", error);

      notify("Failed to save workout ❌", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900 p-4 sm:p-6"
    >
      <h2 className="text-lg font-bold text-white sm:text-xl">
        Add Workout
      </h2>

      {/* EXERCISE */}
      <select
        title="Select Exercise Name"
        {...register("exerciseName", { required: true })}
        className="w-full rounded-lg bg-black p-2 text-white"
      >
        <option value="">Exercise Name</option>
        {exercises.map((e, i) => (
          <option key={i} value={e}>
            {e}
          </option>
        ))}
      </select>

      {/* CATEGORY */}
      <select
        title="Select Workout Category"
        {...register("category", { required: true })}
        className="w-full rounded-lg bg-black p-2 text-white"
      >
        <option value="">Category</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* INPUT GRID */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          title="Duration in minutes"
          type="number"
          placeholder="Duration"
          {...register("duration", { required: true })}
          className="rounded-lg bg-black p-2 text-white"
        />

        <input
          title="Calories burned"
          type="number"
          placeholder="Calories"
          {...register("caloriesBurned")}
          className="rounded-lg bg-black p-2 text-white"
        />

        <input
          title="Sets"
          type="number"
          placeholder="Sets"
          {...register("sets")}
          className="rounded-lg bg-black p-2 text-white"
        />

        <input
          title="Reps"
          type="number"
          placeholder="Reps"
          {...register("reps")}
          className="rounded-lg bg-black p-2 text-white"
        />
      </div>

      {/* DATE */}
      <input
        title="Workout Date"
        type="date"
        {...register("workoutDate", { required: true })}
        className="w-full rounded-lg bg-black p-2 text-white"
      />

      {/* NOTES */}
      <textarea
        title="Notes"
        {...register("notes")}
        className="w-full rounded-lg bg-black p-2 text-white"
        placeholder="Notes..."
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-green-600 py-2 font-semibold text-black transition hover:bg-green-500 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Workout"}
      </button>
    </form>
  );
}