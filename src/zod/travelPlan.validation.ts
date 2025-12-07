import { z } from "zod";

export const createTravelPlanValidationZodSchema = z.object({
    destination: z.string().min(1, "Destination is required"),
    startDate: z.string().min(1, "Start date is required").refine((val) => !isNaN(Date.parse(val)), { message: "Invalid start date format" }),
    endDate: z.string().min(1, "End date is required").refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end date format" }),
    budget: z.string().min(1, "Budget is required").refine((val) => !isNaN(parseFloat(val)), { message: "Invalid budget value" }).transform(parseFloat).pipe(z.number().positive("Budget must be positive")),
    travelType: z.enum(["ADVENTURE", "LEISURE", "BUSINESS", "FAMILY", "SOLO"], { message: "Invalid travel type" }),
    itinerary: z.string().optional(),
    description: z.string().optional(),
}).refine((data) => Date.parse(data.endDate) > Date.parse(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
});