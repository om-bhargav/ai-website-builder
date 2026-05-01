"use client";

import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  label?: string;
  error?: string;
  description?: string;
  loading?: boolean;
  children: ReactNode;
};

export function FieldWrapper({
  label,
  error,
  description,
  loading = false,
  children,
}: Props) {
  return (
    <div className="space-y-2">
      {loading ? (
        <Skeleton className="h-4 w-24" />
      ) : (
        label && <Label>{label}</Label>
      )}

      {children}

      {!loading && error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}

      {!loading && !error && description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}