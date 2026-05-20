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