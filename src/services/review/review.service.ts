/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const getPublicReviews = async (params: { limit?: number } = {}) => {
    const query = new URLSearchParams(params as any).toString();

    const res = await serverFetch.get(`/reviews/public?${query}`, {
        next: {
            tags: ["public-reviews"],
            revalidate: 180
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch public reviews");
    }

    const json = await res.json();
    return json.data;
};

/**
 * GET MY GIVEN REVIEWS
 * API: GET /api/reviews/given
 */
export async function getMyGivenReviews(queryString?: string) {
    try {
        const response = await serverFetch.get(`/reviews/given${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: ["my-given-reviews"],
                revalidate: 180
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to load reviews",
        };
    }
}

/**
 * UPDATE REVIEW
 * API: PATCH /api/reviews/:id
 */
export async function updateReviewAction(_currentState: any, formData: FormData) {
    try {
        const id = formData.get("id");
        const payload = {
            rating: Number(formData.get("rating")),
            comment: formData.get("comment"),
        };

        // Zod validation (use existing UpdateReviewInput if you have zod schema)
        // Assume you add a zod schema for update

        const response = await serverFetch.patch(`/reviews/${id}`, {
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag("my-given-reviews", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to update review",
        };
    }
}

/**
 * DELETE REVIEW
 * API: DELETE /api/reviews/:id
 */
export async function deleteReviewAction(id: string) {
    try {
        const response = await serverFetch.delete(`/reviews/${id}`);
        const result = await response.json();
        if (result.success) {
            revalidateTag("my-given-reviews", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete review",
        };
    }
}