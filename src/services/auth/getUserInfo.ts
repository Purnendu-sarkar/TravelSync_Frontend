/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/auth/me")

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");
            console.log("ACCESS TOKEN", accessToken)

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.name || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.name || result.data.traveler?.name || result.data.name || "Unknown User",
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "TRAVELER",
        };
    }

}