import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ToastListener from "@/components/ToastListener";

import "./globals.css";

import AuthSessionProvider from "@/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseTrack",
  description: "Modern Fitness Tracking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthSessionProvider>
          <ToastListener />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}