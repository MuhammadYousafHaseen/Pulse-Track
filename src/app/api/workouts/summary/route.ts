import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import mongoose from "mongoose";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import WorkoutLog from "@/models/workoutLog.model";

export async function GET() {
  try {
    await dbConnect();

    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId =
      new mongoose.Types.ObjectId(
        session.user.id
      );

    const workouts =
      await WorkoutLog.find({
        userId,
      });

    const totalWorkouts =
      workouts.length;

    const totalCaloriesBurned =
      workouts.reduce(
        (acc, curr) =>
          acc +
          (curr.caloriesBurned ||
            0),
        0
      );

    const totalDuration =
      workouts.reduce(
        (acc, curr) =>
          acc +
          (curr.duration || 0),
        0
      );

    const categoryMap: Record<
      string,
      number
    > = {};

    workouts.forEach(
      (workout) => {
        const category =
          workout.category;

        categoryMap[
          category
        ] =
          (categoryMap[
            category
          ] || 0) + 1;
      }
    );

    let topCategory =
      "No Category";

    let highest = 0;

    for (const category in categoryMap) {
      if (
        categoryMap[
          category
        ] > highest
      ) {
        highest =
          categoryMap[
            category
          ];

        topCategory =
          category;
      }
    }

    return NextResponse.json({
      success: true,

      data: {
        totalWorkouts,

        totalCaloriesBurned,

        totalDuration,

        topCategory,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch workout summary",
      },
      { status: 500 }
    );
  }
}