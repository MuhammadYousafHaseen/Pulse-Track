import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import dbConnect from "@/lib/dbConnect";

import WeightLog from "@/models/weightLog.model";

import User from "@/models/user.moldel";

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
    console.log(error);

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

export async function POST(request: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const body = await request.json();
    const { weight } = body;

    if (!weight) {
      return NextResponse.json(
        { success: false, message: "Weight is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user || !user.height) {
      return NextResponse.json(
        { success: false, message: "User or height missing" },
        { status: 400 }
      );
    }

    // BMI CALC
    const heightInMeters = user.height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Number(bmi.toFixed(2));

    // 🔥 BODY FAT ESTIMATION (NEW)
    const age = user.age || 25; // fallback
    const bodyFat =
      1.2 * roundedBMI + 0.23 * age - 16.2;

    const roundedBodyFat = Number(bodyFat.toFixed(2));

    const weightLog = await WeightLog.create({
      userId: session.user.id,
      weight,
      bmi: roundedBMI,
      bodyFatPercentage: roundedBodyFat,
      recordedAt: new Date(),
    });

    // update user
    user.currentWeight = weight;
    user.bmi = roundedBMI;

    await user.save();

    return NextResponse.json({
      success: true,
      data: weightLog,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Failed to create weight log" },
      { status: 500 }
    );
  }
}