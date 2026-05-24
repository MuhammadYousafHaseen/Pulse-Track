"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  title: string;
  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";
  totalCalories: number;
};

type Props = {
  refresh: () => void;
};

export default function AddDietPlanForm({ refresh }: Props) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      goalType: "weight_loss",
      totalCalories: 2000,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      await axios.post("/api/admin/diet-plans", {
        ...data,
        totalCalories: Number(data.totalCalories),
      });

      reset();

      refresh();
    } catch (error) {
      console.log("Diet create error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-2xl border border-cyan-500/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-4"
    >
      <Input placeholder="Diet Title" {...register("title")} />

      <select
        className="rounded-md border border-cyan-500/20 bg-transparent p-2 text-white"
        {...register("goalType")}
      >
        <option value="weight_loss">Weight Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
        <option value="maintain_fitness">Maintain Fitness</option>
      </select>

      <Input
        type="number"
        placeholder="Total Calories"
        {...register("totalCalories")}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Plan"}
      </Button>
    </form>
  );
}