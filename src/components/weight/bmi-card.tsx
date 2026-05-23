"use client";

export default function BMIcard({
  bmi,
}: {
  bmi: number;
}) {
  const getStatus = () => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="rounded-xl bg-gray-900 p-4">
      <h2 className="text-xl font-bold">BMI Status</h2>

      <p className="mt-2 text-3xl text-green-400">
        {bmi}
      </p>

      <p className="text-gray-400">{getStatus()}</p>
    </div>
  );
}