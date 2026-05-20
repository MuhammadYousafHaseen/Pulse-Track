"use client";

const plans = [
  {
    name: "Morning Run",
    duration: "45m",
  },
  {
    name: "Strength",
    duration: "45m",
  },
  {
    name: "Yoga",
    duration: "30m",
  },
];

export default function WorkoutPlan() {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">

      <h2 className="text-xl font-bold">
        Workout Plan
      </h2>

      <div className="mt-6 space-y-4">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex items-center justify-between rounded-2xl bg-black/30 p-4"
          >
            <div>
              <h4 className="font-semibold">
                {plan.name}
              </h4>

              <p className="text-sm text-gray-400">
                Upcoming Session
              </p>
            </div>

            <span className="text-green-400">
              {plan.duration}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}