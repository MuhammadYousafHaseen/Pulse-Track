"use client";

import { useState } from "react";

import Link from "next/link";

import axios, { AxiosError } from "axios";

import { useRouter } from "next/navigation";

import {
  useForm,
  SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Loader2 } from "lucide-react";

import { signUpSchema } from "@/schemas/signUpSchema";

import type { ApiResponse } from "@/types/ApiResponse";

import { notify } from "@/lib/notify";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

// ========================================
// TYPES
// ========================================

type SignUpFormData = z.output<
  typeof signUpSchema
>;

// ========================================
// COMPONENT
// ========================================

const Page = () => {
  const router = useRouter();

  const [submitting, setSubmitting] =
    useState(false);

  // ========================================
  // FORM
  // ========================================

  const form = useForm<
    z.input<typeof signUpSchema>,
    unknown,
    z.output<typeof signUpSchema>
  >({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
  name: "",

  email: "",

  password: "",

  gender: "male",

  age: 0,

  height: 170,

  activityLevel: "beginner",

  dailyCalorieGoal: 2000,

  waterGoal: 2000,
},
  });

  // ========================================
  // SUBMIT
  // ========================================

  const onSubmit: SubmitHandler<
    SignUpFormData
  > = async (data) => {
    try {
      setSubmitting(true);

      const response =
        await axios.post<ApiResponse>(
          "/api/user/signup",
          data
        );

      notify(
        response.data.message ||
          "Account created successfully",
        "success"
      );

      router.push("/auth/login");
    } catch (error) {
      const axiosError =
        error as AxiosError<ApiResponse>;

      notify(
        axiosError.response?.data
          ?.message || "Signup failed",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ========================================
  // JSX
  // ========================================

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-black via-blue-950 to-green-950 px-4 py-10">
      <div className="w-full max-w-6xl rounded-3xl border border-blue-500/20 bg-black/40 p-8 backdrop-blur-xl">
        {/* HEADER */}

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-blue-300">
            Start your fitness journey 🚀
          </p>
        </div>

        {/* FORM */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* USERNAME */}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Username
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value ?? ""
                        }
                        placeholder="Haseen_Dev"
                        className="border-blue-500/20 bg-black/30 text-white"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL */}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Email
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value ?? ""
                        }
                        type="email"
                        placeholder="you@example.com"
                        className="border-blue-500/20 bg-black/30 text-white"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Password
                    </FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value ?? ""
                        }
                        type="password"
                        placeholder="********"
                        className="border-blue-500/20 bg-black/30 text-white"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* GENDER */}

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Gender
                    </FormLabel>

                    <FormControl>
                      <select
                        aria-label="Select gender"
                        title="Gender"
                        value={
                          field.value ?? ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                          )
                        }
                        className="h-10 w-full rounded-md border border-blue-500/20 bg-black/30 px-3 text-white outline-none"
                      >
                        <option value="male">
                          Male
                        </option>

                        <option value="female">
                          Female
                        </option>

                        <option value="other">
                          Other
                        </option>
                      </select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AGE */}

              <FormField
  control={form.control}
  name="age"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-blue-200">
        Age
      </FormLabel>

      <FormControl>
        <Input
          type="number"
          value={
            typeof field.value === "number"
              ? field.value.toString()
              : ""
          }
          onChange={(e) =>
            field.onChange(
              e.target.value === ""
                ? undefined
                : Number(e.target.value)
            )
          }
          className="border-blue-500/20 bg-black/30 text-white"
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>

              {/* HEIGHT */}

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Height (cm)
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                       value={
  typeof field.value === "number"
    ? field.value.toString()
    : ""
}
                        onChange={(e) =>
                          field.onChange(
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="border-blue-500/20 bg-black/30 text-white"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              

              {/* ACTIVITY LEVEL */}

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Activity Level
                    </FormLabel>

                    <FormControl>
                      <select
                        aria-label="Select activity level"
                        title="Activity Level"
                        value={
                          field.value ?? ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                          )
                        }
                        className="h-10 w-full rounded-md border border-blue-500/20 bg-black/30 px-3 text-white outline-none"
                      >
                        <option value="beginner">
                          Beginner
                        </option>

                        <option value="intermediate">
                          Intermediate
                        </option>

                        <option value="advanced">
                          Advanced
                        </option>
                      </select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              

              {/* DAILY CALORIES */}

              <FormField
                control={form.control}
                name="dailyCalorieGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Daily Calories
                    </FormLabel>

                    <FormControl>
                      <select
                        aria-label="Select daily calorie goal"
                        title="Daily Calorie Goal"
                       value={
  typeof field.value === "number"
    ? field.value.toString()
    : ""
}
                        onChange={(e) =>
                          field.onChange(
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="h-10 w-full rounded-md border border-blue-500/20 bg-black/30 px-3 text-white outline-none"
                      >
                        <option value={1500}>
                          1500 Calories
                        </option>

                        <option value={2000}>
                          2000 Calories
                        </option>

                        <option value={2500}>
                          2500 Calories
                        </option>

                        <option value={3000}>
                          3000 Calories
                        </option>
                      </select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* WATER GOAL */}

              <FormField
                control={form.control}
                name="waterGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-200">
                      Water Goal
                    </FormLabel>

                    <FormControl>
                      <select
                        aria-label="Select water goal"
                        title="Water Goal"
                       value={
  typeof field.value === "number"
    ? field.value.toString()
    : ""
}
                        onChange={(e) =>
                          field.onChange(
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="h-10 w-full rounded-md border border-blue-500/20 bg-black/30 px-3 text-white outline-none"
                      >
                        <option value={1000}>
                          1000 ml
                        </option>

                        <option value={2000}>
                          2000 ml
                        </option>

                        <option value={3000}>
                          3000 ml
                        </option>

                        <option value={4000}>
                          4000 ml
                        </option>
                      </select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SUBMIT BUTTON */}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer bg-linear-to-r from-blue-600 to-green-500 text-white hover:opacity-90"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        {/* FOOTER */}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-green-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
