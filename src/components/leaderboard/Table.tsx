import { Card } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ArrowUp, ArrowDown, Trophy, Medal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/Pagination";

export interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  change: "up" | "down" | "none";
  badges: string[];
}

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function LeaderboardTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
}: LeaderboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-7">User</div>
        <div className="col-span-2 text-right">Score</div>
        <div className="col-span-2 text-right">Change</div>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <Card
            key={user.id}
            className="p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-1 text-center font-bold">
                {user.rank <= 3 ? (
                  <div className="inline-flex items-center justify-center">
                    {user.rank === 1 && (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    )}
                    {user.rank === 2 && (
                      <Medal className="h-5 w-5 text-gray-400" />
                    )}
                    {user.rank === 3 && (
                      <Medal className="h-5 w-5 text-amber-700" />
                    )}
                  </div>
                ) : (
                  user.rank
                )}
              </div>

              <div className="col-span-7 flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <div className="flex gap-1 mt-1">
                    {user.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2 text-right font-bold">
                {user.score.toLocaleString()}
              </div>

              <div className="col-span-2 text-right">
                {user.change === "up" && (
                  <div className="inline-flex items-center text-green-500">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>+5%</span>
                  </div>
                )}
                {user.change === "down" && (
                  <div className="inline-flex items-center text-red-500">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>-3%</span>
                  </div>
                )}
                {user.change === "none" && (
                  <span className="text-muted-foreground">No change</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {totalPages > 5 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default LeaderboardTable;
