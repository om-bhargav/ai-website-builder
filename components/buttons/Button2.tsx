import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
export default function Button2({
  text,
  className,
  disabled = false,
  ...props
}: {
  text: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={cn(
        "p-1 bg-gradient-to-br rounded-md! text-white! from-indigo-500 to-purple-500 lg:px-[2rem] lg:py-[0.7rem] hover:from-indigo-600 hover:to-purple-600 rounded cursor-pointer",
        className,
      )}
    >
      {text}
    </Button>
  );
}
