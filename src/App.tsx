// App.js or App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Auth Pages
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";

// Admin Pages
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { Users } from "@/pages/admin/Users";
import { Assets } from "@/pages/admin/Assets";
import { Posts } from "@/pages/admin/Posts";
import { AdminGalleryPage } from "@/pages/admin/AdminGalleryPage";

// User Pages
import { UserDashboard } from "@/pages/user/Dashboard";
import { WhatsNew } from "@/pages/user/WhatsNew";
import { UserGalleryPage } from "@/pages/user/UserGalleryPage";

// Shared Pages
import { NotFound } from "@/pages/shared/NotFound";
import { Profile } from "@/pages/shared/Profile";
import { Unauthorized } from "@/pages/shared/Unauthorized";

// Layout Components
import { AdminLayout } from "@/components/layout/AdminLayout";
import { UserLayout } from "@/components/layout/UserLayout";

// Toast component
import { Toaster } from "sonner";
import { UserForm } from "./components/forms/UserForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppProvider>
          <LanguageProvider>
            <AuthProvider>
              <Router>
                <div className="App">
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      className:
                        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 text-slate-800 dark:text-white",
                    }}
                  />
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                    {/* Root path - redirects based on role */}
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <div />{" "}
                          {/* Empty element, will redirect in ProtectedRoute */}
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Routes - Protected and Admin only */}
                    <Route
                      path="/admin/*"
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="users/new" element={<UserForm />} />
                      <Route path="assets" element={<Assets />} />
                      <Route path="posts" element={<Posts />} />
                      <Route path="gallery" element={<AdminGalleryPage />} />
                      <Route path="profile" element={<Profile />} />
                      <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                      />
                    </Route>

                    {/* User Routes - Protected for all authenticated users */}
                    <Route
                      path="/*"
                      element={
                        <ProtectedRoute>
                          <UserLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="dashboard" element={<UserDashboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="whats-new" element={<WhatsNew />} />
                      <Route path="gallery" element={<UserGalleryPage />} />
                      <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                      />
                    </Route>

                    {/* Specific role-protected routes */}
                    <Route
                      path="/admin-only-page"
                      element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback Routes */}
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </div>
              </Router>
            </AuthProvider>
          </LanguageProvider>
        </AppProvider>
      </ThemeProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
