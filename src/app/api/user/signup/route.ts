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

    // Required fields check
    if (!name || !email || !password || !height || !image || !currentWeight || !targetWeight || !activityLevel || !goalType   || !dailyCalorieGoal    || !gender || !age  || !waterGoal) {
      return Response.json(
        {
          success: false,
          message: "Name, email, password, height, image, currentWeight, targetWeight, activityLevel, goalType, dailyCalorieGoal, gender, age, and waterGoal are required",
        },
        { status: 400 }
      );
    }

    // Check existing user
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

    // -------------------------------
    // 🧠 BMI CALCULATION LOGIC
    // -------------------------------
    let bmi: number | undefined = undefined;

    if (height && currentWeight) {
      const heightInMeters = height / 100;

      if (heightInMeters > 0) {
        bmi = parseFloat(
          (currentWeight / (heightInMeters * heightInMeters)).toFixed(2)
        );
      }
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: image || undefined,

      gender,
      age,
      height,
      currentWeight,
      targetWeight,

      bmi, // ✅ stored here

      activityLevel,
      goalType,

      dailyCalorieGoal,

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
          image: newUser.image,
          role: newUser.role,

          gender: newUser.gender,
          age: newUser.age,

          height: newUser.height,
          currentWeight: newUser.currentWeight,
          targetWeight: newUser.targetWeight,

          bmi: newUser.bmi, // ✅ now correctly returned

          activityLevel: newUser.activityLevel,
          goalType: newUser.goalType,

          dailyCalorieGoal: newUser.dailyCalorieGoal,
          waterGoal: newUser.waterGoal,
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