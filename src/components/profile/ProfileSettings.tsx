"use client";

import * as React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/ui/header";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Save,
  Camera,
  Mail,
  MapPin,
  Building,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileFormData {
  name: string;
  email: string;
  username: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  profile_image: string;
}

export default function ProfileSettingsComponent() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // Initialize form with current user data or defaults
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.name?.toLowerCase().replace(/\s+/g, "_") || "",
    bio: "",
    location: "",
    company: "",
    website: "",
    profile_image: user?.profile_image || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Create profile link based on form data
  const profileLink = `/profile/${formData.username}`;

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // In a real app, this would be an API call to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setTimeout(() => {
        router.push(profileLink);
      }, 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like AWS S3
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            profile_image: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              Please log in to edit your profile.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/auth/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href={profileLink}
          className="hover:text-foreground transition-colors"
        >
          Profile
        </Link>
        <span>/</span>
        <span className="text-foreground">Settings</span>
      </div>

      <Header
        title="Profile Settings"
        description="Update your profile information and preferences"
      />

      <form onSubmit={handleSubmit}>
        {/* Profile Image Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage
                  src={formData.profile_image}
                  alt={formData.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-xl">
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="profile-image" className="cursor-pointer">
                  <Button variant="outline" size="sm" type="button" asChild>
                    <span>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Picture
                    </span>
                  </Button>
                </Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max size 5MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  placeholder="your_username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself and your experience with solar installation..."
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button type="button" variant="outline" asChild>
            <Link href={profileLink}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Link>
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-200 text-sm">
              Profile updated successfully! Redirecting to your profile...
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
