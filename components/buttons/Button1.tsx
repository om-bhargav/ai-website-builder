import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
interface Props extends React.ButtonHTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
}
export default function Button1({ text, className, ...props }: Props) {
  return (
    <Button
      {...props}
      className={cn(
        "text-white! min-w-[70px] bg-gradient-to-br from-indigo-500 to-purple-900 hover:scale-103 transition cursor-pointer rounded-xl text-black font-semibold px-4! p-2!",
        className,
      )}
    >
      {text}
    </Button>
  );
}
