const stats = [
  { label: "Total Workouts", value: "120" },
  { label: "Calories Burned", value: "14,200 kcal" },
  { label: "Total Duration", value: "52 hrs" },
  { label: "Top Category", value: "Strength" },
];

export default function WorkoutStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-gray-900 rounded-xl p-4 text-center"
        >
          <p className="text-gray-400 text-sm">{s.label}</p>
          <h2 className="text-lg font-bold mt-1">{s.value}</h2>
        </div>
      ))}
    </div>
  );
}