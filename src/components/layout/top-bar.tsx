"use client";

import Link from "next/link";
import { BellIcon, SearchIcon, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  return (
    <header
      className={cn("bg-black text-white sticky top-0 z-50 h-16", className)}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/solarrank-logo-header.png"
              alt="SolarRank"
              width={200}
              height={30}
              priority
            />
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden ml-2">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              className="bg-gray-800 w-full py-2 pl-10 pr-4 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right: Nav links, notifications, profile */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/feed">Feed</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/leaderboard">Leaderboard</Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-black"></span>
          </Button>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              JS
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
