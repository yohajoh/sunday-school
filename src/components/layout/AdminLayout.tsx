import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { useApp } from "@/contexts/AppContext";
import { Menu, Bell, User, Languages, SunMoon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const { currentUser } = useApp();
  const location = useLocation();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
    setShowMobileNotifications(false);
    setShowMobileProfile(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMobileNotifications(false);
      setShowMobileProfile(false);
    };

    if (showMobileNotifications || showMobileProfile) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showMobileNotifications, showMobileProfile]);

  // Don't show layout for auth pages
  if (
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup")
  ) {
    return <Outlet />;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

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
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Mobile Notifications Dropdown
  const MobileNotifications = () => (
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
              notification.unread ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  notification.type === "user"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                    : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
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
  );

  // Mobile Profile Dropdown
  const MobileProfileDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl z-50">
      {/* User Info */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-md">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold">
              {currentUser?.firstName?.[0]}
              {currentUser?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm truncate">
              {currentUser?.firstName} {currentUser?.lastName}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {currentUser?.email}
            </p>
            <Badge variant="secondary" className="mt-1 text-xs capitalize">
              {currentUser?.role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-2 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200 text-sm">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200 text-sm">
          <Languages className="h-4 w-4" />
          <span>Language</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors duration-200 text-sm">
          <SunMoon className="h-4 w-4" />
          <span>Theme</span>
        </button>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 text-sm">
          <X className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Desktop Sidebar - Always visible on desktop */}
      <div className={`${isMobile ? "hidden" : "block"}`}>
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={false}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent
          side="left"
          className="w-80 p-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto"
        >
          <AdminSidebar
            collapsed={false}
            onToggle={() => {}}
            isMobile={true}
            onClose={() => setMobileSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        {isMobile && (
          <header className="lg:hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 px-4 py-3 shadow-sm sticky top-0 z-30">
            <div className="flex items-center justify-between">
              {/* Left: Menu Button & Title */}
              <div className="flex items-center gap-3 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="h-9 w-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div className="flex-1 min-w-0">
                  <h1 className="font-semibold text-slate-800 dark:text-white text-sm truncate">
                    Sunday School
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center gap-1">
                {/* Language Switcher - Compact */}
                <div className="relative">
                  <LanguageSwitcher />
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMobileNotifications(!showMobileNotifications);
                      setShowMobileProfile(false);
                    }}
                    className="relative h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                  {showMobileNotifications && <MobileNotifications />}
                </div>

                {/* Profile */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMobileProfile(!showMobileProfile);
                      setShowMobileNotifications(false);
                    }}
                    className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs">
                        {currentUser?.firstName?.[0]}
                        {currentUser?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                  {showMobileProfile && <MobileProfileDropdown />}
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Desktop Header */}
        {!isMobile && <AdminHeader />}

        {/* Main Content */}
        <main
          className={`flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 ${
            isMobile ? "p-3" : "p-6"
          }`}
        >
          <div className={`${isMobile ? "w-full" : "max-w-full mx-auto"}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
