import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.moldel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
      image,
      gender,
      age,
      height,
      currentWeight,
      targetWeight,
      activityLevel,
      goalType,
      dailyCalorieGoal,
      waterGoal,
    } = body;

    // Normalize inputs
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();


    // Required fields validation
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      age === undefined ||
      height === undefined ||
      currentWeight === undefined
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Name, email, password, gender, age, height and currentWeight are required",
        },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 }
      );
    }

    // Existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // BMI Calculation
    let bmi: number | undefined = undefined;

    if (height > 0 && currentWeight > 0) {
      const heightInMeters = height / 100;

      bmi = parseFloat(
        (currentWeight / (heightInMeters * heightInMeters)).toFixed(2)
      );
    }

    // Create user
    const newUser = await User.create({
      name: normalizedName,
      email : normalizedEmail,
      password: hashedPassword,

      image: image || undefined,

      role: "user",

      gender,
      age,

      isBlocked: false,

      height,
      currentWeight,

      targetWeight: targetWeight || undefined,

      bmi,

      activityLevel: activityLevel || undefined,

      goalType: goalType || undefined,

      dailyCalorieGoal: dailyCalorieGoal || undefined,

      waterGoal: waterGoal || 2000,
    });

    return Response.json(
      {
        success: true,
        message: "User registered successfully",

        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while registering user",
      },
      { status: 500 }
    );
  }
}