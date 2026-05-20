import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import WeightLog from "@/models/weightLog.model";

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

    const weights =
      await WeightLog.find({
        userId: session.user.id,
      }).sort({
        recordedAt: 1,
      });

    return NextResponse.json({
      success: true,
      data: weights,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch weight logs",
      },
      { status: 500 }
    );
  }
}