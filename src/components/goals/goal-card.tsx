"use client";

interface Goal {
  _id: string;
  goalType: string;
  status: string;
  targetWeight?: number;
  targetCaloriesBurn?: number;
  startDate: string;
  endDate: string;
}

export default function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      
      <h3 className="text-lg font-bold text-cyan-400">
        {goal.goalType}
      </h3>

      <p className="text-sm text-gray-400">
        Status: {goal.status}
      </p>

      <div className="mt-2 space-y-1 text-sm text-gray-300">
        {goal.targetWeight && (
          <p>⚖️ Target Weight: {goal.targetWeight} kg</p>
        )}

        {goal.targetCaloriesBurn && (
          <p>🔥 Calories: {goal.targetCaloriesBurn}</p>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500">
        📅 {new Date(goal.startDate).toDateString()} →{" "}
        {new Date(goal.endDate).toDateString()}
      </p>
    </div>
  );
}