"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import AddExerciseForm from "./add-exercise-form";
import ExercisesList from "./exercises-list";

type ExerciseType = {
  _id: string;
  name: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
};

export default function ExerciseManagement() {
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      const res = await axios.get("/api/admin/exercises");
      setExercises(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        await fetchExercises();
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black">Exercise Management</h2>
        <p className="text-gray-400">
          Add and publish fitness exercises
        </p>
      </div>

      <AddExerciseForm refresh={fetchExercises} />

      <ExercisesList exercises={exercises} loading={loading} />
    </div>
  );
}