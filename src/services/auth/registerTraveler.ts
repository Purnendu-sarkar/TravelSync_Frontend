/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

import { loginUser } from "./loginUser";
import { registerTravelerValidationZodSchema } from "@/zod/auth.validation";


export const registerTraveler = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            gender: formData.get("gender"),
            address: formData.get('address')
        }

        if (zodValidator(payload, registerTravelerValidationZodSchema).success === false) {
            return zodValidator(payload, registerTravelerValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerTravelerValidationZodSchema).data;
        const registerData = {
            password: validatedPayload.password,
            traveler: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                address: validatedPayload.address,
                gender: validatedPayload.gender
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/user/create-traveler", {
            body: newFormData,
        })

        const result = await res.json();


        if (result.success) {
            const loginResult = await loginUser(_currentState, formData);
            if (loginResult.success) {
                return loginResult;
            } else {
                return { success: false, message: "Registration successful, but auto-login failed. Please log in manually." };
            }
        }

        return result;



    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}