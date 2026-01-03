/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const getPublicReviews = async (params: { limit?: number } = {}) => {
    const query = new URLSearchParams(params as any).toString();

    const res = await serverFetch.get(`/reviews/public?${query}`);

    if (!res.ok) {
        throw new Error("Failed to fetch public reviews");
    }

    const json = await res.json();
    return json.data;
};
