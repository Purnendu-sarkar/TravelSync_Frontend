/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

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


