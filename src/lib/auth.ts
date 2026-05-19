import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.moldel";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          // -----------------------------
          // Validate credentials
          // -----------------------------
          if (
            !credentials?.email ||
            !credentials?.password
          ) {
            return null;
          }

          await dbConnect();

          const email = credentials.email
            .trim()
            .toLowerCase();

          const user = await User.findOne({
            email,
          }).select("+password");

          // -----------------------------
          // User not found
          // -----------------------------
          if (!user) {
            return null;
          }

          // -----------------------------
          // Blocked user
          // -----------------------------
          if (user.isBlocked) {
            return null;
          }

          // -----------------------------
          // Compare password
          // -----------------------------
          const isPasswordCorrect =
            await bcrypt.compare(
              credentials.password,
              user.password
            );

          if (!isPasswordCorrect) {
            return null;
          }

          // -----------------------------
          // Return user object
          // -----------------------------
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error(
            "Authorize Error:",
            error
          );

          return null;
        }
      },
    }),
  ],

  // -----------------------------
  // Session strategy
  // -----------------------------
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  // -----------------------------
  // Pages
  // -----------------------------
  pages: {
    signIn: "/auth/login",
  },

  // -----------------------------
  // Callbacks
  // -----------------------------
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.role =
          token.role as string;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: true,
};