"use client";
import React from "react";
import { useRouter } from "next/navigation";

function useGoBack() {
  const goBack = () => {
    const router = useRouter();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return goBack;
}

export default useGoBack;
