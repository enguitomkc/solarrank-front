"use client";

import { createContext, useCallback, useEffect, useState } from "react";
// import useAuthStore from "@/lib/stores/auth";
import { AuthStore, LoginRequest, RegisterRequest, User } from "@/types/auth";
import { apiRequest, axiosInstance } from "@/api/apiRequest";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
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
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken") || null
  );
  const [error, setError] = useState<string | null>(null);
  const [refreshSessionTimeout, setRefreshSessionTimeout] =
    useState<NodeJS.Timeout | null>(null);

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

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isAuthenticated", data.isAuthenticated.toString());
    localStorage.setItem("accessToken", data.accessToken ?? "");
    localStorage.setItem("refreshToken", data.refreshToken ?? "");

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

  const refresh = async (refreshToken: string) => {
    const response = await apiRequest(API.AUTH.refresh, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success) {
      // Assert the type of response.data for the success case
      const successData = response.data as { accessToken: string };
      setAccessToken(successData.accessToken);
      localStorage.setItem("accessToken", successData.accessToken);
      clearRefreshSessionTimeout();
      // Set Authorization header for the new access token
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${successData.accessToken}`;
    } else {
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
    if (accessToken) {
      // Set Authorization header for stored token
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    verifyToken();
  }, []);

  useEffect(() => {
    if (accessToken && refreshToken && !refreshSessionTimeout) {
      const minutesUntilExpiry = Math.floor(
        msUntilJWTExpiry(accessToken) / 60000
      );
      const fiveMinutesBeforeExpiry = (minutesUntilExpiry - 1) * 60000;

      const refreshSessionTimeout = setStrictTimeout(async () => {
        await refresh(refreshToken);
      }, fiveMinutesBeforeExpiry);
      setRefreshSessionTimeout(refreshSessionTimeout);
    }
  }, [
    accessToken,
    refreshSessionTimeout,
    refreshToken,
    clearRefreshSessionTimeout,
  ]);

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
