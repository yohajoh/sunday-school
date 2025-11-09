import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LogOut,
  User,
  ChevronDown,
  Settings,
  Mail,
  Phone,
  Sparkles,
  Church,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUpdateProfile = () => {
    setShowUserDropdown(false);
    navigate("/admin/profile");
  };

  // Safe user data extraction
  const getUserInitials = () => {
    if (!user) return "A";
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    if (user.firstName) return user.firstName.charAt(0);
    if (user.name) return user.name.charAt(0);
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "A";
  };

  const getUserDisplayName = () => {
    if (!user) return t("auth.admin") || "Administrator";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) return user.firstName;
    if (user.name) return user.name;
    if (user.email) return user.email.split("@")[0];
    return t("auth.admin") || "Administrator";
  };

  const getUserEmail = () => {
    return user?.email || "admin@church.org";
  };

  const getUserRole = () => {
    return user?.role || t("auth.admin") || "Administrator";
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 border-b backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 px-6 py-3 shadow-sm transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 shadow-md"
          : "bg-white/70 dark:bg-slate-900/70"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center justify-between">
        {/* Compact Logo Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl shadow-md">
            <Church className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-logo text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Sunday School
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t("nav.adminPortal") || "Admin Portal"}
            </p>
          </div>
        </motion.div>

        {/* User Controls */}
        <div className="flex items-center gap-4">
          {/* Language and Theme */}
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <LanguageSwitcher />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Compact User Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-sm hover:shadow-md transition-all duration-300 group backdrop-blur-sm"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                  <span className="text-white font-semibold text-sm">
                    {getUserInitials()}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white dark:border-slate-800"></div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {getUserDisplayName()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {getUserRole()}
                </span>
              </div>
              <motion.div
                animate={{ rotate: showUserDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-slate-400 group-hover:text-blue-500"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showUserDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, type: "spring" }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl z-50 overflow-hidden"
                >
                  {/* User Profile Header */}
                  <div className="p-6 bg-gradient-to-br from-blue-500 to-violet-500 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>

                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                          <span className="text-blue-600 font-bold text-lg">
                            {getUserInitials()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-1">
                          {getUserDisplayName()}
                        </h3>
                        <p className="text-blue-100 text-sm mb-2">
                          {getUserRole()}
                        </p>
                        <div className="flex items-center gap-2 text-blue-100 text-xs">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[140px]">
                            {getUserEmail()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Actions */}
                  <div className="p-3 space-y-1">
                    <motion.button
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        scale: 1.01,
                      }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleUpdateProfile}
                      className="w-full flex items-center gap-3 px-3 py-3 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 group"
                    >
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-md">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start flex-1">
                        <span className="text-sm font-medium">
                          {t("nav.profile")}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {t("profile.updateInfo") ||
                            "Edit your personal information"}
                        </span>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        scale: 1.01,
                      }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group"
                    >
                      <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-md">
                        <LogOut className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex flex-col items-start flex-1">
                        <span className="text-sm font-medium">
                          {t("auth.logout")}
                        </span>
                        <span className="text-xs text-red-500/70 dark:text-red-400/70">
                          {t("auth.logoutDesc") || "Log out from your account"}
                        </span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t("auth.lastLogin") || "Last login"}:{" "}
                        {new Date().toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-1 text-green-500">
                        <Sparkles className="h-3 w-3" />
                        <span className="text-xs font-medium">Online</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
