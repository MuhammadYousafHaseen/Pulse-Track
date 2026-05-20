"use client";

type Props = {
  waterIntake: number;
};

export default function WaterCard({
  waterIntake,
}: Props) {
  const percentage = Math.min(
    (waterIntake / 4000) * 100,
    100
  );

  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">
        Water Intake
      </h2>

      <div className="mt-10 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-black/30 p-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-cyan-400 text-xl font-bold">
            {Math.round(percentage)}%
          </div>

          <p className="mt-3 text-sm text-gray-400">
            {waterIntake} ml
          </p>
        </div>
      </div>
    </div>
  );
}