interface Workout {
  _id: string;
  exerciseName: string;
  category: string;
  duration?: number;
  sets?: number;
  reps?: number;
  caloriesBurned?: number;
  notes?: string;
  workoutDate: string;
}

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900 to-black p-4 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 sm:p-5">
      
      {/* TOP GLOW */}
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-green-500/10 blur-3xl transition-all duration-500 group-hover:bg-green-500/20" />

      <div className="relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-bold text-green-400 sm:text-xl">
              {workout.exerciseName}
            </h3>

            <p className="mt-1 inline-flex w-fit items-center rounded-full border border-gray-700 bg-gray-800/70 px-3 py-1 text-xs text-gray-300">
              {workout.category}
            </p>
          </div>

          {/* DATE */}
          <div className="text-xs text-gray-500 sm:text-right">
            📅{" "}
            {new Date(workout.workoutDate).toLocaleDateString()}
          </div>
        </div>

        {/* STATS */}
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          
          {workout.duration !== undefined && (
            <div className="rounded-xl border border-gray-800 bg-black/30 p-3">
              <p className="text-xs text-gray-400">
                Duration
              </p>

              <h4 className="mt-1 font-semibold text-white">
                ⏱ {workout.duration} min
              </h4>
            </div>
          )}

          {workout.caloriesBurned !== undefined && (
            <div className="rounded-xl border border-gray-800 bg-black/30 p-3">
              <p className="text-xs text-gray-400">
                Calories
              </p>

              <h4 className="mt-1 font-semibold text-white">
                🔥 {workout.caloriesBurned}
              </h4>
            </div>
          )}

          {workout.sets !== undefined && (
            <div className="rounded-xl border border-gray-800 bg-black/30 p-3">
              <p className="text-xs text-gray-400">
                Sets
              </p>

              <h4 className="mt-1 font-semibold text-white">
                🔁 {workout.sets}
              </h4>
            </div>
          )}

          {workout.reps !== undefined && (
            <div className="rounded-xl border border-gray-800 bg-black/30 p-3">
              <p className="text-xs text-gray-400">
                Reps
              </p>

              <h4 className="mt-1 font-semibold text-white">
                💪 {workout.reps}
              </h4>
            </div>
          )}
        </div>

        {/* NOTES */}
        {workout.notes && (
          <div className="mt-5 rounded-xl border border-green-500/10 bg-green-500/5 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-green-400">
              Notes
            </p>

            <p className="mt-2 wrap-break-word text-sm leading-6 text-gray-300">
              📝 {workout.notes}
            </p>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">
          
          <div className="text-xs text-gray-500">
            Keep pushing forward 💪
          </div>

          <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
            Completed
          </div>
        </div>
      </div>
    </article>
  );
}