import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.moldel";

import bcrypt from "bcryptjs";

export async function POST(
  request: Request
) {
  try {
    await dbConnect();

    const body = await request.json();

    const {
      name,
      email,
      password,
      image,
      gender,
      age,
      height,
      activityLevel,
      dailyCalorieGoal,
      waterGoal,
    } = body;

    // -----------------------------
    // Normalize ONLY email
    // -----------------------------

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    // -----------------------------
    // Required validation
    // -----------------------------

    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      age === undefined ||
      height === undefined
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Please fill all required fields",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Password validation
    // -----------------------------

    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          message:
            "Password must be at least 6 characters",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Existing user
    // -----------------------------

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message:
            "Email already registered",
        },
        {
          status: 409,
        }
      );
    }

    // -----------------------------
    // Hash password
    // -----------------------------

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // -----------------------------
    // Create User
    // -----------------------------

    const newUser = await User.create({
      name: name.trim(),

      email: normalizedEmail,

      password: hashedPassword,

      image: image || undefined,

      role: "user",

      isBlocked: false,

      gender,

      age,

      height,

      activityLevel:
        activityLevel || undefined,

      dailyCalorieGoal:
        dailyCalorieGoal ||
        undefined,

      waterGoal: waterGoal || 2000,
    });

    return Response.json(
      {
        success: true,
        message:
          "Account created successfully",

        user: {
          id: newUser._id,

          name: newUser.name,

          email: newUser.email,

          role: newUser.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Signup Error:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Something went wrong during signup",
      },
      {
        status: 500,
      }
    );
  }
  }
