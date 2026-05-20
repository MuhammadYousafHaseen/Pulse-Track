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