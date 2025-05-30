"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Award,
  MessageSquare,
  Settings,
  Bell,
  Grid,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AnimatedMenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

const AnimatedMenuToggle = ({ toggle, isOpen }: AnimatedMenuToggleProps) => (
  <button
    onClick={toggle}
    aria-label="Toggle menu"
    className="focus:outline-none z-50"
  >
    <motion.div animate={{ y: isOpen ? 13 : 0 }} transition={{ duration: 0.3 }}>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
        className="text-foreground"
      >
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 2.5 L 22 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 12 L 22 12", opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          fill="transparent"
          strokeWidth="3"
          stroke="currentColor"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 21.5 L 22 21.5" },
            open: { d: "M 3 2.5 L 17 16.5" },
          }}
        />
      </motion.svg>
    </motion.div>
  </button>
);

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { logout, user } = useAuth();
  const router = useRouter();

  const mobileSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const sidebarVariants = {
    open: {
      width: "16rem",
    },
    closed: {
      width: "3.5rem",
    },
  };

  const contentVariants = {
    open: { display: "block", opacity: 1 },
    closed: { display: "block", opacity: 1 },
  };

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        x: { stiffness: 100 },
      },
    },
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

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
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileSidebarVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 bg-background text-foreground border-r border-border"
          >
            <div className="flex flex-col h-full">
              {/* Profile Section */}
              <div className="p-4 border-b border-border">
                <Link href={profileLink} onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-muted/50 rounded-lg p-2 transition-colors">
                    <Avatar className="h-12 w-12 bg-muted">
                      <AvatarImage
                        src={user?.profile_image}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback>
                        {user?.name
                          ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user?.name || "User"}</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              {/* Navigation Section */}
              <ScrollArea className="flex-1 p-4">
                <nav>
                  <ul>
                    <li className="mb-2">
                      <Link href="/feed" onClick={() => setIsOpen(false)}>
                        <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                          <Home className="h-5 w-5" />
                          Home
                        </div>
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        href="/leaderboard"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                          <Award className="h-5 w-5" />
                          Leaderboard
                        </div>
                      </Link>
                    </li>
                    <li className="mb-2">
                      <button className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                        <Grid className="h-5 w-5" />
                        Tasks/Challenges
                      </button>
                    </li>
                    <li className="mb-2">
                      <Link href="/feed" onClick={() => setIsOpen(false)}>
                        <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                          <MessageSquare className="h-5 w-5" />
                          Community Feed
                        </div>
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href={profileLink} onClick={() => setIsOpen(false)}>
                        <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                          <User className="h-5 w-5" />
                          Profile
                        </div>
                      </Link>
                    </li>
                    <li className="mb-2">
                      <button className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                        <Bell className="h-5 w-5" />
                        Notifications
                      </button>
                    </li>
                    <li className="mb-2">
                      <Link
                        href="/profile/settings"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                          <Settings className="h-5 w-5" />
                          Settings
                        </div>
                      </Link>
                    </li>
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
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        className="hidden md:flex flex-col fixed top-16 left-0 h-full border-r border-border bg-background text-foreground z-40"
        initial={isCollapsed ? "closed" : "open"}
        animate={isCollapsed ? "closed" : "open"}
        variants={sidebarVariants}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <motion.div
          className="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col transition-all"
          variants={contentVariants}
        >
          {/* Profile Section */}
          <div className="p-4 border-b border-border">
            <Link href={profileLink}>
              <div className="flex items-center space-x-3 hover:bg-muted/50 rounded-lg p-2 transition-colors">
                <Avatar className="h-10 w-10 bg-muted">
                  <AvatarImage
                    src={user?.profile_image}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <motion.div variants={variants} className="flex flex-col">
                  {!isCollapsed && (
                    <>
                      <p className="font-semibold">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email || "user@example.com"}
                      </p>
                    </>
                  )}
                </motion.div>
              </div>
            </Link>
          </div>
          {/* Navigation Section */}
          <ScrollArea className="flex-1 p-2">
            <nav>
              <ul>
                <li className="mb-2">
                  <Link href="/leaderboard">
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                      <Award className="h-5 w-5" />
                      <motion.span variants={variants}>
                        {!isCollapsed && "Leaderboard"}
                      </motion.span>
                    </div>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/feed">
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                      <MessageSquare className="h-5 w-5" />
                      <motion.span variants={variants}>
                        {!isCollapsed && "Community Feed"}
                      </motion.span>
                    </div>
                  </Link>
                </li>
                <li className="mb-2">
                  <button className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                    <Grid className="h-5 w-5" />
                    <motion.span variants={variants}>
                      {!isCollapsed && "Tasks/Challenges"}
                    </motion.span>
                  </button>
                </li>
                <li className="mb-2">
                  <Link href={profileLink}>
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                      <User className="h-5 w-5" />
                      <motion.span variants={variants}>
                        {!isCollapsed && "Profile"}
                      </motion.span>
                    </div>
                  </Link>
                </li>
                <li className="mb-2">
                  <button className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                    <Bell className="h-5 w-5" />
                    <motion.span variants={variants}>
                      {!isCollapsed && "Notifications"}
                    </motion.span>
                  </button>
                </li>
                <li className="mb-2">
                  <Link href="/profile/settings">
                    <div className="flex gap-2 font-medium text-sm items-center w-full py-2 px-4 rounded-md hover:bg-muted">
                      <Settings className="h-5 w-5" />
                      <motion.span variants={variants}>
                        {!isCollapsed && "Settings"}
                      </motion.span>
                    </div>
                  </Link>
                </li>
              </ul>
              {/* Toggleable Sections */}
              {!isCollapsed && <div className="mt-4"></div>}
            </nav>
          </ScrollArea>
          {/* Footer / Action Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 font-medium text-sm p-2 text-center bg-primary/10 text-primary rounded-md hover:bg-primary/20"
            >
              <LogOut className="h-4 w-4" />
              <motion.span variants={variants}>
                {!isCollapsed && "Sign out"}
              </motion.span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Toggle Button (visible outside sidebar) */}
      <div className="fixed top-24 left-4 z-30 md:hidden">
        <AnimatedMenuToggle toggle={toggleSidebar} isOpen={isOpen} />
      </div>
      {children}
    </div>
  );
}
