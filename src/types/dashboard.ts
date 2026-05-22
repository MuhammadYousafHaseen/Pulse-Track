export type WorkoutType = {
  exerciseName?: string;
  category?: string;
  caloriesBurned?: number;
  duration?: number;
  workoutDate?: string;
};

export type GoalType = {
  goalType?: string;
  targetWeight?: number;
  targetCaloriesBurn?: number;
  status?: string;
};

export type DietLogType = {
  protein?: number;
  carbs?: number;
  fats?: number;
  calories?: number;
};

export type DashboardData = {
  overview?: {
    success?: boolean;
    data?: {
      totalWorkouts?: number;
      totalCaloriesBurned?: number;
      currentWeight?: number;
      bmi?: number;
      todayWater?: number;
    };
  };

  workouts?: {
    success?: boolean;
    data?: WorkoutType[];
  };

  water?: {
    success?: boolean;
    data?: {
      totalWater?: number;
    };
  };

  weight?: {
    success?: boolean;
    data?: Array<{
      weight?: number;
      bmi?: number;
      recordedAt?: string;
    }>;
  };

  goals?: {
    success?: boolean;
    data?: GoalType[];
  };

  diet?: {
    success?: boolean;
    data?: {
      totalCalories?: number;
      dietLogs?: DietLogType[];
    };
  };
};