export default function WeightGuidance() {
  return (
    <div className="rounded-xl bg-gray-900 p-5 space-y-3">
      <h2 className="text-xl font-bold">Guidance</h2>

      <div>
        <h3 className="text-green-400">Lose Weight</h3>
        <p className="text-sm text-gray-400">
          Calorie deficit + cardio + consistency
        </p>
      </div>

      <div>
        <h3 className="text-blue-400">Maintain</h3>
        <p className="text-sm text-gray-400">
          Balanced diet + moderate activity
        </p>
      </div>

      <div>
        <h3 className="text-purple-400">Gain Weight</h3>
        <p className="text-sm text-gray-400">
          Calorie surplus + strength training
        </p>
      </div>
    </div>
  );
}