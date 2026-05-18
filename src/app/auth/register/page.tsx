"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounceCallback } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signUpSchema } from "@/schemas/signUpSchema";
import type { ApiResponse } from "@/types/ApiResponse";

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
import { Loader2 } from "lucide-react";
import { notify } from "@/lib/notify";
import { z } from "zod";

const Page = () => {
  const router = useRouter();

  const [usernameMessage, setUsernameMessage] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "male",
      age: undefined,
      height: undefined,
      currentWeight: undefined,
    },
  });

const username = useWatch({
  control: form.control,
  name: "name",
});

 const debouncedCheck = useDebounceCallback(async (value: string) => {
  if (!value || value.length < 3) return;

  setCheckingUsername(true);

  try {
    const res = await axios.get(
      `/api/check-username-unique?name=${value}`
    );

    setUsernameMessage(res.data.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    setUsernameMessage(
      axiosError.response?.data.message || "Error checking username"
    );
  } finally {
    setCheckingUsername(false);
  }
}, 500);

useEffect(() => {
  if (!username) return;
  debouncedCheck(username);
}, [username, debouncedCheck]);
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setSubmitting(true);

    try {
      const res = await axios.post<ApiResponse>(
        "/api/user/signup",
        data
      );

      // ✅ SUCCESS NOTIFY (replaced toast)
      notify(res.data.message || "Account created successfully", "success");

      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      // ❌ ERROR NOTIFY (replaced toast)
      notify(
        axiosError.response?.data.message || "Signup failed",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-blue-950 to-green-950 px-4">

      <div className="w-full max-w-md p-6 rounded-2xl border border-blue-500/20 bg-black/40 backdrop-blur-xl">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-blue-300 text-sm">
            Fitness AI onboarding 🚀
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Username */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-300">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="haseen_dev"
                      className="bg-black/30 border-blue-500/30 text-white focus:ring-green-500"
                    />
                  </FormControl>

                  {checkingUsername && (
                    <p className="text-blue-400 text-xs">Checking...</p>
                  )}

                  {usernameMessage && (
                    <p
                      className={`text-xs ${
                        usernameMessage.includes("available")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/30 border-blue-500/30 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="bg-black/30 border-blue-500/30 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <Button
              disabled={submitting}
              className="w-full bg-linear-to-r from-blue-600 to-green-500 text-white"
            >
              {submitting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Create Account"
              )}
            </Button>

          </form>
        </Form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Page;