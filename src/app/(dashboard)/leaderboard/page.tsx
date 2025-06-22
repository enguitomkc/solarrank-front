import * as React from "react";
import { Metadata } from "next";
import LeaderboardComponent from "@/components/leaderboard";
import ErrorPage from "@/components/Error";
import { apiRequest } from "@/api/apiRequest";
import { IUser } from "@/types/apiResponse/User";

export const metadata: Metadata = {
  title: "Leaderboard | SolarRank",
  description: "See the top solar installers and their rankings",
};

export default async function LeaderboardPage() {
  const users = await apiRequest<IUser[]>("/users");

  if (!users.success) {
    return (
      <ErrorPage
        title="Failed to Load Leaderboard"
        message="We couldn't load the leaderboard data. Please check your connection and try again."
      />
    );
  }

  const usersData = users.data as IUser[];

  return <LeaderboardComponent users={usersData} />;
}
