import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWorkoutLog extends Document {
  userId: mongoose.Types.ObjectId;

  exerciseName: string;
  category: string;

  duration?: number;
  sets?: number;
  reps?: number;

  caloriesBurned?: number;

  notes?: string;

  workoutDate: Date;
}

const workoutLogSchema: Schema<IWorkoutLog> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exerciseName: {
      type: String,
      required: [true, "Exercise name is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    duration: {
      type: Number,
    },

    sets: {
      type: Number,
    },

    reps: {
      type: Number,
    },

    caloriesBurned: {
      type: Number,
    },

    notes: {
      type: String,
    },

    workoutDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const WorkoutLog: Model<IWorkoutLog> =
  mongoose.models.WorkoutLog ||
  mongoose.model<IWorkoutLog>("WorkoutLog", workoutLogSchema);

export default WorkoutLog;