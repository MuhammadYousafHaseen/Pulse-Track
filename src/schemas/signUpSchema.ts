import { z } from "zod";

/**
 * Username validation
 */
export const nameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 30 characters long")
  .regex(/^[A-Za-z0-9_]+$/, {
    message:
      "Only letters, numbers and underscores allowed",
  });

export const signUpSchema = z.object({
  name: nameValidation,

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  image: z.string().url().optional(),

  gender: z.enum([
    "male",
    "female",
    "other",
  ]),

  age: z.coerce
    .number()
    .min(10)
    .max(120),

  height: z.coerce
    .number()
    .positive(),

  currentWeight: z.coerce
    .number()
    .positive(),

  targetWeight: z.coerce
    .number()
    .positive()
    .optional(),

  activityLevel: z
    .enum([
      "beginner",
      "intermediate",
      "advanced",
    ])
    .optional(),

  goalType: z
    .enum([
      "weight_loss",
      "muscle_gain",
      "maintain_fitness",
    ])
    .optional(),

  dailyCalorieGoal: z.coerce
    .number()
    .positive()
    .optional(),

  waterGoal: z.coerce
    .number()
    .positive()
    .optional(),
});