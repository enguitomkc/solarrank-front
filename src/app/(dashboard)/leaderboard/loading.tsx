import { Trophy } from "lucide-react";

export default function LeaderboardLoading() {
  return (
    <div className="container min-h-[60vh] flex flex-col items-center justify-center">
      {/* Main Loading Section */}
      <div className="flex flex-col items-center space-y-8">
        {/* Circular Loader with Icon */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-muted border-t-primary animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Loading Text with Animation */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Loading Leaderboard
          </h2>
          <p className="text-muted-foreground">
            Fetching the latest rankings and scores
          </p>
        </div>

        {/* Animated Progress Dots */}
        <div className="flex space-x-2">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        </div>

        {/* Stats Preview Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8 w-full max-w-md">
          <div className="text-center p-4 bg-card border rounded-lg">
            <div className="h-6 w-6 mx-auto mb-2 bg-muted animate-pulse rounded"></div>
            <div className="h-3 w-12 mx-auto bg-muted animate-pulse rounded"></div>
          </div>
          <div className="text-center p-4 bg-card border rounded-lg">
            <div className="h-6 w-6 mx-auto mb-2 bg-muted animate-pulse rounded"></div>
            <div className="h-3 w-16 mx-auto bg-muted animate-pulse rounded"></div>
          </div>
          <div className="text-center p-4 bg-card border rounded-lg">
            <div className="h-6 w-6 mx-auto mb-2 bg-muted animate-pulse rounded"></div>
            <div className="h-3 w-14 mx-auto bg-muted animate-pulse rounded"></div>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 bg-muted rounded-full h-1.5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
        </div>

        {/* Fun Loading Messages */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground animate-pulse">
            Calculating solar energy rankings...
          </p>
        </div>
      </div>

      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-32 w-32 bg-primary/5 rounded-full animate-ping [animation-duration:3s]"></div>
        <div className="absolute top-3/4 right-1/4 h-24 w-24 bg-primary/5 rounded-full animate-ping [animation-duration:4s] [animation-delay:1s]"></div>
        <div className="absolute top-1/2 right-1/3 h-16 w-16 bg-primary/5 rounded-full animate-ping [animation-duration:5s] [animation-delay:2s]"></div>
      </div>
    </div>
  );
}
