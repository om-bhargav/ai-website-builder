import React from "react";

export default function Input({
  className = "",
  type = "text",
  ...props
}: {
  className?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type={type}
      className={`bg-white rounded-md text-black px-3 py-2
        border border-transparent
        focus:outline-none 
        focus:ring-2 focus:ring-primary
        focus:border-primary
        transition-all duration-200
        placeholder:text-gray-500
        shadow-sm focus:shadow-md
        ${className}`}
    />
  );
}