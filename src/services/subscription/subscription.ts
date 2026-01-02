/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";

/**
 * GET SUBSCRIPTION PLANS
 * API: GET /api/subscriptions/plans
 */
export async function getSubscriptionPlans() {
  try {
    const response = await serverFetch.get("/subscriptions/plans");
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
    const response = await serverFetch.get("/subscriptions/my-status");
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