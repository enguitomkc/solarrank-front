"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useState } from "react";

type SortOption = "newest" | "top";

function FeedPostSorter() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    // In a real app, you would trigger a fetch with the new sort parameter
  };

  return (
    <div className="flex items-center">
      <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="capitalize">
            {sortBy}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSort("newest")}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("top")}>
            Top
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default FeedPostSorter;
