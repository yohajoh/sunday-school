// components/auth/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  console.log("🛡️ [ProtectedRoute] Rendering:", {
    path: location.pathname,
    requiredRole,
    isAuthenticated,
    isLoading,
    userRole: user?.role,
    userEmail: user?.email,
    timestamp: new Date().toISOString(),
  });

  // Show loading state only if we're still initializing
  if (isLoading) {
    console.log("🔄 [ProtectedRoute] Still loading auth state...");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50/30 to-rose-50/50 dark:from-slate-900 dark:via-amber-950/20 dark:to-rose-950/10">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  console.log("✅ [ProtectedRoute] Auth check completed:", {
    isAuthenticated,
    user: user?.email,
    path: location.pathname,
  });

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("🚫 [ProtectedRoute] Not authenticated, redirecting to login");
    // Don't redirect if we're already on login page to avoid loops
    if (location.pathname !== "/login") {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>; // Allow login page to render
  }

  // Check role requirements
  if (requiredRole && user?.role !== requiredRole) {
    console.log("🎭 [ProtectedRoute] Role check failed:", {
      required: requiredRole,
      actual: user?.role,
    });

    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Handle root path redirection
  if (location.pathname === "/") {
    console.log("📍 [ProtectedRoute] Root path redirect");
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Auto-redirect admins from user routes and users from admin routes
  if (!requiredRole) {
    // If admin tries to access user routes (like /dashboard)
    if (user?.role === "admin" && !location.pathname.startsWith("/admin")) {
      console.log(
        "🔄 [ProtectedRoute] Admin accessing user route, redirecting to admin"
      );
      return <Navigate to="/admin/dashboard" replace />;
    }

    // If user tries to access admin routes (like /admin/* without requiredRole)
    if (user?.role === "user" && location.pathname.startsWith("/admin")) {
      console.log(
        "🔄 [ProtectedRoute] User accessing admin route, redirecting to user"
      );
      return <Navigate to="/dashboard" replace />;
    }
  }

  console.log("✅ [ProtectedRoute] Access granted to:", location.pathname);
  return <>{children}</>;
};
