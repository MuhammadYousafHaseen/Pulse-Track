"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import WorkoutCard from "./workout-card";

interface Workout {
  _id: string;
  exerciseName: string;
  category: string;
  duration?: number;
  sets?: number;
  reps?: number;
  caloriesBurned?: number;
  notes?: string;
  workoutDate: string;
}

export default function WorkoutHistory({
  refreshKey,
}: {
  refreshKey?: number;
}) {
  const [workouts, setWorkouts] = useState<
    Workout[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const [showAll, setShowAll] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          "/api/workouts"
        );

        const data = res.data;

        const normalized: Workout[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.workouts)
            ? data.workouts
            : [];

        if (isMounted) {
          setWorkouts(normalized);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError(
            "Failed to load workouts"
          );

          setWorkouts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  // SHOW FIRST 4 OR ALL
  const visibleWorkouts = showAll
    ? workouts
    : workouts.slice(0, 4);

  if (loading) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">
          Workout History
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({
            length: 4,
          }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-gray-900"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-5">
      {/* HEADER */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-white">
          Workout History
        </h2>

        <span className="text-sm text-green-400">
          Showing{" "}
          {visibleWorkouts.length} of{" "}
          {workouts.length}
        </span>
      </div>

      {/* EMPTY */}
      {workouts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/40 p-6 text-center">
          <p className="text-gray-400">
            No workouts found 💪
          </p>
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {visibleWorkouts.map(
              (workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                />
              )
            )}
          </div>

          {/* SHOW MORE */}
          {workouts.length > 4 && (
            <div className="flex justify-center">
              <button
                onClick={() =>
                  setShowAll(
                    (prev) => !prev
                  )
                }
                className="rounded-full border border-green-500/30 bg-green-500/10 px-6 py-2 text-sm text-green-300 transition hover:bg-green-500/20"
              >
                {showAll
                  ? "Hide Workouts"
                  : "Show More Workouts"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}