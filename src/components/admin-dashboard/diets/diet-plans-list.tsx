"use client";

type DietType = {
  _id: string;
  title: string;
  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";
  totalCalories: number;
};

type Props = {
  diets: DietType[];
  loading: boolean;
};

export default function DietPlansList({ diets, loading }: Props) {
  const formatGoal = (goal: string) => {
    switch (goal) {
      case "weight_loss":
        return "Weight Loss";
      case "muscle_gain":
        return "Muscle Gain";
      case "maintain_fitness":
        return "Maintain Fitness";
      default:
        return goal;
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-cyan-500/10 bg-white/5 backdrop-blur-xl">
      <table className="w-full min-w-150 text-left">
        <thead className="border-b border-cyan-500/10 text-gray-400">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Goal Type</th>
            <th className="p-4">Calories</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                Loading diet plans...
              </td>
            </tr>
          ) : diets.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                No diet plans found
              </td>
            </tr>
          ) : (
            diets.map((diet) => (
              <tr
                key={diet._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="p-4 font-medium text-white">
                  {diet.title}
                </td>

                <td className="p-4 text-gray-300">
                  {formatGoal(diet.goalType)}
                </td>

                <td className="p-4 text-cyan-300">
                  {diet.totalCalories} kcal
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}