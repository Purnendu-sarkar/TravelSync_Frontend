/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const getPublicTopTravelers = async (
    params: { limit?: number } = {}
) => {
    try {
        const query = new URLSearchParams(params as any).toString();
        const res = await serverFetch.get(`/user/public-top?${query}`, {
            next: {
                tags: ["public-top-travelers"],
                revalidate: 180
            }
        });
        const json = await res.json();

        if (!res.ok || json.success === false) {
            return {
                success: false,
                message: json.message || "No top travelers found",
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
                    : "Failed to fetch top travelers",
            data: [],
        };
    }
};