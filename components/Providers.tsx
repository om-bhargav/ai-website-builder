"use client";
import React, { useState } from "react";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import AuthWrapper from "@/components/wrappers/AuthWrapper";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import SmoothScroll from "./SmoothScroll";
export default function Providers({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange={false}
      >
        <AuthWrapper>
          <Toaster position="top-right" />
          <QueryClientProvider client={queryClient}>
            <SmoothScroll>{children}</SmoothScroll>
          </QueryClientProvider>
        </AuthWrapper>
      </ThemeProvider>
    </SessionProvider>
  );
}
