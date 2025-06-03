"use client";

import { createContext, useEffect, useState } from "react";
// import useAuthStore from "@/lib/stores/auth";
import { AuthStore, LoginRequest, RegisterRequest, User } from "@/types/auth";
import { apiRequest, axiosInstance } from "@/api/apiRequest";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const setAuthState = (data: {
    user: User | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
  }) => {
    setUser(data.user);
    setIsAuthenticated(true);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    // Set Authorization header for all future requests
    if (data.accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("accessToken", data.accessToken ?? "");
    localStorage.setItem("refreshToken", data.refreshToken ?? "");
  };

  const signup = async (data: RegisterRequest) => {
    setIsLoading(true);
    const response = await apiRequest("/auth/signup", {
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
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.success) {
      const successData = response.data as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };
      console.log(successData, "successData");
      setAuthState({ ...successData, isAuthenticated: true });
    } else {
      const errorData = response.data as { error: string };
      setError(errorData.error);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    const response = await apiRequest("/auth/logout", {
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
      // Clear Authorization header on logout
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    setIsLoading(false);
    // Redirect to landing page
    // router.push("/");
  };

  const refresh = async (refreshToken: string) => {
    const response = await apiRequest("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    if (response.success) {
      // Assert the type of response.data for the success case
      const successData = response.data as { accessToken: string };
      setAccessToken(successData.accessToken);
      localStorage.setItem("accessToken", successData.accessToken);
      // Set Authorization header for the new access token
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${successData.accessToken}`;
    } else {
      // Assert the type of response.data for the error case
      const errorData = response.data as { error: string };
      setError(errorData.error);
    }
  };

  const verifyToken = async () => {
    const response = await apiRequest("/auth/verify", {
      method: "GET",
    });

    if (response.success) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  // Initialize auth state from localStorage and set Authorization header on app startup
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedAccessToken && storedUser && storedIsAuthenticated === "true") {
      setAccessToken(storedAccessToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      // Set Authorization header for stored token
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${storedAccessToken}`;
    }

    verifyToken();
  }, []); // Only run on mount

  // Logout if user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("logging out");
      logout();
      // router.push("/");
    }
  }, [isAuthenticated]);

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
