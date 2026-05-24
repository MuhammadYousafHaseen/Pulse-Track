import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";

import User from "@/models/user.moldel";

import { isAdmin } from "@/lib/isAdmin";

type UserRole = "user" | "admin";

type FilterType = {
  name?: {
    $regex: string;
    $options: string;
  };

  role?: UserRole;
};

export async function GET(
  request: NextRequest
) {
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

    const search =
      request.nextUrl.searchParams.get(
        "search"
      ) || "";

    const role =
      request.nextUrl.searchParams.get(
        "role"
      );

    const filter: FilterType = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (
      role === "user" ||
      role === "admin"
    ) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}