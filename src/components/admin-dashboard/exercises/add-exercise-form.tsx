"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  category: string;
  muscleGroup: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

type Props = {
  refresh: () => void;
};

export default function AddExerciseForm({ refresh }: Props) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      category: "",
      muscleGroup: "",
      difficulty: "beginner",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      await axios.post("/api/admin/exercises", data);

      reset();

      refresh();
    } catch (error) {
      console.log("Exercise create error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-2xl border border-cyan-500/10 bg-white/5 p-4 backdrop-blur-xl md:grid-cols-4"
    >
      <Input placeholder="Exercise name" {...register("name")} />

      <Input placeholder="Category (strength, cardio)" {...register("category")} />

      <Input placeholder="Muscle Group (chest, legs...)" {...register("muscleGroup")} />

      <select
        className="rounded-md border border-cyan-500/20 bg-transparent p-2 text-white"
        {...register("difficulty")}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Exercise"}
      </Button>
    </form>
  );
}