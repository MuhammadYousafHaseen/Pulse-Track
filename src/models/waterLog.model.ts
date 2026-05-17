import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWaterLog extends Document {
  userId: mongoose.Types.ObjectId;

  amount: number;

  date: Date;
}

const waterLogSchema: Schema<IWaterLog> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: [true, "Water amount is required"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const WaterLog: Model<IWaterLog> =
  mongoose.models.WaterLog ||
  mongoose.model<IWaterLog>("WaterLog", waterLogSchema);

export default WaterLog;