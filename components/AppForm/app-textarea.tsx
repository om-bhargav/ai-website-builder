"use client";

import { LucideIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { useAppForm } from "./app-form-context";
import { FieldWrapper } from "./field-wrapper";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  textareaClassName?: string;
  wrapperClassName?: string;
};

export function AppTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  disabled = false,
  icon: Icon,
  textareaClassName,
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
            <Skeleton className="h-24 w-full rounded-md" />
          ) : (
            <div className={cn("relative", wrapperClassName)}>
              {Icon && (
                <Icon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              )}

              <Textarea
                name={field.name}
                ref={field.ref}
                value={field.value ?? ""}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "min-h-[90px] border-white/10 resize-none",
                  Icon && "pl-9",
                  textareaClassName
                )}
              />
            </div>
          )}
        </FieldWrapper>
      )}
    />
  );
}