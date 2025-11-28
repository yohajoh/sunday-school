// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { useAuthMutations } from "@/hooks/useAuthMutations";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: User & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;
  }>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isInitialized: false,
  });

  const queryClient = useQueryClient();
  const authMutations = useAuthMutations();

  // Add state to track login process
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Fetch current user - COMPLETELY DISABLED during login
  const {
    data: user,
    isLoading: queryLoading,
    error,
    isError,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async (): Promise<User | null> => {
      // BLOCK the GET request if we're in the middle of login
      if (isLoggingIn) {
        console.log("🚫 [AuthContext] BLOCKED: GET /me during login process");
        return null;
      }

      try {
        console.log("🔍 [AuthContext] Fetching user data from /me endpoint");
        const response = await fetch(`${API_BASE}/api/sunday-school/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.log("🔐 [AuthContext] User not authenticated");
            return null;
          }
          throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const data = await response.json();
        console.log(
          "✅ [AuthContext] User data fetched successfully:",
          data.data.user.email
        );
        return data.data.user;
      } catch (error) {
        console.error("❌ [AuthContext] Error fetching user:", error);
        return null;
      }
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
    enabled: !isLoggingIn, // COMPLETELY DISABLE during login
  });

  // Update authentication state
  useEffect(() => {
    console.log("🔄 [AuthContext] Auth state update:", {
      user: user?.email,
      queryLoading,
      isError,
      isSuccess,
      isFetching,
      isLoggingIn,
    });

    // If we're logging in, don't update state from query
    if (isLoggingIn) {
      console.log("⏳ [AuthContext] Login in progress, skipping state update");
      return;
    }

    // If query is finished loading and we're not logging in
    if (!queryLoading && !isFetching && !isLoggingIn) {
      const authenticated = !!user;

      setAuthState({
        user: user ?? null,
        isAuthenticated: authenticated,
        isLoading: false,
        isInitialized: true,
      });

      console.log("✅ [AuthContext] Auth state finalized:", {
        authenticated,
        user: user?.email,
        isInitialized: true,
      });
    } else {
      // Still loading
      setAuthState((prev) => ({
        ...prev,
        isLoading: true,
      }));
    }
  }, [user, queryLoading, isError, isSuccess, isFetching, isLoggingIn]);

  const login = async (email: string, password: string): Promise<void> => {
    console.log("🔑 [AuthContext] Login initiated - BLOCKING GET /me");

    // Set logging in state to true - this will block ALL GET /me requests
    setIsLoggingIn(true);

    // Clear any existing user data
    queryClient.setQueryData(["currentUser"], null);

    try {
      // Perform login mutation
      await authMutations.login.mutateAsync({ email, password });
      console.log("✅ [AuthContext] Login mutation completed");

      // Wait for cookies to be set - longer delay for reliability
      console.log("⏳ [AuthContext] Waiting for cookies to be set (1000ms)...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Now allow GET /me requests again
      setIsLoggingIn(false);

      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      // Force refetch with retry logic
      let retries = 0;
      const maxRetries = 3;

      while (retries < maxRetries) {
        try {
          console.log(
            `🔄 [AuthContext] Refetching user data (attempt ${retries + 1})`
          );
          const result = await queryClient.refetchQueries({
            queryKey: ["currentUser"],
            exact: true,
          });

          // Check if we have user data
          const userData = queryClient.getQueryData(["currentUser"]);
          if (userData) {
            console.log(
              "🎉 [AuthContext] User data successfully retrieved after login"
            );
            break;
          } else {
            console.log("⚠️ [AuthContext] No user data yet, retrying...");
            retries++;
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (refetchError) {
          console.error(
            `❌ [AuthContext] Refetch attempt ${retries + 1} failed:`,
            refetchError
          );
          retries++;
          if (retries >= maxRetries) {
            throw new Error(
              "Failed to verify login status after multiple attempts"
            );
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      console.log("✅ [AuthContext] Login process completed successfully");
    } catch (error) {
      console.error("❌ [AuthContext] Login failed:", error);
      // Ensure we re-enable GET /me even on failure
      setIsLoggingIn(false);
      queryClient.setQueryData(["currentUser"], null);
      throw error;
    }
  };

  const register = async (userData: User): Promise<void> => {
    await authMutations.register.mutateAsync(userData);
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };

  const logout = async (): Promise<void> => {
    console.log("🚪 [AuthContext] Logout initiated");
    await authMutations.logout.mutateAsync();
    // Immediately update local state
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: true,
    });
    queryClient.setQueryData(["currentUser"], null);
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    console.log("🔄 [AuthContext] Calling updateProfile with:", userData);
    try {
      await authMutations.updateProfile.mutateAsync(userData);
      console.log("✅ [AuthContext] updateProfile mutation completed");
    } catch (error) {
      console.error("❌ [AuthContext] updateProfile error:", error);
      throw error;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    await authMutations.changePassword.mutateAsync({
      currentPassword,
      newPassword,
    });
  };

  const value: AuthContextType = {
    user: authState.user,
    isLoading: authState.isLoading || isLoggingIn, // Include login state in loading
    isAuthenticated: authState.isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
