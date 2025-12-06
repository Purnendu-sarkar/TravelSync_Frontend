// Based on your Prisma schema for Traveler
export interface ITraveler {
  id: string;
  name?: string | null;
  email: string;
  bio?: string | null;
  status: "ACTIVE" | "BLOCKED" | "INACTIVE";
  gender?: "MALE" | "FEMALE" | null;
  interests: string[];
  address?: string | null;
  visitedCountries: string[];
  profilePhoto?: string | null;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}