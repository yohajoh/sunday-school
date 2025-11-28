// hooks/useAuthMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { User } from "@/types";

interface LoginData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
  token?: string;
}

interface ErrorResponse {
  status: string;
  message: string;
}

const API_BASE = import.meta.env.VITE_API_URL;

// Helper function to store token
export const storeToken = (token: string) => {
  // Make sure this is exported
  localStorage.setItem("auth_token", token);
};

// Helper function to get token
export const getStoredToken = (): string | null => {
  // Make sure this is exported
  return localStorage.getItem("auth_token");
};

// Helper function to remove token
export const removeToken = () => {
  // Make sure this is exported
  localStorage.removeItem("auth_token");
};

export const useAuthMutations = () => {
  const queryClient = useQueryClient();

  // Register Mutation
  const registerMutation = useMutation<AuthResponse, ErrorResponse, User>({
    mutationFn: async (userData: User) => {
      const response = await fetch(
        `${API_BASE}/api/sunday-school/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Registration successful!", {
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: ErrorResponse) => {
      toast.error("Registration failed", {
        description: error.message || "Please try again.",
      });
    },
  });

  // Login Mutation
  const loginMutation = useMutation<AuthResponse, ErrorResponse, LoginData>({
    mutationFn: async (loginData: LoginData) => {
      const response = await fetch(`${API_BASE}/api/sunday-school/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Login successful!", {
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error: ErrorResponse) => {
      toast.error("Login failed", {
        description: error.message || "Please check your credentials.",
      });
    },
  });

  // Logout Mutation
  // hooks/useAuthMutations.ts - Update logout mutation
  const logoutMutation = useMutation<void, ErrorResponse, void>({
    mutationFn: async () => {
      const response = await fetch(
        `${API_BASE}/api/sunday-school/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }
    },
    onSuccess: () => {
      // Remove from localStorage first
      removeToken();

      // Clear ALL queries from cache
      queryClient.removeQueries();
      queryClient.clear();

      toast.success("Logged out successfully");
    },
    onError: (error: ErrorResponse) => {
      // Even if there's an error, clear local auth state
      removeToken();
      queryClient.removeQueries();
      queryClient.clear();

      toast.error("Logout failed", {
        description: error.message,
      });
    },
  });

  // Change Password Mutation
  const changePasswordMutation = useMutation<
    void,
    ErrorResponse,
    ChangePasswordData
  >({
    mutationFn: async (passwordData: ChangePasswordData) => {
      const response = await fetch(
        `${API_BASE}/api/sunday-school/auth/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(passwordData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password change failed");
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: ErrorResponse) => {
      toast.error("Password change failed", {
        description: error.message || "Please try again.",
      });
    },
  });

  // Update Profile Mutation - FIXED VERSION
  const updateProfileMutation = useMutation<User, ErrorResponse, Partial<User>>(
    {
      mutationFn: async (userData: Partial<User>) => {
        const response = await fetch(
          `${API_BASE}/api/sunday-school/auth/update-me`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
          }
        );

        // Read response as text first for debugging
        const responseText = await response.text();

        if (!responseText) {
          throw new Error("Empty response from server");
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("❌ [useAuthMutations] JSON parse error:", parseError);
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              `Profile update failed with status ${response.status}`
          );
        }

        // FIX: Return the user data from the correct path
        if (!data.data || !data.data.user) {
          throw new Error("Invalid response structure from server");
        }

        return data.data.user;
      },
      onSuccess: (updatedUser) => {
        console.log(
          "🎉 [useAuthMutations] onSuccess - Updated user:",
          updatedUser
        );
        toast.success("Profile updated successfully");
        // Update user in cache
        queryClient.setQueryData(["currentUser"], updatedUser);
      },
      onError: (error: ErrorResponse) => {
        console.error("💥 [useAuthMutations] onError:", error);
        toast.error("Profile update failed", {
          description: error.message || "Please try again.",
        });
      },
    }
  );

  return {
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
    changePassword: changePasswordMutation,
    updateProfile: updateProfileMutation,
  };
};
