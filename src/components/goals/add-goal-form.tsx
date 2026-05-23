"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

interface GoalFormData {
  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";
  targetWeight: number;
  targetCaloriesBurn: number;
  status: "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
}

export default function AddGoalForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } =
    useForm<GoalFormData>();

  const onSubmit = async (data: GoalFormData) => {
    try {
      const res = await axios.post("/api/goals", {
        ...data,
        targetWeight: Number(data.targetWeight),
        targetCaloriesBurn: Number(data.targetCaloriesBurn),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      });

      notify(res.data?.message || "Goal created 🎯", "success");

      reset();
      onSuccess?.();
    } catch (err) {
      console.log(err);
      notify("Failed to create goal ❌", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-gray-800 bg-gray-900 p-4"
    >
      <h2 className="text-xl font-bold">Add Goal</h2>

      {/* GOAL TYPE */}
      <select
        title="Goal Type"
        {...register("goalType", { required: true })}
        className="w-full rounded-lg bg-black p-2"
      >
        <option value="">Select Goal Type</option>
        <option value="weight_loss">Weight Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
        <option value="maintain_fitness">Maintain Fitness</option>
      </select>

      {/* STATUS */}
      <select
        title="Goal Status"
        {...register("status", { required: true })}
        className="w-full rounded-lg bg-black p-2"
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* NUMBERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          title="Target Weight"
          type="number"
          placeholder="Target Weight"
          {...register("targetWeight")}
          className="rounded-lg bg-black p-2"
        />

        <input
          title="Target Calories Burn"
          type="number"
          placeholder="Calories Burn"
          {...register("targetCaloriesBurn")}
          className="rounded-lg bg-black p-2"
        />
      </div>

      {/* DATES */}
      <input
        title="Start Date"
        type="date"
        {...register("startDate", { required: true })}
        className="w-full rounded-lg bg-black p-2"
      />

      <input
        title="End Date"
        type="date"
        {...register("endDate", { required: true })}
        className="w-full rounded-lg bg-black p-2"
      />

      <button
        disabled={isSubmitting}
        className="w-full rounded-lg cursor-pointer bg-green-600 py-2 text-black font-semibold"
      >
        {isSubmitting ? "Saving..." : "Create Goal"}
      </button>
    </form>
  );
}