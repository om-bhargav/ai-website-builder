import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .trim(),

  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});


export const mapZodErrors = (errorObj: any) => {
  const formatted: Record<string, string[]> = {};

  if (!errorObj?.properties) return formatted;

  for (const key in errorObj.properties) {
    const field = errorObj.properties[key];
    if (field?.errors) {
      formatted[key] = field.errors;
    }
  }

  return formatted;
};