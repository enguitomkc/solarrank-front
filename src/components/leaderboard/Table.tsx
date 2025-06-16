import { Card } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Trophy, Medal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/Pagination";
import { IUser } from "@/types/apiResponse/User";

function LeaderboardTable({
  users,
  currentPage,
  totalPages,
  onPageChange,
}: {
  users: IUser[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // Safety check to ensure users is an array
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 py-3 px-4 text-sm font-medium text-muted-foreground border-b">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-7">User</div>
        <div className="col-span-2 text-right">Score</div>
        <div className="col-span-2 text-right">Change</div>
      </div>

      <div className="space-y-2">
        {safeUsers.map((user, index) => (
          <Card
            key={user.id}
            className="p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-1 text-center font-bold">
                {index + 1 <= 3 ? (
                  <div className="inline-flex items-center justify-center">
                    {index + 1 === 1 && (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    )}
                    {index + 1 === 2 && (
                      <Medal className="h-5 w-5 text-gray-400" />
                    )}
                    {index + 1 === 3 && (
                      <Medal className="h-5 w-5 text-amber-700" />
                    )}
                  </div>
                ) : (
                  index + 1
                )}
              </div>

              <div className="col-span-7 flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage
                    src={user.profile_image}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {/* <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <div className="flex gap-1 mt-1">
                    {user.badges?.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div> */}
              </div>

              <div className="col-span-2 text-right font-bold">
                {user.total_energy.toLocaleString()}
              </div>

              {/* <div className="col-span-2 text-right">
                {user.total_energy_change === "up" && (
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
              </div> */}
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
