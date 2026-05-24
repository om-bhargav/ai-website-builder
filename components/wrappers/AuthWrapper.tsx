"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthStore } from "@/store/AuthInfo";
import LoadingScreen from "../fullpage/LoadingScreen";
import ErrorScreen from "../fullpage/ErrorScreen";
function AuthWrapper({ children }: React.PropsWithChildren) {
  const { setTheme } = useTheme();
  const { status, data: session } = useSession();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { loginUser, resetUser } = AuthStore();
  useEffect(() => {
    setTheme("dark");
  }, []);
  const fetchData = async () => {
    try {
      if (session?.user) {
        setLoaded(false);
        setError("");
        const response = await fetch("/api/user/me");
        const data = await response.json();
        if (!data.success) throw Error(data.message);
        fetch("/api/log-traffic", { method: "POST" });
        loginUser(data.data);
      }
    } catch (error: any) {
      resetUser();
      setError(error.message);
    } finally {
      setLoaded(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [status]);
  if (!loaded) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorScreen reset={fetchData} error={error} />;
  }
  return children;
}
export default AuthWrapper;
