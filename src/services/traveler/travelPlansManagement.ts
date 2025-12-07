// src/services/traveler/travelPlansManagement.ts (Updated)
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelPlanValidationZodSchema, updateTravelPlanValidationZodSchema } from "@/zod/travelPlan.validation";

/**
 * GET ALL MY TRAVEL PLANS
 * API: GET /api/travel-plans/my-plans?queryParams
 */
export async function getAllMyTravelPlans(queryString?: string) {
  try {
    const response = await serverFetch.get(`/travel-plan/my-plans/${queryString ? `?${queryString}` : ""}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
    };
  }
}

/**
 * CREATE TRAVEL PLAN
 * API: POST /api/travel-plans
 */

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
      revalidatePath("/dashboard/my-travel-plans"); 
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



/** UPDATE TRAVEL PLAN
 * API: PATCH /api/travel-plans/:id
 */
export async function updateTravelPlanAction(_currentState: any, formData: FormData) {
  try {
    const id = formData.get("id");
    const payload = {
      destination: formData.get("destination"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      budget: formData.get("budget"),
      travelType: formData.get("travelType"),
      itinerary: formData.get("itinerary"),
      description: formData.get("description"),
    };

    const validationResult = zodValidator(payload, updateTravelPlanValidationZodSchema);
    if (!validationResult.success) {
      return validationResult;
    }

    const validatedPayload: any = validationResult.data;

    const response = await serverFetch.patch(`/travel-plan/${id}`, {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      revalidatePath("/dashboard/my-travel-plans");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to update travel plan.'}`
    };
  }
}

/** DELETE TRAVEL PLAN
 * API: DELETE /api/travel-plans/:id
 */
export async function deleteTravelPlanAction(id: string) {
  try {
    const response = await serverFetch.delete(`/travel-plan/${id}`);
    const result = await response.json();
    if (result.success) {
      revalidatePath("/dashboard/my-travel-plans");
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete travel plan",
    };
  }
}