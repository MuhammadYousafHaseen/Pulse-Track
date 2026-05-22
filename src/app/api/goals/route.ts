import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

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
        },
        { status: 401 }
      );
    }

    const goals = await Goal.find({
      userId: session.user.id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: goals,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch goals",
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

    const body =
      await request.json();

    const {
      goalType,
      targetWeight,
      targetCaloriesBurn,
      status,
       startDate,
       endDate,
    } = body;

    if (
      !goalType||
      targetWeight === undefined ||
      targetCaloriesBurn === undefined ||
      !status ||
      ! startDate ||
      !endDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All goal fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const goal =
      await Goal.create({
        userId: session.user.id,
        goalType,
        targetWeight,
        targetCaloriesBurn,
        status,
        startDate,
        endDate,
      });

    return NextResponse.json(
      {
        success: true,
        data: goal,
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
          "Failed to create goal",
      },
      {
        status: 500,
      }
    );
  }
}