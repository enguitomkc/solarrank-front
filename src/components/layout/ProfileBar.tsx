import { Badge, Card, Progress } from "../ui";

function ProfileBar() {
  return (
    <div className="space-y-4 h-fit min-w-100">
      {/* Main Stats Card */}
      <Card className="!pt-0 bg-card border border-border shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-primary px-4 py-3 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Your Stats</h2>
            </div>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800 border-yellow-300 font-medium"
            >
              Rank #42
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-4">
          {/* Current Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">
                Current Score
              </span>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                8,750 / 10,000
              </span>
            </div>
            <Progress value={87.5} className="h-2" />
            <div className="text-xs text-muted-foreground text-right">
              87.5% Complete
            </div>
          </div>

          {/* Stats Grid */}
          <div className="pt-3 border-t border-border">
            <div className="grid grid-cols-3 gap-3">
              {/* Daily Streak */}
              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3 text-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400 font-medium uppercase tracking-wide">
                  Daily Streak
                </div>
                <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                  7 days
                </div>
              </div>

              {/* Challenges */}
              <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-center">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase tracking-wide">
                  Challenges
                </div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                  12/15
                </div>
              </div>

              {/* Badges */}
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium uppercase tracking-wide">
                  Badges
                </div>
                <div className="text-lg font-bold text-green-700 dark:text-green-300">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Card */}
      <Card className="!pt-0 bg-card border border-border shadow-md overflow-hidden">
        <div className="bg-muted px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-foreground">Activity</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Last active</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              2 hours ago
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Joined</span>
            <span className="text-sm font-medium text-foreground">
              Sep 8, 2024
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Level</span>
            <Badge variant="outline" className="text-xs font-medium">
              Advanced
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfileBar;
