"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Loader2 } from "lucide-react";

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

const Page = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const form = useForm<
    z.infer<typeof signInSchema>
  >({
    resolver: zodResolver(
      signInSchema
    ),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: z.infer<
      typeof signInSchema
    >
  ) => {
    setIsSubmitting(true);

    try {
      const result = await signIn(
        "credentials",
        {
          redirect: false,
          email: data.email,
          password: data.password,
        }
      );

      if (!result) {
        notify(
          "No response from server",
          "error"
        );

        return;
      }

      if (result.error) {
        notify(
          "Invalid email or password",
          "error"
        );

        return;
      }

      /*
        FETCH SESSION
        AFTER LOGIN
      */

      const sessionRes =
        await fetch(
          "/api/auth/session"
        );

      const session =
        await sessionRes.json();

      notify(
        "Login successful 🚀",
        "success"
      );

      /*
        ROLE BASED REDIRECT
      */

      if (
        session?.user?.role ===
        "admin"
      ) {
        router.replace(
          "/admin-dashboard"
        );
      } else {
        router.replace(
          "/dashboard"
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      notify(
        "Something went wrong during login",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-black via-blue-950 to-green-950 px-4 py-10">
      
      <div className="w-full max-w-md rounded-3xl border border-blue-500/20 bg-black/40 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          
          <h1 className="bg-linear-to-r from-blue-400 to-green-400 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-blue-200 sm:text-base">
            Sign in to continue your fitness journey
          </p>

        </div>

        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            
            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({
                field,
              }) => (
                <FormItem>
                  
                  <FormLabel className="text-blue-200">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 border-blue-500/20 bg-black/30 text-white placeholder:text-gray-500 focus-visible:ring-green-500"
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
              render={({
                field,
              }) => (
                <FormItem>
                  
                  <FormLabel className="text-blue-200">
                    Password
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className="h-11 border-blue-500/20 bg-black/30 text-white placeholder:text-gray-500 focus-visible:ring-green-500"
                    />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full cursor-pointer bg-linear-to-r from-blue-600 to-green-500 text-base font-semibold text-white transition hover:opacity-90"
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
        <div className="mt-6 text-center">
          
          <p className="text-sm text-gray-400">
            Don&apos;t have an
            account?{" "}
            <Link
              href="/auth/register"
              className="cursor-pointer font-medium text-green-400 transition hover:text-green-300 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

export default Page;