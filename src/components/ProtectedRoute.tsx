"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/auth",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while we're still checking authentication status
    if (isLoading) return;

    // If no token or not authenticated, redirect to auth page
    if (!token || !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, token, router, redirectTo]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!token || !isAuthenticated) {
    return null;
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
}
