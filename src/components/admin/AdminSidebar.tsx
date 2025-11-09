import { NavLink } from "@/components/NavLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: LayoutDashboard,
      label: t("nav.dashboard"),
    },
    { to: "/admin/users", icon: Users, label: t("nav.users") },
    { to: "/signup", icon: UserPlus, label: t("nav.addUser") },
    { to: "/admin/assets", icon: Package, label: t("nav.assets") },
    { to: "/admin/posts", icon: FileText, label: t("nav.posts") },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col h-auto",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header with Toggle */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <h1 className="font-semibold text-gray-900 dark:text-white text-lg">
              Admin Portal
            </h1>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto shadow-md">
            <span className="text-white font-bold text-sm">C</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 hover:bg-white dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow-sm"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </Button>
      </div>

      {/* Main content area with flex layout */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Navigation - Scrollable area */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = isActiveLink(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 border border-transparent group",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white hover:shadow-md",
                  collapsed && "justify-center"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200 shadow-sm",
                    isActive
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:shadow-md"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                </div>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full ml-auto shadow-sm" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Section - Always at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start gap-3 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 border border-transparent hover:border-red-200 dark:hover:border-red-800 hover:shadow-md transition-all duration-200",
              collapsed && "justify-center"
            )}
          >
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-red-100 dark:group-hover:bg-red-800 group-hover:text-red-600 dark:group-hover:text-red-300 shadow-sm group-hover:shadow-md transition-all duration-200">
              <LogOut className="h-4 w-4 flex-shrink-0" />
            </div>
            {!collapsed && (
              <span className="text-sm font-medium">{t("auth.logout")}</span>
            )}
          </Button>

          {!collapsed && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Church Management System
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
