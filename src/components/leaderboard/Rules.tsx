import { Card } from "../ui/Card";

function LeaderboardRules() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Leaderboard Rules</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
            1
          </span>
          <span>Points are calculated based on activity and contributions</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
            2
          </span>
          <span>Leaderboards reset according to their time period</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
            3
          </span>
          <span>Special badges are awarded to top performers</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">
            4
          </span>
          <span>Maintain a daily streak for bonus points</span>
        </li>
      </ul>
    </Card>
  );
}

export default LeaderboardRules;
