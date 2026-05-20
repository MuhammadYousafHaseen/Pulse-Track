import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import WorkoutLog from "@/models/workoutLog.model";
import WeightLog from "@/models/weightLog.model";
import WaterLog from "@/models/waterLog.model";
import Goal from "@/models/goal.model";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(
      authOptions
    );

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const workouts =
      await WorkoutLog.find({
        userId,
      });

    const latestWeight =
      await WeightLog.findOne({
        userId,
      }).sort({
        recordedAt: -1,
      });

    const todayWater =
      await WaterLog.aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const activeGoal =
      await Goal.findOne({
        userId,
        status: "active",
      });

    const totalCaloriesBurned =
      workouts.reduce(
        (acc, curr) =>
          acc +
          (curr.caloriesBurned || 0),
        0
      );

    return NextResponse.json({
      success: true,

      data: {
        totalWorkouts:
          workouts.length,

        totalCaloriesBurned,

        currentWeight:
          latestWeight?.weight || 0,

        bmi: latestWeight?.bmi || 0,

        todayWater:
          todayWater[0]?.total || 0,

        activeGoal,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch overview",
      },
      { status: 500 }
    );
  }
}