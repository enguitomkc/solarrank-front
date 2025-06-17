"use client";

import { useEffect, useContext } from "react";
import { User, Award, MessageSquare, Grid, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { cn } from "@/utils/cn";
import { AuthContext } from "@/contexts/Auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

function Sidebar({ className, children }: SidebarProps) {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Get user's profile link
  const profileLink = user?.username
    ? `/profile/${user.username}`
    : "/profile/settings";

  useEffect(() => {
    // Ensure router is only used on the client side
    if (typeof window !== "undefined") {
      // Your router logic here
    }
  }, []);

  return (
    <div className={cn("flex h-screen", className)}>
      <div className="hidden md:flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 border-r border-border bg-background text-foreground z-40">
        <div className="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col transition-all">
          {/* Navigation Section */}
          <ScrollArea className="flex-1 p-2">
            <nav>
              <ul>
                <li className="mb-2">
                  <Link href="/leaderboard">
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-3 px-4 rounded-md hover:bg-muted">
                      <Award className="h-5 w-5" />
                      <span>Leaderboard</span>
                    </div>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/feed">
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-3 px-4 rounded-md hover:bg-muted">
                      <MessageSquare className="h-5 w-5" />
                      <span>Community Feed</span>
                    </div>
                  </Link>
                </li>
                <li className="mb-2">
                  <button className="flex gap-2 font-medium text-sm items-center w-full py-3 px-4 rounded-md hover:bg-muted">
                    <Grid className="h-5 w-5" />
                    <span>Learn</span>
                  </button>
                </li>
                <li className="mb-2">
                  <Link href={profileLink}>
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-3 px-4 rounded-md hover:bg-muted">
                      <User className="h-5 w-5" />
                      <span>Builds</span>
                    </div>
                  </Link>
                </li>
                {/* <li className="mb-2">
                  <button className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </button>
                </li>
                <li className="mb-2">
                  <Link href="/profile/settings">
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </div>
                  </Link>
                </li> */}
              </ul>
            </nav>
          </ScrollArea>
          {/* Footer / Action Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 font-medium text-sm p-2 text-center bg-primary/10 text-primary rounded-md hover:bg-primary/20"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button (visible outside sidebar) */}
      {/* <div className="fixed top-24 left-4 z-30 md:hidden">
        <AnimatedMenuToggle toggle={toggleSidebar} isOpen={isOpen} />
      </div> */}
      {children}
    </div>
  );
}

export default Sidebar;
