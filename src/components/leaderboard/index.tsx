"use client";

import * as React from "react";
import { Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Header } from "../ui/Header";
import LeaderboardTabs from "./Tabs";
import LeaderboardYourStats from "./YourStats";
import LeaderboardTable from "./Table";
import { leaderboardTabs } from "./mockData";
import { IUser } from "@/types/apiResponse/User";

function LeaderboardComponent({ users }: { users: IUser[] | null }) {
  const [selectedTab, setSelectedTab] = React.useState<string>("weekly");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  return (
    <div className="container">
      <Header
        title="Leaderboard"
        description="Track your progress and see how you rank against other users in the community."
      />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:hidden block">
          <LeaderboardYourStats />
        </div>
        <div className="md:w-3/4">
          <div className="mb-6">
            <LeaderboardTabs
              selected={selectedTab}
              setSelected={setSelectedTab}
              tabs={leaderboardTabs}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{users?.length || 0} Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Last updated: 2 hours ago
              </span>
            </div>
          </div>
          <LeaderboardTable
            users={users || []}
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className="md:w-1/4 space-y-8">
          <div className="hidden md:block">
            <LeaderboardYourStats />
          </div>
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Leaderboard Rules</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                  1
                </span>
                <span>
                  Points are calculated based on activity and contributions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                  2
                </span>
                <span>Leaderboards reset according to their time period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                  3
                </span>
                <span>Special badges are awarded to top performers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
                  4
                </span>
                <span>Maintain a daily streak for bonus points</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardComponent;
