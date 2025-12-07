export interface ICreateTravelPlan {
  destination: string;
  startDate: string; // or Date if you parse it
  endDate: string; // or Date
  budget: number;
  travelType: "ADVENTURE" | "LEISURE" | "BUSINESS" | "FAMILY" | "SOLO";
  itinerary?: string;
  description?: string;
}


// src/types/travelPlan.interface.ts (Updated)
// export interface ITravelPlan {
//   id: string;
//   destination: string;
//   startDate: string;
//   endDate: string;
//   budget: number;
//   travelType: "ADVENTURE" | "LEISURE" | "BUSINESS" | "FAMILY" | "SOLO";
//   itinerary?: string;
//   description?: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export type ICreateTravelPlan = {
//   id?: string;
// } & Omit<ITravelPlan, "isDeleted" | "createdAt" | "updatedAt">;


// Based on your Prisma schema for TravelPlan
export interface ITravelPlan {
  id: string;
  travelerId: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: "ADVENTURE" | "LEISURE" | "BUSINESS" | "FAMILY" | "SOLO";
  itinerary?: string | null;
  description?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  traveler?: {
    name: string;
    email: string;
  };
  travelerPlanCount?: number;
}