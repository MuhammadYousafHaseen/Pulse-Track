import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import DietLog from "@/models/dietLog.model";

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

    const dietLogs =
      await DietLog.find({
        userId: session.user.id,
      }).sort({
        mealDate: -1,
      });

    const totalCalories =
      dietLogs.reduce(
        (acc, curr) =>
          acc + curr.calories,
        0
      );

    return NextResponse.json({
      success: true,

      data: {
        totalCalories,
        dietLogs,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch diet logs",
      },
      { status: 500 }
    );
  }
}