"use client";

import * as React from "react";
import ProfileHeader from "./Header";
import { useContext, useState } from "react";
import { Header } from "@/components/ui/Header";
import { Achievement, Activity, Profile, Stats } from "@/types/profile";
import { AuthContext } from "@/contexts/Auth";

interface ProfileComponentProps {
  username: string;
  profile: Profile;
  stats: Stats;
  achievements: Achievement[];
  activities: Activity[];
}

export default function ProfileComponent({
  username,
  profile,
}: ProfileComponentProps) {
  const { user: currentUser } = useContext(AuthContext);
  // const [stats] = useState<UserStats>(mockStats);
  // const [achievements] = useState<Achievement[]>(mockAchievements);
  // const [activities] = useState<Activity[]>(mockActivities);
  const [loading] = useState(false);

  const isOwnProfile =
    currentUser?.name === profile.name || username === currentUser?.name;

  // useEffect(() => {
  //   // In a real app, fetch profile data based on username
  //   // For now, we'll use mock data
  //   const fetchProfile = async () => {
  //     try {
  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   fetchProfile();
  // }, [username]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-48 bg-muted rounded-lg mb-6"></div>
          <div className="h-32 bg-muted rounded-lg mb-6"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Header
        title="Profile"
        description="View profile information and achievements"
      />

      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
      {/* <StatsOverview stats={stats} /> */}

      {/* <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <AchievementsGrid achievements={achievements} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityFeed activities={activities} />
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
