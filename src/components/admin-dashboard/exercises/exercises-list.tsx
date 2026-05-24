"use client";

type ExerciseType = {
  _id: string;
  name: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
};

type Props = {
  exercises: ExerciseType[];
  loading: boolean;
};

export default function ExercisesList({
  exercises,
  loading,
}: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-cyan-500/10 bg-white/5 backdrop-blur-xl">
      <table className="w-full min-w-175 text-left">
        <thead className="border-b border-cyan-500/10 text-gray-400">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Difficulty</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                Loading exercises...
              </td>
            </tr>
          ) : exercises.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-6 text-center text-gray-400">
                No exercises found
              </td>
            </tr>
          ) : (
            exercises.map((ex) => (
              <tr
                key={ex._id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="p-4 font-medium">{ex.name}</td>
                <td className="p-4 text-gray-300">{ex.category}</td>
                <td className="p-4">
                  <span
                    className={
                      ex.difficulty === "hard"
                        ? "text-red-400"
                        : ex.difficulty === "medium"
                        ? "text-yellow-300"
                        : "text-green-400"
                    }
                  >
                    {ex.difficulty}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}