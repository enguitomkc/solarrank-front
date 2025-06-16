import * as React from "react";
import { Metadata } from "next";
import LeaderboardComponent from "@/components/leaderboard";
import { IUser } from "@/types/apiResponse/User";
import { apiRequest } from "@/api/apiRequest";

export const metadata: Metadata = {
  title: "Leaderboard | SolarRank",
  description: "See the top solar installers and their rankings",
};

// Fetch users from the API
const fetchUsers = async () => {
  try {
    const response = await apiRequest<IUser[]>("/users");

    // Check if the request was successful and data is an array
    if (response.success && Array.isArray(response.data)) {
      return response.data as IUser[];
    }

    // Log the error for debugging
    console.error("Failed to fetch users:", response.data);
    return null;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export default async function LeaderboardPage() {
  const users = await fetchUsers();
  return <LeaderboardComponent users={users || []} />;
}
