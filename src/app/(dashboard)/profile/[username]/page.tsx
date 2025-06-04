import { Metadata } from "next";
// import { notFound } from "next/navigation";
import { Activity, Achievement, Profile, Stats } from "@/types/profile";
import ProfilePageComponent from "@/components/profile/ProfilePage";
import { apiRequest } from "@/api/apiRequest";
import API from "@/api/enpoints";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `${username} | Profile | SolarRank`,
    description: `View ${username}'s profile, achievements, and activity on SolarRank`,
  };
}

async function getProfileData(username: string): Promise<{
  profile: Profile;
  stats: Stats;
  achievements: Achievement[];
  activities: Activity[];
}> {
  // Replace this with your actual API call
  // Example:
  const response = await apiRequest(API.USER.getUserProfile(username), {
    method: "GET",
  });

  return response.data as {
    profile: Profile;
    stats: Stats;
    achievements: Achievement[];
    activities: Activity[];
  };
}

// For now, returning mock data similar to what was in ProfilePageComponent
// const mockProfile: UserProfile = {
//   id: "1",
//   name: "Sarah Johnson",
//   email: "sarah.johnson@example.com",
//   username: username, // Use the dynamic username
//   profile_image: "/api/placeholder/150/150",
//   role: "user",
//   total_energy: 2850,
//   created_at: "2023-01-15T00:00:00Z",
//   bio: "Certified solar installer with 8+ years of experience. Passionate about renewable energy and helping homeowners transition to solar power.",
//   location: "San Diego, CA",
//   company: "SunPower Solutions",
//   website: "https://sarahsolar.com",
//   rank: "Gold Installer",
//   level: 12,
// };

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  try {
    const { profile, stats, achievements, activities } = await getProfileData(
      params.username
    );

    // The ProfilePageComponent will now receive data as props.
    // You'll need to modify ProfilePageComponent to accept these props
    // and remove its internal useState for this data and the useEffect for fetching.
    return (
      <ProfilePageComponent
        username={params.username} // Still pass username if needed for other client logic (e.g., isOwnProfile)
        profile={profile}
        stats={stats}
        achievements={achievements}
        activities={activities}
      />
    );
  } catch (error) {
    console.error("Error fetching profile data in page.tsx:", error);
    // You'd typically render an error component here
    // Or use Next.js's error.tsx file convention
    return <div>Error loading profile. Please try again later.</div>;
  }
}
