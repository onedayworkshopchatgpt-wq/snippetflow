import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255, "Email must be 255 characters or fewer"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be 72 characters or fewer"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255, "Email must be 255 characters or fewer"),
  password: z.string().min(1, "Password is required").max(72),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
