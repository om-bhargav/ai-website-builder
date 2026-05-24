import React from "react";
import { Button } from "../ui/button";
export default function GoogleButtonProvider({
  onClick,
  value="Continue With Google",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 
          bg-white text-black rounded-md px-3 py-2
          font-medium
          hover:bg-gray-200 active:scale-[0.98]
          transition-all duration-200
          shadow-sm hover:shadow-md"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="google"
        className="h-5 w-5"
      />
      {value}
    </Button>
  );
}
