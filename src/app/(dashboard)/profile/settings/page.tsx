import { Metadata } from "next";
import ProfileSettingsComponent from "@/components/profile/ProfileSettings";

export const metadata: Metadata = {
  title: "Profile Settings | SolarRank",
  description: "Manage your profile settings and preferences",
};

export default function ProfileSettingsPage() {
  return <ProfileSettingsComponent />;
}
