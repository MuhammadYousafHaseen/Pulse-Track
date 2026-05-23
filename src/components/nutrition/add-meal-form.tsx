"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

interface MealFormData {
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  quantity?: string;
  notes?: string;
  mealDate: string;
}

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

export default function AddMealForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MealFormData>();

  const onSubmit = async (data: MealFormData) => {
    try {
      const res = await axios.post("/api/diet", {
        ...data,
        calories: Number(data.calories),
        protein: Number(data.protein),
        carbs: Number(data.carbs),
        fats: Number(data.fats),
        mealDate: new Date(data.mealDate).toISOString(),
      });

      notify(res.data?.message || "Meal added successfully", "success");

      reset();
      onSuccess?.();
    } catch (err) {
      console.error(err);
      notify("Failed to add meal", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-green-500/10 bg-gray-900 p-4 sm:p-6"
    >
      <h2 className="text-lg font-bold text-white sm:text-xl">
        Add Meal 🍽️
      </h2>

      {/* MEAL TYPE */}
      <select
        title="Select Meal Type"
        {...register("mealType", { required: true })}
        className="w-full rounded-lg bg-black p-2 text-white"
      >
        <option value="">Meal Type</option>
        {mealTypes.map((m, i) => (
          <option key={i} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* FOOD NAME */}
      <input
        title="Food Name"
        placeholder="Food Name"
        {...register("foodName", { required: true })}
        className="w-full rounded-lg bg-black p-2 text-white"
      />

      {/* GRID INPUTS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          title="Calories"
          type="number"
          placeholder="Calories"
          {...register("calories", { required: true })}
          className="rounded-lg bg-black p-2 text-white"
        />

        <input
          title="Protein"
          type="number"
          placeholder="Protein (g)"
          {...register("protein")}
          className="rounded-lg bg-black p-2 text-white"
        />

        <input
          title="Carbs"
          type="number"
          placeholder="Carbs (g)"
          {...register("carbs")}
          className="rounded-lg bg-black p-2 text-white"
        />

        <input
          title="Fats"
          type="number"
          placeholder="Fats (g)"
          {...register("fats")}
          className="rounded-lg bg-black p-2 text-white"
        />
      </div>

      {/* QUANTITY */}
      <input
        title="Quantity"
        placeholder="Quantity (e.g. 1 bowl, 2 slices)"
        {...register("quantity")}
        className="w-full rounded-lg bg-black p-2 text-white"
      />

      {/* DATE */}
      <input
        title="Meal Date"
        type="date"
        {...register("mealDate", { required: true })}
        className="w-full rounded-lg bg-black p-2 text-white"
      />

      {/* NOTES */}
      <textarea
        title="Notes"
        placeholder="Notes..."
        {...register("notes")}
        className="w-full rounded-lg bg-black p-2 text-white"
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-green-600 cursor-pointer py-2 font-semibold text-black transition hover:bg-green-500 disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Meal"}
      </button>
    </form>
  );
}