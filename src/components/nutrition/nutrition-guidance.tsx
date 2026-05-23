"use client";

export default function NutritionGuidance() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">
        Nutrition Guidance 🧠
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <GuidanceCard
          title="Weight Loss"
          color="text-red-400"
          items={[
            "Eat high protein meals",
            "Reduce sugar intake",
            "Maintain calorie deficit",
            "Increase fiber (vegetables)",
            "Avoid processed foods",
          ]}
        />

        <GuidanceCard
          title="Muscle Gain"
          color="text-blue-400"
          items={[
            "Increase protein intake",
            "Eat calorie surplus",
            "Include strength training",
            "Eat frequent meals",
            "Stay hydrated",
          ]}
        />

        <GuidanceCard
          title="Maintenance"
          color="text-green-400"
          items={[
            "Balanced macros",
            "Consistent meal timing",
            "Avoid overeating",
            "Moderate workouts",
            "Stay active daily",
          ]}
        />
      </div>
    </section>
  );
}

/* ========================= */
/* CARD COMPONENT           */
/* ========================= */

function GuidanceCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-green-500/10 bg-gray-900 p-5 space-y-3">
      <h3 className={`text-lg font-bold ${color}`}>
        {title}
      </h3>

      <ul className="space-y-2 text-sm text-gray-300">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-green-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}