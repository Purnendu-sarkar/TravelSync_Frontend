/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelPlanValidationZodSchema } from "@/zod/travelPlan.validation";

export const createTravelPlan = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payload = {
            destination: formData.get("destination"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            budget: formData.get("budget"),
            travelType: formData.get("travelType"),
            itinerary: formData.get("itinerary"),
            description: formData.get("description"),
        };

        const validationResult = zodValidator(payload, createTravelPlanValidationZodSchema);
        if (!validationResult.success) {
            return validationResult;
        }

        const validatedPayload: any = validationResult.data;

        const res = await serverFetch.post("/travel-plan", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidatePath("/dashboard");  // TODO: Change this to the travel plans listing page if different
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Failed to create travel plan. Please try again."}`,
        };
    }
};