"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trophy, Medal, Users, ArrowUp, ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  change: "up" | "down" | "none";
  badges: string[];
}

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface LeaderboardTabProps {
  title: string;
  value: string;
}

const leaderboardTabs: LeaderboardTabProps[] = [
  {
    title: "Daily",
    value: "daily",
  },
  {
    title: "Weekly",
    value: "weekly",
  },
  {
    title: "Monthly",
    value: "monthly",
  },
  {
    title: "All Time",
    value: "all-time",
  },
];

const LeaderboardHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Leaderboard</h1>
      <p className="text-muted-foreground max-w-md">
        Track your progress and see how you rank against other users in the
        community.
      </p>
    </div>
  );
};

const LeaderboardTable: React.FC<LeaderboardProps> = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-7">User</div>
        <div className="col-span-2 text-right">Score</div>
        <div className="col-span-2 text-right">Change</div>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <Card
            key={user.id}
            className="p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-1 text-center font-bold">
                {user.rank <= 3 ? (
                  <div className="inline-flex items-center justify-center">
                    {user.rank === 1 && (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    )}
                    {user.rank === 2 && (
                      <Medal className="h-5 w-5 text-gray-400" />
                    )}
                    {user.rank === 3 && (
                      <Medal className="h-5 w-5 text-amber-700" />
                    )}
                  </div>
                ) : (
                  user.rank
                )}
              </div>

              <div className="col-span-7 flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <div className="flex gap-1 mt-1">
                    {user.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2 text-right font-bold">
                {user.score.toLocaleString()}
              </div>

              <div className="col-span-2 text-right">
                {user.change === "up" && (
                  <div className="inline-flex items-center text-green-500">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+5%</span>
                  </div>
                )}
                {user.change === "down" && (
                  <div className="inline-flex items-center text-red-500">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>-3%</span>
                  </div>
                )}
                {user.change === "none" && (
                  <span className="text-muted-foreground">No change</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {totalPages > 5 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

const YourStats = () => {
  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your Stats</h2>
        <Badge variant="outline">Rank #42</Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Current Score</span>
            <span className="text-sm font-medium">8,750 / 10,000</span>
          </div>
          <Progress value={87.5} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Daily Streak</span>
            <span className="text-xl font-bold">7 days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Challenges</span>
            <span className="text-xl font-bold">12/15</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Badges</span>
            <span className="text-xl font-bold">8</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Tabs = ({
  selected,
  setSelected,
  tabs,
}: {
  selected: string;
  setSelected: (value: string) => void;
  tabs: LeaderboardTabProps[];
}) => {
  return (
    <div className="flex space-x-1 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setSelected(tab.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            selected === tab.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.title}
          {selected === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};

const LeaderboardPage = () => {
  const [selectedTab, setSelectedTab] = React.useState<string>("weekly");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // Mock data
  const mockUsers: LeaderboardUser[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      score: 9850,
      rank: 1,
      change: "up",
      badges: ["Pro", "Streak 30"],
    },
    {
      id: 2,
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=5",
      score: 9720,
      rank: 2,
      change: "up",
      badges: ["Veteran"],
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=8",
      score: 9350,
      rank: 3,
      change: "down",
      badges: ["Expert"],
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=9",
      score: 8900,
      rank: 4,
      change: "none",
      badges: ["Contributor"],
    },
    {
      id: 5,
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=3",
      score: 8750,
      rank: 5,
      change: "up",
      badges: ["Rookie"],
    },
    {
      id: 6,
      name: "Jessica Taylor",
      avatar: "https://i.pravatar.cc/150?img=6",
      score: 8600,
      rank: 6,
      change: "down",
      badges: ["Streak 10"],
    },
    {
      id: 7,
      name: "Ryan Martinez",
      avatar: "https://i.pravatar.cc/150?img=12",
      score: 8450,
      rank: 7,
      change: "up",
      badges: ["Enthusiast"],
    },
    {
      id: 8,
      name: "Olivia Anderson",
      avatar: "https://i.pravatar.cc/150?img=10",
      score: 8300,
      rank: 8,
      change: "none",
      badges: ["Beginner"],
    },
  ];

  return (
    <div className="container py-10">
      <LeaderboardHeader />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="mb-6">
            <Tabs
              selected={selectedTab}
              setSelected={setSelectedTab}
              tabs={leaderboardTabs}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{mockUsers.length} Users</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Last updated: 2 hours ago
              </span>
            </div>
          </div>

          <LeaderboardTable
            users={mockUsers}
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="md:w-1/4">
          <YourStats />

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
};

export default LeaderboardPage;
