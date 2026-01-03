/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelPlanValidationZodSchema, updateTravelPlanValidationZodSchema } from "@/zod/travelPlan.validation";

/**
 * GET ALL MY TRAVEL PLANS
 * API: GET /api/travel-plans/my-plans?queryParams
 */
export async function getAllMyTravelPlans(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(`/travel-plans/my-plans/${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: [
          "my-travel-plans-list",
          `my-travel-plans-page-${page}`,
          `my-travel-plans-search-${searchTerm}`,
        ],
        revalidate: 180
      }
    });
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

    const res = await serverFetch.post("/travel-plans", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag('my-travel-plans-list', { expire: 0 });
      revalidateTag('my-travel-plans-page-1', { expire: 0 });
      revalidateTag('matched-travel-plans', { expire: 0 });
      revalidateTag('public-travel-plans', { expire: 0 });
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

    const response = await serverFetch.patch(`/travel-plans/${id}`, {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      revalidateTag('my-travel-plans-list', { expire: 0 });
      revalidateTag('my-travel-plans-page-1', { expire: 0 });
      revalidateTag('matched-travel-plans', { expire: 0 });
      revalidateTag('public-travel-plans', { expire: 0 });
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
    const response = await serverFetch.delete(`/travel-plans/${id}`);
    const result = await response.json();
    if (result.success) {
      revalidateTag('my-travel-plans-list', { expire: 0 });
      revalidateTag('my-travel-plans-page-1', { expire: 0 });
      revalidateTag('matched-travel-plans', { expire: 0 });
      revalidateTag('public-travel-plans', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete travel plan",
    };
  }
}


/**
 * GET MATCHED TRAVEL PLANS 
 * API: GET /api/travel-plan/match
 */
export async function getMatchedTravelPlans(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const response = await serverFetch.get(
      `/travel-plans/match${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: [
          "matched-travel-plans",
          `matched-travel-plans-page-${page}`,
        ],
        revalidate: 180
      }
    }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to load matches"
        }`,
    };
  }
}



/**
 * GET SINGLE TRAVEL PLAN (public
 */
export async function getSingleTravelPlan(id: string) {
  try {
    const response = await serverFetch.get(`/travel-plans/${id}`, {
      next: {
        tags: [`travel-plan-${id}`],
        revalidate: 180
      }
    });
    return await response.json();
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Failed to fetch plan details" };
  }
}

/**
 * SEND TRAVEL BUDDY REQUEST
 * API: POST /travel-plans/:planId/request
 */
export async function sendTravelBuddyRequest(planId: string, message?: string) {
  try {
    const res = await serverFetch.post(`/travel-plans/${planId}/request`, {
      body: JSON.stringify({ message: message || "" }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.success) {
      revalidateTag('matched-travel-plans', { expire: 0 });
      revalidateTag('my-sent-requests', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}


/**
 * GET MY SENT REQUESTS (My Matches)
 * API: GET /api/travel-plans/my-requests
 */
export async function getMySentRequests(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const response = await serverFetch.get(
      `/travel-plans/my-requests${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: [
          "my-sent-requests",
          `my-sent-requests-page-${page}`,
        ],
        revalidate: 180
      }
    }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Failed to fetch sent requests:", error);
    return {
      success: false,
      message: "Failed to load your requests",
    };
  }
}


export const getPublicTravelPlans = async (
  params: { limit?: number } = {}
) => {
  try {
    const query = new URLSearchParams(params as any).toString();
    const res = await serverFetch.get(`/travel-plans/public?${query}`, {
      next: {
        tags: ["public-travel-plans"],
        revalidate: 180
      }
    });
    const json = await res.json();

    if (!res.ok || json.success === false) {
      return {
        success: false,
        message: json.message || "No public travel plans found",
        data: [],
      };
    }

    return {
      success: true,
      data: json.data ?? [],
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to load public travel plans",
      data: [],
    };
  }
};