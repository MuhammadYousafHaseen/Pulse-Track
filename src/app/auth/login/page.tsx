"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

import { signInSchema } from "@/schemas/signInSchema";
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
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result) {
        notify("No response from server", "error");
        return;
      }

      if (result.error) {
        notify(result.error || "Invalid email or password", "error");
        return;
      }

      if (result.ok) {
        notify("Login successful 🚀", "success");
        router.replace("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      notify("Something went wrong during login", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-blue-950 to-green-950 px-4">

      <div className="w-full max-w-md p-6 rounded-2xl border border-blue-500/20 bg-black/40 backdrop-blur-xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-blue-300 text-sm">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="bg-black/30 border-blue-500/30 text-white focus:ring-green-500"
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
                  <FormLabel className="text-blue-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className="bg-black/30 border-blue-500/30 text-white focus:ring-green-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SUBMIT */}
            <Button
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-blue-600 to-green-500 text-white font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

          </form>
        </Form>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-green-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Page;