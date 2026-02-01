import { email, object, string } from "zod";

export const passwordSchema = string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

export const userSchema = object({
    name: string().min(1, "Name is required"),
    email: email("Invalid email address"),
    password: passwordSchema,
});
