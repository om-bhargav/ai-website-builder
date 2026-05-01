import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z
    .string("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name is too long"),

  phone: z
    .string("Phone number is required")
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),

  email: z.string("Email is required").email("Invalid email address"),

  city: z.string("Please select a city").min(1, "Please select a city"),

  country: z.string("Please select a country").min(1, "Please select a country"),
  bio: z
    .string("Bio is required")
    .min(10, "Bio must be at least 10 characters")
    .max(300, "Bio must be under 300 characters"),
});

export type ProfileInfo = z.infer<typeof personalInfoSchema>;
