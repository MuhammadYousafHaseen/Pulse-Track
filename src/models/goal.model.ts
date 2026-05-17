import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;

  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";

  targetWeight?: number;

  targetCaloriesBurn?: number;

  startDate?: Date;

  endDate?: Date;

  status: "active" | "completed" | "cancelled";
}

const goalSchema: Schema<IGoal> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goalType: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "maintain_fitness"],
      required: true,
    },

    targetWeight: {
      type: Number,
    },

    targetCaloriesBurn: {
      type: Number,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Goal: Model<IGoal> =
  mongoose.models.Goal || mongoose.model<IGoal>("Goal", goalSchema);

export default Goal;