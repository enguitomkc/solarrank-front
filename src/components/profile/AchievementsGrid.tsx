import { Achievement } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Award } from "lucide-react";
import { Badge } from "../ui/Badge";

function ProfileAchievementsGrid({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Achievements ({achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {achievement.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(achievement.earned_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileAchievementsGrid;
