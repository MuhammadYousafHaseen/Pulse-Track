import { z } from "zod";

/**
 * Username validation
 */
export const nameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 30 characters long")
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Only letters, numbers and underscores allowed (no spaces)",
  });

/**
 * Signup schema (FITNESS APP VERSION)
 */
export const signUpSchema = z.object({
  name: nameValidation,

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),

  image: z.string().url().optional(),

  gender: z.enum(["male", "female", "other"]),

  age: z
    .number()
    .int("Age must be a whole number")
    .min(10, "Age must be at least 10")
    .max(120, "Age must be realistic"),

  height: z
    .number()
    .positive("Height must be greater than 0"),

  currentWeight: z
    .number()
    .positive("Weight must be greater than 0"),

  targetWeight: z.number().positive().optional(),

  activityLevel: z
    .enum(["beginner", "intermediate", "advanced"])
    .optional(),

  goalType: z
    .enum(["weight_loss", "muscle_gain", "maintain_fitness"])
    .optional(),

  dailyCalorieGoal: z.number().positive().optional(),

  waterGoal: z.number().positive().optional(),
});