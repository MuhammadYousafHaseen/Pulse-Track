import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWeightLog extends Document {
  userId: mongoose.Types.ObjectId;

  weight: number;

  bmi?: number;

  bodyFatPercentage?: number;

  recordedAt: Date;
}

const weightLogSchema: Schema<IWeightLog> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },

    bmi: {
      type: Number,
    },

    bodyFatPercentage: {
      type: Number,
    },

    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const WeightLog: Model<IWeightLog> =
  mongoose.models.WeightLog ||
  mongoose.model<IWeightLog>("WeightLog", weightLogSchema);

export default WeightLog;