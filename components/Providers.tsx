"use client";
import React from "react";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import AuthWrapper from "@/components/wrappers/AuthWrapper";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <AuthWrapper>
          <Toaster />
          {children}
        </AuthWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
}
