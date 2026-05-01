"use client";

import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { useAppForm } from "./app-form-context";
import { FieldWrapper } from "./field-wrapper";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  inputClassName?: string;
  wrapperClassName?: string;
};

export function AppInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  description,
  disabled = false,
  icon: Icon,
  inputClassName,
  wrapperClassName,
}: Props<T>) {
  const { form, loading } = useAppForm<T>();

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldWrapper
          label={label}
          error={fieldState.error?.message}
          description={description}
          loading={loading}
        >
          {loading ? (
            <Skeleton className="h-10 w-full rounded-md" />
          ) : (
            <div className={cn("relative", wrapperClassName)}>
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              )}

              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                className={cn(
                  "h-10 border-white/10",
                  Icon && "pl-9",
                  inputClassName
                )}
              />
            </div>
          )}
        </FieldWrapper>
      )}
    />
  );
}