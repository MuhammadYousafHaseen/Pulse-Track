import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;

  role: "user" | "admin";

  gender?: "male" | "female" | "other";
  age?: number;
  isBlocked?: boolean;

  height?: number;

  activityLevel?: "beginner" | "intermediate" | "advanced";

  dailyCalorieGoal?: number;
  waterGoal?: number;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    image: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    age: {
      type: Number,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    height: {
      type: Number,
    },

    activityLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },

    dailyCalorieGoal: {
      type: Number,
    },

    waterGoal: {
      type: Number,
      default: 2000,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
