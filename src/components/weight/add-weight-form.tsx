"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

interface FormData {
  weight: number;
}

export default function AddWeightForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { register, handleSubmit, reset } =
    useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/weight", {
        weight: Number(data.weight),
      });

      notify("Weight logged successfully", "success");

      reset();
      onSuccess?.();
    } catch (err) {
      console.log(err);
      notify("Failed to log weight", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl bg-gray-900 p-4"
    >
      <input
        type="number"
        placeholder="Enter weight (kg)"
        {...register("weight")}
        className="w-full rounded bg-black p-2 text-white"
      />

      <button className="mt-3 w-full rounded cursor-pointer bg-green-600 py-2">
        Save Weight
      </button>
    </form>
  );
}