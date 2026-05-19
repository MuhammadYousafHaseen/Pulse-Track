"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastCheckedRef = useRef("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "male",
      age: 0,
      height: 0,
      currentWeight: 0,
    },
  });

  const username = useWatch({
    control: form.control,
    name: "name",
  });

  // ✅ username checker
  const checkUsername = async (value: string) => {
    if (!value || value.length < 3) {
      setUsernameMessage("");
      return;
    }

    if (lastCheckedRef.current === value) return;

    try {
      setCheckingUsername(true);

      if (abortRef.current) abortRef.current.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      const res = await axios.get(
        `/api/check-username-unique?name=${value}`,
        { signal: controller.signal }
      );

      lastCheckedRef.current = value;
      setUsernameMessage(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      if (axiosError.name === "CanceledError") return;

      setUsernameMessage(
        axiosError.response?.data.message || "Error checking username"
      );
    } finally {
      setCheckingUsername(false);
    }
  };

  // debounce only trigger
  useEffect(() => {
    if (!username) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      checkUsername(username);
    }, 2000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setSubmitting(true);

      const res = await axios.post<ApiResponse>(
        "/api/user/signup",
        data
      );

      notify(res.data.message || "Account created successfully", "success");
      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

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

      <div className="w-full max-w-lg p-6 rounded-2xl border border-blue-500/20 bg-black/40 backdrop-blur-xl">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-blue-300 text-sm">
            Fitness AI onboarding 🚀
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* NAME */}
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="haseen_dev" />
                </FormControl>

                {checkingUsername && (
                  <p className="text-xs text-blue-400">Checking...</p>
                )}

                {usernameMessage && (
                  <p className="text-xs text-green-400">
                    {usernameMessage}
                  </p>
                )}

                <FormMessage />
              </FormItem>
            )} />

            {/* EMAIL */}
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* PASSWORD */}
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

           

            {/* GENDER */}
            <FormField name="gender" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )} />

            {/* AGE */}
            <FormField name="age" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )} />

            {/* HEIGHT */}
            <FormField name="height" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )} />

            {/* CURRENT WEIGHT */}
            <FormField name="currentWeight" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Current Weight</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )} />

            
            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-linear-to-r from-blue-600 to-green-500"
            >
              {submitting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Create Account"
              )}
            </Button>

          </form>
        </Form>

        <p className="text-center text-sm text-gray-400 mt-4">
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