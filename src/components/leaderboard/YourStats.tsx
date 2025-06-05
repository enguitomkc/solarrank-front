import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

function LeaderboardYourStats() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your Stats</h2>
        <Badge variant="outline">Rank #42</Badge>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Current Score</span>
            <span className="text-sm font-medium">8,750 / 10,000</span>
          </div>
          <Progress value={87.5} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Daily Streak</span>
            <span className="text-xl font-bold">7 days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Challenges</span>
            <span className="text-xl font-bold">12/15</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Badges</span>
            <span className="text-xl font-bold">8</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LeaderboardYourStats;
