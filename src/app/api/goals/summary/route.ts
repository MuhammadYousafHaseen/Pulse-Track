import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import Goal from "@/models/goal.model";

export async function GET() {
  try {
    await dbConnect();

    const session =
      await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const goals = await Goal.find({
      userId,
    });

    const totalGoals = goals.length;

    const activeGoals = goals.filter(
      (goal) => goal.status === "active"
    );

    const completedGoals = goals.filter(
      (goal) =>
        goal.status === "completed"
    );

    const cancelledGoals = goals.filter(
      (goal) =>
        goal.status === "cancelled"
    );

    const successRate =
      totalGoals === 0
        ? 0
        : Math.round(
            (completedGoals.length /
              totalGoals) *
              100
          );

    return NextResponse.json({
      success: true,

      data: {
        totalGoals,

        activeGoalsCount:
          activeGoals.length,

        completedGoalsCount:
          completedGoals.length,

        cancelledGoalsCount:
          cancelledGoals.length,

        successRate,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch goals summary",
      },
      { status: 500 }
    );
  }
}