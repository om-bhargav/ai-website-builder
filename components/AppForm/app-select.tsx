"use client";

import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { useAppForm } from "./app-form-context";
import { FieldWrapper } from "./field-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  options: Option[];
  disabled: boolean;
};

export function AppSelect<T extends FieldValues>({
  name,
  label,
  options,
  disabled = false
}: Props<T>) {
  const { form, loading } = useAppForm<T>();

  return (
    <Controller
      control={form.control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <FieldWrapper
          label={label}
          error={fieldState.error?.message}
          loading={loading}
        >
          {loading ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <Select disabled={disabled} value={field.value || "default"} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="default">Select {label}</SelectItem>
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FieldWrapper>
      )}
    />
  );
}