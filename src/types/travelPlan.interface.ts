/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICreateTravelPlan {
  destination: string;
  startDate: string; // or Date if you parse it
  endDate: string; // or Date
  budget: number;
  travelType: "ADVENTURE" | "LEISURE" | "BUSINESS" | "FAMILY" | "SOLO";
  itinerary?: string;
  description?: string;
}

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
  buddyRequestsCount: number;
  buddyRequests?: any[];
  travelerPlanCount?: number;
}