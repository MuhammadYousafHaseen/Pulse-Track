"use client";

type Props = {
  bmi: number;

  currentWeight: number;
};

export default function BMICard({
  bmi,
  currentWeight,
}: Props) {
  const bmiStatus =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
      ? "Healthy"
      : bmi < 30
      ? "Overweight"
      : "Obese";

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400">
            BMI Score
          </p>

          <h2 className="mt-2 text-5xl font-black">
            {bmi.toFixed(1)}
          </h2>
        </div>

        <div className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
          {bmiStatus}
        </div>
      </div>

      <div className="mt-10 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            Current Weight
          </span>

          <span className="font-semibold">
            {currentWeight} kg
          </span>
        </div>
      </div>
    </div>
  );
}