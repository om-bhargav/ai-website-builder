"use client";

import { ReactNode } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { AppFormContext } from "./app-form-context";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  loading?: boolean;
};

export function AppForm<T extends FieldValues>({
  form,
  children,
  onSubmit,
  className,
  loading = false,
}: Props<T>) {
  return (
    <AppFormContext.Provider
      value={{
        form: form as UseFormReturn<any>,
        loading,
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={onSubmit} className={className}>
          {children}
        </form>
      </FormProvider>
    </AppFormContext.Provider>
  );
}