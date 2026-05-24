import {
  NextRequest,
  NextResponse,
} from "next/server";

import dbConnect from "@/lib/dbConnect";

import User from "@/models/user.moldel";

import { isAdmin } from "@/lib/isAdmin";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: Params
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

    const { id } = await params;

    const body = await request.json();

    const updatedUser =
      await User.findByIdAndUpdate(
        id,
        {
          isBlocked: body.isBlocked,
        },
        {
          new: true,
        }
      ).select("-password");

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
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

    const { id } = await params;

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
}