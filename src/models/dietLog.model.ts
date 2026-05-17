import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDietLog extends Document {
  userId: mongoose.Types.ObjectId;

  mealType: "breakfast" | "lunch" | "dinner" | "snack";

  foodName: string;

  calories: number;

  protein?: number;
  carbs?: number;
  fats?: number;

  quantity?: string;

  notes?: string;

  mealDate: Date;
}

const dietLogSchema: Schema<IDietLog> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true,
    },

    foodName: {
      type: String,
      required: [true, "Food name is required"],
    },

    calories: {
      type: Number,
      required: [true, "Calories are required"],
    },

    protein: {
      type: Number,
    },

    carbs: {
      type: Number,
    },

    fats: {
      type: Number,
    },

    quantity: {
      type: String,
    },

    notes: {
      type: String,
    },

    mealDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const DietLog: Model<IDietLog> =
  mongoose.models.DietLog ||
  mongoose.model<IDietLog>("DietLog", dietLogSchema);

export default DietLog;