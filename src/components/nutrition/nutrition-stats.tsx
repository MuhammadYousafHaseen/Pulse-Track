"use client";

import { useEffect, useState } from "react";

import axios from "axios";

interface DietLog {
  calories: number;

  protein?: number;

  carbs?: number;

  fats?: number;
}

type Props = {
  refreshKey?: number;
};

export default function NutritionStats({
  refreshKey,
}: Props) {
  const [logs, setLogs] = useState<
    DietLog[]
  >([]);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const res =
            await axios.get(
              "/api/diet"
            );

          const data =
            res.data?.data
              ?.dietLogs || [];

          setLogs(data);
        } catch (err) {
          console.error(err);
        }
      };

    fetchData();
  }, [refreshKey]);

  const totalCalories =
    logs.reduce(
      (a, b) =>
        a + b.calories,
      0
    );

  const totalProtein =
    logs.reduce(
      (a, b) =>
        a +
        (b.protein || 0),
      0
    );

  const totalCarbs =
    logs.reduce(
      (a, b) =>
        a + (b.carbs || 0),
      0
    );

  const totalFats =
    logs.reduce(
      (a, b) =>
        a + (b.fats || 0),
      0
    );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

      <Stat
        label="Calories"
        value={totalCalories}
        color="text-green-400"
      />

      <Stat
        label="Protein"
        value={totalProtein}
        color="text-blue-400"
      />

      <Stat
        label="Carbs"
        value={totalCarbs}
        color="text-yellow-400"
      />

      <Stat
        label="Fats"
        value={totalFats}
        color="text-purple-400"
      />

    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;

  value: number;

  color: string;
}) {
  return (
    <div className="rounded-xl bg-gray-900 p-4">

      <p className="text-sm text-gray-400">
        {label}
      </p>

      <p
        className={`text-2xl font-bold ${color}`}
      >
        {value}
      </p>

    </div>
  );
}