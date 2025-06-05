import { LeaderboardUser } from "./Table";
import { LeaderboardTabsProps } from "./Tabs";


export const mockUsers: LeaderboardUser[] = [
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


export const leaderboardTabs: LeaderboardTabsProps[] = [
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