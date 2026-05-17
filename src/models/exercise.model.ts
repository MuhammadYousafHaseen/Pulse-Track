import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExercise extends Document {
  name: string;

  category: string;

  muscleGroup: string;

  description?: string;

  caloriesPerMinute?: number;

  difficulty: "beginner" | "intermediate" | "advanced";

  imageUrl?: string;

  videoUrl?: string;

  createdBy?: mongoose.Types.ObjectId;
}

const exerciseSchema: Schema<IExercise> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Exercise name is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    muscleGroup: {
      type: String,
      required: [true, "Muscle group is required"],
    },

    description: {
      type: String,
    },

    caloriesPerMinute: {
      type: Number,
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    imageUrl: {
      type: String,
    },

    videoUrl: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Exercise: Model<IExercise> =
  mongoose.models.Exercise ||
  mongoose.model<IExercise>("Exercise", exerciseSchema);

export default Exercise;