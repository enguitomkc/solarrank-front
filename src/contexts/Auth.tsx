"use client";

import { createContext, useCallback, useEffect, useState } from "react";
// import useAuthStore from "@/lib/stores/auth";
import { AuthStore, LoginRequest, RegisterRequest, User } from "@/types/auth";
import { apiRequest, axiosInstance } from "@/api/apiRequest";
import API from "@/api/enpoints";
import { msUntilJWTExpiry } from "@/utils/jwt";
import { setStrictTimeout } from "@/utils/time";

export const AuthContext = createContext<AuthStore>({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  clearError: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshSessionTimeout, setRefreshSessionTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize state from localStorage after component mounts and client is ready
  useEffect(() => {
    if (!isClient) return;

    const storedUser = safeLocalStorageGet("user");
    const storedIsAuthenticated = safeLocalStorageGet("isAuthenticated");
    const storedAccessToken = safeLocalStorageGet("accessToken");
    const storedRefreshToken = safeLocalStorageGet("refreshToken");

    if (storedUser && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.warn("Error parsing stored user:", error);
      }
    }
    if (storedIsAuthenticated === "true") {
      setIsAuthenticated(true);
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, [isClient]);

  const clearRefreshSessionTimeout = useCallback(() => {
    if (refreshSessionTimeout) {
      clearTimeout(refreshSessionTimeout);
      setRefreshSessionTimeout(null);
    }
  }, [refreshSessionTimeout]);

  const setAuthState = (data: {
    user: User | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
  }) => {
    setUser(data.user);
    setIsAuthenticated(data.isAuthenticated);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    // Set Authorization header for all future requests
    if (data.accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    }

    // Only update localStorage if we're on the client
    if (isClient) {
      safeLocalStorageSet("user", JSON.stringify(data.user));
      safeLocalStorageSet("isAuthenticated", data.isAuthenticated.toString());
      safeLocalStorageSet("accessToken", data.accessToken ?? "");
      safeLocalStorageSet("refreshToken", data.refreshToken ?? "");
    }

    clearRefreshSessionTimeout();
  };

  const signup = async (data: RegisterRequest) => {
    setIsLoading(true);
    const response = await apiRequest(API.AUTH.signup, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.success) {
      // Assert the type of response.data for the success case
      const successData = response.data as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };
      setAuthState({ ...successData, isAuthenticated: true });
    } else {
      // Assert the type of response.data for the error case
      // Assuming response.data contains an error string property when success is false
      const errorData = response.data as { error: string };
      setError(errorData.error);
    }
    setIsLoading(false);
  };

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    const response = await apiRequest(API.AUTH.login, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.success) {
      const successData = response.data as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };
      setAuthState({ ...successData, isAuthenticated: true });
    } else {
      const errorData = response.data as { error: string };
      setError(errorData.error);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    const response = await apiRequest(API.AUTH.logout, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      });
      clearRefreshSessionTimeout();
      // Clear Authorization header on logout
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    setIsLoading(false);
    // Redirect to landing page
    // router.push("/");
  };

  const refresh = async (currentRefreshToken: string) => {
    console.log(
      "AuthContext: refresh() called with token:",
      currentRefreshToken?.substring(0, 20)
    );
    const response = await apiRequest(API.AUTH.refresh, {
      method: "POST",
      body: JSON.stringify({ refreshToken: currentRefreshToken }),
    });
    console.log("AuthContext: refresh() API response:", response);

    if (response.success) {
      const successData = response.data as { accessToken: string };
      setAccessToken(successData.accessToken);
      if (isClient) {
        safeLocalStorageSet("accessToken", successData.accessToken);
      }

      // Directly clear the timeout and set the state to null
      if (refreshSessionTimeout) {
        clearTimeout(refreshSessionTimeout);
      }
      setRefreshSessionTimeout(null); // Ensure state is set to null

      console.log(
        "AuthContext: Token refreshed successfully at",
        new Date().toISOString()
      );
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${successData.accessToken}`;
    } else {
      console.error(
        "AuthContext: refresh() failed. Logging out. Error data:",
        response.data
      );
      logout();
    }
  };

  const verifyToken = async () => {
    setIsLoading(true);
    const response = await apiRequest(API.AUTH.verify, {
      method: "GET",
    });

    if (!response.success) {
      logout();
    }
    setIsLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  // Set Authorization header on app startup and verify user is authenticated
  useEffect(() => {
    if (accessToken && isClient) {
      // Set Authorization header for stored token
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      verifyToken();
    }
  }, [accessToken, isClient]);

  // Refresh access token if it's about to expire
  useEffect(() => {
    console.log("AuthContext: useEffect for refresh scheduling. State:", {
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      refreshSessionTimeout: !!refreshSessionTimeout, // This should be false to enter the if
    });

    if (accessToken && refreshToken && !refreshSessionTimeout) {
      const msTillExpiry = msUntilJWTExpiry(accessToken);
      const minutesUntilExpiry = Math.floor(msTillExpiry / 60000);
      const fiveMinutesBeforeExpiry = (minutesUntilExpiry - 5) * 60000;

      console.log("AuthContext: Scheduling refresh. Details:", {
        msTillExpiry,
        minutesUntilExpiry,
        fiveMinutesBeforeExpiry,
        currentTokenSnippet: accessToken?.substring(0, 20),
      });

      if (fiveMinutesBeforeExpiry < 0) {
        console.warn(
          `AuthContext: Calculated fiveMinutesBeforeExpiry is negative (${fiveMinutesBeforeExpiry}ms). Refresh might trigger immediately or indicate an expired token.`
        );
        // If the token is already expired or expiry is too soon,
        // consider logging out or attempting an immediate refresh if appropriate.
        // For now, we'll let it attempt to schedule, which might be immediate.
      }
      if (!isFinite(fiveMinutesBeforeExpiry)) {
        console.error(
          `AuthContext: Calculated fiveMinutesBeforeExpiry is not finite (${fiveMinutesBeforeExpiry}ms). Refresh will not be scheduled.`
        );
        return; // Don't schedule if delay is invalid
      }

      const newRefreshSessionTimeout = setStrictTimeout(async () => {
        console.log("AuthContext: Timeout fired. Attempting to refresh token.");
        // Ensure refreshToken is not null when calling refresh
        if (refreshToken) {
          await refresh(refreshToken);
        } else {
          console.error("AuthContext: refreshToken is null, cannot refresh.");
          // Optionally logout or handle this state appropriately
        }
      }, fiveMinutesBeforeExpiry);
      setRefreshSessionTimeout(newRefreshSessionTimeout);

      console.log(
        `AuthContext: Refresh timeout set with ID ${newRefreshSessionTimeout}. Will attempt refresh in ${
          fiveMinutesBeforeExpiry / 1000
        }s.`
      );
    }
  }, [
    accessToken,
    refreshToken,
    refreshSessionTimeout,
    // Removed clearRefreshSessionTimeout from dependencies
    // msUntilJWTExpiry is used but not a direct dependency; effect reruns due to accessToken changing
  ]);

  // Don't render until we're on the client side
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        accessToken,
        refreshToken,
        isLoading,
        error,
        signup,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Safe localStorage access helper with additional checks
const safeLocalStorageGet = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (error) {
    console.warn(`Error accessing localStorage for key "${key}":`, error);
  }
  return null;
};

const safeLocalStorageSet = (key: string, value: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.warn(`Error setting localStorage for key "${key}":`, error);
  }
};
