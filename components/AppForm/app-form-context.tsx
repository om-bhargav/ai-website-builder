"use client";

import { createContext, useContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type AppFormContextType = {
  form: UseFormReturn<any>;
  loading?: boolean;
};

const AppFormContext = createContext<AppFormContextType | null>(null);

export function useAppForm<T extends FieldValues>() {
  const context = useContext(AppFormContext);

  if (!context) {
    throw new Error("App form fields must be used inside <AppForm>");
  }

  return {
    form: context.form as UseFormReturn<T>,
    loading: context.loading,
  };
}

export { AppFormContext };