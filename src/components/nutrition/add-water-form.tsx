"use client";

import { useState } from "react";
import axios from "axios";
import { notify } from "@/lib/notify";

type Props = {
  onSuccess?: () => void;
};

export default function AddWaterForm({ onSuccess }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || amount <= 0) {
      notify("Please enter valid water amount", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/water", {
        amount,
      });

      notify(
        res.data?.message || "Water added successfully 💧",
        "success"
      );

      setAmount(0);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      notify("Failed to add water", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-500/10 bg-gray-900 p-5 space-y-4">
      <h2 className="text-lg font-bold text-white">
        Add Water Intake 💧
      </h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter water (ml)"
        className="w-full rounded-xl bg-black/40 p-3 text-white outline-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-xl bg-blue-500 py-2 font-semibold text-black hover:bg-blue-400 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Water"}
      </button>
    </div>
  );
}