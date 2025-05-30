import { Stats } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "../ui/progress";

function StatsOverview({ stats }: { stats: Stats }) {
  const progressToNextLevel = ((stats.total_energy % 250) / 250) * 100;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Stats Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {stats.total_energy}
            </div>
            <div className="text-sm text-muted-foreground">Total Energy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">#{stats.rank_position}</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.total_posts}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {stats.achievements_earned}
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next level</span>
            <span>{Math.round(progressToNextLevel)}%</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsOverview;
