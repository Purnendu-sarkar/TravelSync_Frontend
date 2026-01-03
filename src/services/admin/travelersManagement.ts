/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/**
 * GET ALL TRAVELERS
 * API: GET /users?queryParams (adjust based on your backend route)
 */
export async function getAllTravelers(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";
        const response = await serverFetch.get(`/user${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "travelers-list",
                    `travelers-page-${page}`,
                    `travelers-search-${searchTerm}`,
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

/** UPDATE TRAVELER STATUS
 * API: PATCH /user/:email/status
 */
export async function updateTravelerStatusAction(email: string, status: string) {
    try {
        const response = await serverFetch.patch(`/user/${email}/status`, {
            body: JSON.stringify({ status }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (result.success) {
            // 🔥 IMPORTANT 🔥
            revalidateTag('travelers-list', { expire: 0 });
            revalidateTag('travelers-page-1', { expire: 0 });
            revalidateTag('admin-dashboard-meta', { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to update traveler status.'}`
        };
    }
}

/** DELETE TRAVELER
 * API: DELETE /user/:email
 */

export async function deleteTravelerAction(email: string) {
    try {
        const response = await serverFetch.delete(`/user/${email}`);

        const result = await response.json();

        if (result.success) {
            revalidateTag('travelers-list', { expire: 0 });
            revalidateTag('travelers-page-1', { expire: 0 });
            revalidateTag('admin-dashboard-meta', { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete traveler",
        };
    }
}