/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

/**
 * GET ALL TRAVELERS
 * API: GET /users?queryParams (adjust based on your backend route)
 */
export async function getAllTravelers(queryString?: string) {
    try {
        const response = await serverFetch.get(`/user${queryString ? `?${queryString}` : ""}`);
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
            revalidatePath("/admin/dashboard/travelers-management");
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to update traveler status.'}`
        };
    }
}


