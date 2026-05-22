"use client";

type Workout = {
  exerciseName?: string;

  category?: string;

  workoutDate?: string;
};

type Props = {
  workouts: Workout[];
};

export default function RecentActivity({
  workouts,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-bold">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">
        {workouts.length === 0 ? (
          <p className="text-gray-400">
            No recent workouts
          </p>
        ) : (
          workouts
            .slice(0, 5)
            .map((workout, index) => (
              <div
                key={index}
                className="rounded-2xl bg-black/30 p-4"
              >
                <p className="font-semibold">
                  {workout.exerciseName}
                </p>

                <p className="mt-1 text-sm text-cyan-400">
                  {workout.category}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {workout.workoutDate
                    ? new Date(
                        workout.workoutDate
                      ).toLocaleDateString()
                    : "No date"}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}