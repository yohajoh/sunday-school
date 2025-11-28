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

  // Fetch current user with better error handling
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
      try {
        const response = await fetch(`${API_BASE}/api/sunday-school/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            return null;
          }
          throw new Error(`Failed to fetch user: ${response.status}`);
        }

        const data = await response.json();
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
  });

  // Update authentication state with better logic
  useEffect(() => {
    console.log("🔄 [AuthContext] Auth state update:", {
      user: user?.email,
      queryLoading,
      isError,
      isSuccess,
      isFetching,
    });

    // If query is finished loading (success or error) and we have user data
    if (!queryLoading && !isFetching) {
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
  }, [user, queryLoading, isError, isSuccess, isFetching]);

  const login = async (email: string, password: string): Promise<void> => {
    console.log("🔑 [AuthContext] Login initiated");
    try {
      await authMutations.login.mutateAsync({ email, password });
      console.log("✅ [AuthContext] Login mutation completed");

      // Wait longer to ensure cookies are properly set
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      console.log(
        "✅ [AuthContext] User data invalidated, will refetch automatically"
      );
    } catch (error) {
      console.error("❌ [AuthContext] Login failed:", error);
      throw error;
    }
  };

  const register = async (userData: User): Promise<void> => {
    await authMutations.register.mutateAsync(userData);
    // Wait and then refetch user data
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
    // Clear all queries
    queryClient.clear();
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
    isLoading: authState.isLoading,
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
