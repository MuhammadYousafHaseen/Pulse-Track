import mongoose, { Schema, Document, Model } from "mongoose";

interface IMeal {
  mealType: string;
  food: string;
  calories: number;
}

export interface IDietPlan extends Document {
  title: string;

  description?: string;

  goalType: "weight_loss" | "muscle_gain" | "maintain_fitness";

  meals: IMeal[];

  totalCalories: number;

  createdBy?: mongoose.Types.ObjectId;
}

const mealSchema = new Schema<IMeal>(
  {
    mealType: {
      type: String,
      required: true,
    },

    food: {
      type: String,
      required: true,
    },

    calories: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const dietPlanSchema: Schema<IDietPlan> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    description: {
      type: String,
    },

    goalType: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "maintain_fitness"],
      required: true,
    },

    meals: {
      type: [mealSchema],
      default: [],
    },

    totalCalories: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const DietPlan: Model<IDietPlan> =
  mongoose.models.DietPlan ||
  mongoose.model<IDietPlan>("DietPlan", dietPlanSchema);

export default DietPlan;