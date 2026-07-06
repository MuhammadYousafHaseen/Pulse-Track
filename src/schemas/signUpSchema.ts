import { z } from "zod";

// ========================================
// USERNAME VALIDATION
// ========================================

export const nameValidation = z
  .string()
  .min(
    2,
    "Name must be at least 2 characters"
  )
  .max(
    20,
    "Name must not exceed 20 characters"
  )
  .regex(
    /^[a-zA-Z0-9_ ]+$/,
    "Name can only contain letters, numbers, spaces, and underscores"
  );

// ========================================
// SIGNUP SCHEMA
// ========================================

export const signUpSchema = z.object({
  name: nameValidation,

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),

  image: z.string().optional(),

  gender: z.enum([
    "male",
    "female",
    "other",
  ]),

  age: z.coerce
    .number()
    .min(10)
    .max(100),

  height: z.coerce
    .number()
    .min(50)
    .max(300),

  activityLevel: z
    .enum([
      "beginner",
      "intermediate",
      "advanced",
    ])
    .optional(),

  dailyCalorieGoal: z.coerce
    .number()
    .min(1000)
    .max(10000)
    .optional(),

  waterGoal: z.coerce
    .number()
    .min(500)
    .max(10000)
    .optional(),
});
