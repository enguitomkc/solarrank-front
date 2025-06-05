import * as React from "react";
import { Metadata } from "next";
import LeaderboardComponent from "@/components/leaderboard";

export const metadata: Metadata = {
  title: "Leaderboard | SolarRank",
  description: "See the top solar installers and their rankings",
};

export default function LeaderboardPage() {
  return <LeaderboardComponent />;
}
