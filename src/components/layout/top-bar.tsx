"use client";

import Link from "next/link";
import { BellIcon, SearchIcon, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

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

export function TopBar({ className }: TopBarProps) {
  const { user, isAuthenticated, logout } = useAuth();

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
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-black"></span>
            </Button>
          )}

          <ThemeToggle />

          {isAuthenticated && user ? (
            // Show user avatar when authenticated
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  {getUserInitials(user.name || user.email)}
                </div>
              </Button>

              {/* Dropdown menu on hover/click */}
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-popover-foreground border-b border-border">
                    <div className="font-medium">{user.name || "User"}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
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
