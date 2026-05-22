"use client";

import { Progress } from "@/components/ui/progress";

type Goal = {
  goalType?: string;

  targetWeight?: number;

  targetCaloriesBurn?: number;

  status?: string;
};

type Props = {
  goals: Goal[];
};

export default function GoalsCard({
  goals,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">
        Goals Tracker
      </h2>

      <div className="mt-8 space-y-6">
        {goals.length === 0 ? (
          <p className="text-gray-400">
            No goals found
          </p>
        ) : (
          goals.map((goal, index) => {
            const progress =
              goal.status === "completed"
                ? 100
                : 65;

            return (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="capitalize">
                    {goal.goalType?.replaceAll(
                      "_",
                      " "
                    )}
                  </span>

                  <span>
                    {goal.status}
                  </span>
                </div>

                <Progress
                  value={progress}
                />

                <div className="mt-2 text-sm text-gray-400">
                  {goal.targetWeight &&
                    `Target Weight: ${goal.targetWeight} kg`}

                  {goal.targetCaloriesBurn &&
                    `Calories Goal: ${goal.targetCaloriesBurn}`}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}