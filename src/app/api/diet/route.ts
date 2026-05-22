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
    console.log(error);
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
      mealType,
      calories,
      protein,
      carbs,
      fats,
      foodName,
      quantity,
      mealDate,
    } = body;

    if (
      !mealType ||
      calories === undefined ||
      protein === undefined ||
      carbs === undefined ||
      fats === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All diet fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const diet =
      await DietLog.create({
        userId: session.user.id,
        mealType,
        calories,
        protein,
        carbs,
        fats,
        quantity,
        mealDate,
        foodName,
      });

    return NextResponse.json(
      {
        success: true,
        data: diet,
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
          "Failed to create diet log",
      },
      {
        status: 500,
      }
    );
  }
}