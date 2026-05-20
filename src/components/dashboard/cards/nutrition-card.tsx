"use client";

type Props = {
  protein: number;

  carbs: number;

  fats: number;
};

export default function NutritionCard({
  protein,
  carbs,
  fats,
}: Props) {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-bold">
        Nutrition
      </h2>

      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            Protein
          </span>

          <span className="font-bold">
            {protein}g
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            Carbs
          </span>

          <span className="font-bold">
            {carbs}g
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">
            Fats
          </span>

          <span className="font-bold">
            {fats}g
          </span>
        </div>
      </div>

      <div className="mt-10 h-28 rounded-2xl bg-linear-to-r from-cyan-500/10 to-green-500/10" />
    </div>
  );
}