import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [
      overview,
      workouts,
      water,
      weight,
      goals,
      diet,
    ] = await Promise.all([
      fetch(
        `${process.env.NEXTAUTH_URL}/api/dashboard/overview`
      ).then((res) => res.json()),

      fetch(
        `${process.env.NEXTAUTH_URL}/api/dashboard/workouts`
      ).then((res) => res.json()),

      fetch(
        `${process.env.NEXTAUTH_URL}/api/dashboard/water`
      ).then((res) => res.json()),

      fetch(
        `${process.env.NEXTAUTH_URL}/api/dashboard/weight`
      ).then((res) => res.json()),

      fetch(
        `${process.env.NEXTAUTH_URL}/api/dashboard/goals`
      ).then((res) => res.json()),

      fetch(
        `${process.env.NEXTAUTH_URL}/api/dashboard/diet`
      ).then((res) => res.json()),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        overview,
        workouts,
        water,
        weight,
        goals,
        diet,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}