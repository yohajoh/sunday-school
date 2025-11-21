import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  LogOut,
  User,
  ChevronDown,
  Settings,
  Bell,
  HelpCircle,
  Church,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

export const AdminHeader: React.FC = () => {
  const { currentUser } = useApp();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfile = () => {
    setShowUserDropdown(false);
    navigate("/profile");
  };

  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "John Doe has joined the Sunday School",
      time: "5 minutes ago",
      unread: true,
      type: "user",
    },
    {
      id: 2,
      title: "Asset maintenance due",
      message: "Projector system requires maintenance",
      time: "2 hours ago",
      unread: true,
      type: "asset",
    },
    {
      id: 3,
      title: "New post published",
      message: "Weekly lesson has been published",
      time: "1 day ago",
      unread: false,
      type: "post",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 px-4 lg:px-6 py-3 lg:py-4 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Church className="h-4 w-4" />
          <span>/</span>
          <span className="font-medium text-slate-800 dark:text-slate-200">
            Admin Portal
          </span>
        </div>

        {/* Mobile Title - Only show on mobile */}
        <div className="lg:hidden">
          <h1 className="font-semibold text-slate-800 dark:text-white text-base">
            Admin Portal
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl z-50">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Notifications
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-100 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                        notification.unread
                          ? "bg-blue-50/50 dark:bg-blue-900/20"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notification.type === "user"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                              : notification.type === "asset"
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                          }`}
                        >
                          <Bell className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 dark:text-white text-sm">
                            {notification.title}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Language & Theme */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200"
            >
              <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-sm">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold text-sm">
                  {currentUser?.firstName?.[0]}
                  {currentUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {currentUser?.role}
                </p>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  showUserDropdown ? "rotate-180" : ""
                }`}
              />
            </Button>

            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl z-50">
                {/* User Info */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold">
                        {currentUser?.firstName?.[0]}
                        {currentUser?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                        {currentUser?.email}
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-1 text-xs capitalize"
                      >
                        {currentUser?.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2 space-y-1">
                  <button
                    onClick={handleProfile}
                    className="flex items-center gap-3 w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-sm">Help & Support</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
