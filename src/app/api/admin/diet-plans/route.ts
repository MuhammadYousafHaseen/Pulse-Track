import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import DietPlan from "@/models/dietPlan.model";
import { isAdmin } from "@/lib/isAdmin";

// ✅ PUBLIC: anyone can view diet plans
export async function GET() {
  try {
    await dbConnect();

    const dietPlans = await DietPlan.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: dietPlans,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch diet plans",
      },
      { status: 500 }
    );
  }
}

// 🔒 ADMIN ONLY: create diet plan
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

    const dietPlan = await DietPlan.create(body);

    return NextResponse.json({
      success: true,
      data: dietPlan,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create diet plan",
      },
      { status: 500 }
    );
  }
}