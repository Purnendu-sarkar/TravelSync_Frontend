/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getDashboardMeta() {
    try {
        const response = await serverFetch.get("/meta", {
            next: {
                tags: ["dashboard-meta"],
                revalidate: 60, // Revalidate every minute
            },
        });
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message || "Failed to fetch dashboard data");
        }
        return result.data;
    } catch (error: any) {
        console.error("Dashboard meta fetch error:", error);
        return null;
    }
}