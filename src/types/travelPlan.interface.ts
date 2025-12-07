export interface ICreateTravelPlan {
  destination: string;
  startDate: string; // or Date if you parse it
  endDate: string; // or Date
  budget: number;
  travelType: "ADVENTURE" | "LEISURE" | "BUSINESS" | "FAMILY" | "SOLO";
  itinerary?: string;
  description?: string;
}