import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.moldel";
import { z } from "zod";
import { nameValidation } from "@/schemas/signUpSchema";

// Query schema
const UsernameQuerySchema = z.object({
  name: nameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const rawName = searchParams.get("name");

    // 1. Basic null check
    if (!rawName) {
      return Response.json(
        {
          success: false,
          message: "Name query parameter is required",
        },
        { status: 400 }
      );
    }

    // 2. Normalize input (VERY IMPORTANT)
    const QueryParam = {
      name: rawName.trim().toLowerCase(),
    };

    // 3. Zod validation
    const result = UsernameQuerySchema.safeParse(QueryParam);

    if (!result.success) {
      const nameErrors = result.error.format().name?._errors || [];

      return Response.json(
        {
          success: false,
          message:
            nameErrors.length > 0
              ? nameErrors.join(", ")
              : "Invalid name format",
        },
        { status: 400 }
      );
    }

    const { name } = result.data;

    // 4. Efficient DB check
    const existingUser = await User.exists({
      name: name,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          available: false,
          message: "Username already taken",
        },
        { status: 409 }
      );
    }

    // 5. Success response
    return Response.json(
      {
        success: true,
        available: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}