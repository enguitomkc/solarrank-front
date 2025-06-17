"use client";

import { useContext } from "react";
import Link from "next/link";
import { BellIcon, SearchIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { AuthContext } from "@/contexts/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface TopBarProps {
  className?: string;
}

// Helper function to get user initials
function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TopBar({ className }: TopBarProps) {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header
      className={cn(
        "bg-black text-white fixed top-0 left-0 right-0 z-50 h-16",
        className
      )}
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
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-black"></span>
            </Button>
          )}

          <ThemeToggle />

          {isAuthenticated && user ? (
            // Show user avatar when authenticated
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                    {getUserInitials(user.name || user.email)}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-popover border border-border"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Show sign in/sign up buttons when not authenticated
            <div className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
