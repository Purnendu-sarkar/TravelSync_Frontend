/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerTravelerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email("Valid email required"),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
    address: z.string().min(1, "Location is required"),
    gender: z.enum(["MALE", "FEMALE"], {
        error: "Gender is required",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});


export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

