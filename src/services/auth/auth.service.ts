/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { parse } from "cookie";
import { verifyAccessToken } from "@/lib/jwtHanlders";
import { zodValidator } from "@/lib/zodValidator";
import { forgotPasswordSchema } from "@/zod/auth.validation";


export async function createTraveler(_prevState: any, formData: FormData) {
    try {
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirmPassword")?.toString();
        const gender = formData.get("gender")?.toString();
        const location = formData.get("location")?.toString();

        // ✅ Basic Validation
        if (!name || !email || !password || !confirmPassword || !gender || !location) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        // ✅ Confirm Password Check
        if (password !== confirmPassword) {
            return {
                success: false,
                message: "Password and Confirm Password do not match",
            };
        }

        const traveler = {
            name,
            email,
            gender,
            location,
        };

        const payload = {
            password,
            traveler,
        };

        const uploadFormData = new FormData();
        uploadFormData.append("data", JSON.stringify(payload));

        // ✅ Profile Photo
        const file = formData.get("file");
        if (file instanceof File && file.size > 0) {
            uploadFormData.append("file", file);
        }

        const response = await serverFetch.post("/user/create-traveler", {
            body: uploadFormData,
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message,
            };
        }

        return {
            success: true,
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
}

export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");

        //Case 1: Both tokens are missing - user is logged out
        if (!accessToken && !refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        // Case 2 : Access Token exist- and need to verify
        if (accessToken) {
            const verifiedToken = await verifyAccessToken(accessToken);

            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                }
            }
        }

        //Case 3 : refresh Token is missing- user is logged out
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        //Case 4: Access Token is invalid/expired- try to get a new one using refresh token
        // This is the only case we need to call the API

        // Now we know: accessToken is invalid/missing AND refreshToken exists
        // Safe to call the API
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        // API Call - serverFetch will skip getNewAccessToken for /auth/refresh-token endpoint
        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const result = await response.json();

        console.log("access token refreshed!!");

        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No Set-Cookie header found");
        }

        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });

        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }


        return {
            tokenRefreshed: true,
            success: true,
            message: "Token refreshed successfully"
        };


    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Something went wrong",
        };
    }

}

export async function forgotPassword(_prevState: any, formData: FormData) {
    const validationPayload = {
        email: formData.get("email") as string,
    };

    // Validate with zod
    const validatedPayload = zodValidator(validationPayload, forgotPasswordSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            errors: validatedPayload.errors,
        };
    }

    try {
        const response = await serverFetch.post("/auth/forgot-password", {
            body: JSON.stringify({ email: validatedPayload.data?.email }),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Forgot password request failed");
        }

        return {
            success: true,
            message: result.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
        };
    }
}



