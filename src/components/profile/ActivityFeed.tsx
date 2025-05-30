import { Activity } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FileText,
  MessageSquare,
  Star,
  Award,
  Trophy,
  Zap,
} from "lucide-react";

function ActivityFeed({ activities }: { activities: Activity[] }) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "post":
        return <FileText className="h-4 w-4" />;
      case "comment":
        return <MessageSquare className="h-4 w-4" />;
      case "achievement":
        return <Star className="h-4 w-4" />;
      case "certification":
        return <Award className="h-4 w-4" />;
      case "rank_change":
        return <Trophy className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-b-0"
            >
              <div className="flex-shrink-0 p-2 rounded-full bg-primary/10">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium text-sm">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                  {activity.energy_gained && (
                    <span className="flex items-center gap-1 text-primary">
                      <Zap className="h-3 w-3" />+{activity.energy_gained}{" "}
                      energy
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
