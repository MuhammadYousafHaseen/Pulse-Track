import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import WaterLog from "@/models/waterLog.model";

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

    const waterLogs =
      await WaterLog.find({
        userId: session.user.id,
      }).sort({
        date: -1,
      });

    const totalWater =
      waterLogs.reduce(
        (acc, curr) =>
          acc + curr.amount,
        0
      );

    return NextResponse.json({
      success: true,

      data: {
        totalWater,
        waterLogs,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch water logs",
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

    const { amount } = body;

    if (!amount) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Water amount is required",
        },
        {
          status: 400,
        }
      );
    }

    const water =
      await WaterLog.create({
        userId: session.user.id,
        amount,
        date: new Date(),
        
      });

    return NextResponse.json(
      {
        success: true,
        data: water,
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
          "Failed to create water log",
      },
      {
        status: 500,
      }
    );
  }
}