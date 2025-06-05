import { Profile } from "@/types/profile";
import { Card, CardContent } from "../ui/Card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/Button";
import {
  Edit,
  Settings,
  Trophy,
  MapPin,
  Building,
  Globe,
  Calendar,
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { Link } from "lucide-react";
import { Tooltip } from "../ui/Tooltip";

function ProfileHeader({
  profile,
  isOwnProfile,
}: {
  profile: Profile;
  isOwnProfile: boolean;
}) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 border-4 border-primary/20">
              <AvatarImage
                src={profile.profile_image}
                alt={profile.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <div className="flex gap-2 mt-4">
                <Link href="/profile/settings">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Tooltip content="Profile Settings" side="bottom">
                  <Link href="/profile/settings">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500"
                  >
                    <Trophy className="h-3 w-3 mr-1" />
                    {profile.rank}
                  </Badge>
                </div>
                <p className="text-muted-foreground">@{profile.username}</p>
                {profile.bio && (
                  <p className="mt-3 text-sm leading-relaxed">{profile.bio}</p>
                )}
              </div>
              {isOwnProfile && (
                <Tooltip content="Profile Settings" side="left">
                  <Link href="/profile/settings">
                    <Button variant="ghost" size="sm" className="ml-2">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                </Tooltip>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.company}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {profile.website.replace("https://", "")}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Joined {new Date(profile.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileHeader;
