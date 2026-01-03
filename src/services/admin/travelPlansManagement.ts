/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/**
 * GET ALL TRAVEL PLANS
 * API: GET /travel-plans?queryParams
 */
export async function getAllTravelPlans(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(`/travel-plan${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: [
          "travel-plans-list",
          `travel-plans-page-${page}`,
          `travel-plans-search-${searchTerm}`,
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
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}

/**
 * GET SINGLE TRAVEL PLAN FOR ADMIN
 * API: GET /travel-plans/admin/:id
 */
export async function getSingleTravelPlanForAdmin(id: string) {
  try {
    const response = await serverFetch.get(`/travel-plan/admin/${id}`, {
      next: {
        tags: [`travel-plan-${id}`, "travel-plans-list"],
        revalidate: 180
      }
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}

/**
 * HARD DELETE TRAVEL PLAN
 * API: DELETE /travel-plans/admin/:id
 */
export async function deleteTravelPlanAction(id: string) {
  try {
    const response = await serverFetch.delete(`/travel-plan/admin/${id}`);
    const result = await response.json();
    if (result.success) {
      revalidateTag('travel-plans-list', { expire: 0 });
      revalidateTag('travel-plans-page-1', { expire: 0 });
      revalidateTag('admin-dashboard-meta', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete travel plan",
    };
  }
}