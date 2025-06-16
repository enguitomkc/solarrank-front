import { Metadata } from "next";
import ProfileSettingsComponent from "@/components/profile-settings";

export const metadata: Metadata = {
  title: "Profile Settings | SolarRank",
  description: "Manage your profile settings and preferences",
};

export default function ProfileSettingsPage() {
  return <ProfileSettingsComponent />;
}
