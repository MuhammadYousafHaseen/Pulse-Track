import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import WorkoutLog from "@/models/workoutLog.model";

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
        },
        { status: 401 }
      );
    }

    const workouts =
      await WorkoutLog.find({
        userId: session.user.id,
      }).sort({
        workoutDate: -1,
      });

    return NextResponse.json({
      success: true,
      data: workouts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch workouts",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    await dbConnect();

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const {
      exerciseName,
      category,
      duration,
      caloriesBurned,
      workoutDate,
    } = body;

    if (
      !exerciseName ||
      !category ||
      !duration ||
      !caloriesBurned
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All workout fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const workout =
      await WorkoutLog.create({
        userId: session.user.id,

        exerciseName,

        category,

        duration,

        caloriesBurned,

        workoutDate:
          workoutDate || new Date(),
      });

    return NextResponse.json(
      {
        success: true,
        data: workout,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create workout",
      },
      {
        status: 500,
      }
    );
  }
}