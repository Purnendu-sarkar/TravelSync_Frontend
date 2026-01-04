/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/**
 * GET SUBSCRIPTION PLANS
 * API: GET /api/subscriptions/plans
 */
export async function getSubscriptionPlans() {
  try {
    const response = await serverFetch.get("/subscriptions/plans", {
      next: {
        tags: ["subscription-plans"],
        revalidate: 180
      }
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to load plans'}`,
    };
  }
}

/**
 * CREATE CHECKOUT SESSION
 * API: POST /api/subscriptions/create-checkout
 */
export async function createCheckoutSession(planType: string) {
  try {
    const res = await serverFetch.post("/subscriptions/create-checkout", {
      body: JSON.stringify({ planType }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.success) {
      revalidateTag('subscription-plans', { expire: 0 });
      revalidateTag('my-subscription-status', { expire: 0 });
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to create checkout session'}`,
    };
  }
}

/**
 * GET MY SUBSCRIPTION STATUS
 * API: GET /api/subscriptions/my-status
 */
export async function getMySubscriptionStatus() {
  try {
    const response = await serverFetch.get("/subscriptions/my-status", {
      next: {
        tags: ["my-subscription-status"],
        revalidate: 10
      }
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to load subscription status'}`,
    };
  }
}