import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import Exercise from "@/models/exercise.model";
import { isAdmin } from "@/lib/isAdmin";

// ✅ PUBLIC: Anyone logged in can view exercises
export async function GET() {
  try {
    await dbConnect();

    const exercises = await Exercise.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: exercises,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exercises",
      },
      { status: 500 }
    );
  }
}

// 🔒 ADMIN ONLY: Create exercise
export async function POST(request: NextRequest) {
  try {
    const admin = await isAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    const exercise = await Exercise.create(body);

    return NextResponse.json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create exercise",
      },
      { status: 500 }
    );
  }
}