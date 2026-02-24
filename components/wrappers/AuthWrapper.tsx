"use client";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AuthStore } from "@/store/AuthInfo";
function AuthWrapper({ children }: React.PropsWithChildren) {
  const { setTheme } = useTheme();
  const { data, status } = useSession();
  const { loginUser, resetUser } = AuthStore();
  useEffect(() => {
    setTheme("dark");
  }, []);
  useEffect(() => {
    if (status === "authenticated") {
      loginUser({ id: data.user.id, role: data.user.role });
    } else if (status === "unauthenticated") {
      resetUser();
    }
  }, [status]);
  return children;
}

export default AuthWrapper;
