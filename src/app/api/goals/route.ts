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