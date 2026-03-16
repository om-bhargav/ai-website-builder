"use client";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { AuthStore } from "@/store/AuthInfo";
function AuthWrapper({ children }: React.PropsWithChildren) {
  const { setTheme } = useTheme();
  const {status} = useSession();
  const { loginUser, resetUser } = AuthStore();
  useEffect(() => {
    setTheme("dark");
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("/api/user/me");
        const data = await response.json();
        console.log(data);
        loginUser(data.user);
      }catch(error: any){
          resetUser();
      }
    }
    fetchData();
    }, [status]);
  return children;
}

export default AuthWrapper;
