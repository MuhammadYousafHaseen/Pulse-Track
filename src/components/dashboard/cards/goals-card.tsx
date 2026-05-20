"use client";

import { Progress } from "@/components/ui/progress";

type Goal = {
  title?: string;

  targetValue?: number;

  currentValue?: number;
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
              goal.targetValue &&
              goal.currentValue
                ? (goal.currentValue /
                    goal.targetValue) *
                  100
                : 0;

            return (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <span>
                    {goal.title}
                  </span>

                  <span>
                    {goal.currentValue}/
                    {goal.targetValue}
                  </span>
                </div>

                <Progress
                  value={progress}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}