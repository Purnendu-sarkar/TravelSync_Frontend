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


export const getPublicAllTravelers = async (
    queryString?: string
) => {
    try {
        const res = await serverFetch.get(`/user/public-all${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: ["public-all-travelers"],
                revalidate: 180
            }
        });
        const json = await res.json();

        if (!res.ok || json.success === false) {
            return {
                success: false,
                message: json.message || "No travelers found",
                data: {
                    meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
                    data: []
                },
            };
        }

        return {
            success: true,
            data: json.data ?? { meta: {}, data: [] },
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch travelers",
            data: {
                meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
                data: []
            },
        };
    }
};

export const getPublicSingleTraveler = async (id: string) => {
    try {
        const res = await serverFetch.get(`/user/public/${id}`, {
            next: {
                tags: [`public-traveler-${id}`],
                revalidate: 180
            }
        });
        const json = await res.json();

        if (!res.ok || json.success === false) {
            return {
                success: false,
                message: json.message || "Traveler not found",
                data: null,
            };
        }

        return {
            success: true,
            data: json.data ?? null,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch traveler details",
            data: null,
        };
    }
};