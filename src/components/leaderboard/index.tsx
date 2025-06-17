"use client";

import * as React from "react";
import { Users } from "lucide-react";
import { Header } from "../ui/Header";
import LeaderboardTabs from "./Tabs";
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
        <div className="w-full">
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
        {/* <div className="md:w-1/4 space-y-8">
          <div className="hidden md:block">
            <LeaderboardYourStats />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default LeaderboardComponent;
