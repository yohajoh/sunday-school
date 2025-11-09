import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Package,
  FileText,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Calendar,
  Sparkles,
  Zap,
  Shield,
  Home,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { t } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const stats = [
    {
      title: t("dashboard.totalUsers"),
      value: "234",
      icon: Users,
      trend: "+12%",
      trendDirection: "up",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    },
    {
      title: t("dashboard.totalAssets"),
      value: "89",
      icon: Package,
      trend: "+5%",
      trendDirection: "up",
      color: "text-violet-600",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    },
    {
      title: t("dashboard.activePosts"),
      value: "45",
      icon: FileText,
      trend: "+8%",
      trendDirection: "up",
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      title: t("dashboard.engagement"),
      value: "87%",
      icon: TrendingUp,
      trend: "+3%",
      trendDirection: "up",
      color: "text-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
    },
  ];

  const activities = [
    {
      id: 1,
      action: t("dashboard.newUserRegistered"),
      user: "John Doe",
      email: "john@church.org",
      time: "2 " + t("dashboard.hoursAgo"),
      details: t("dashboard.completedRegistration"),
      type: "user",
    },
    {
      id: 2,
      action: t("dashboard.assetUpdated"),
      user: "Admin",
      email: "admin@church.org",
      time: "5 " + t("dashboard.hoursAgo"),
      details: t("dashboard.updatedAssetStatus"),
      type: "asset",
    },
    {
      id: 3,
      action: t("dashboard.newPostPublished"),
      user: "Admin",
      email: "admin@church.org",
      time: "1 " + t("dashboard.daysAgo"),
      details: t("dashboard.publishedWelcomePost"),
      type: "post",
    },
    {
      id: 4,
      action: t("dashboard.newUserRegistered"),
      user: "Sarah Smith",
      email: "sarah@church.org",
      time: "3 " + t("dashboard.hoursAgo"),
      details: t("dashboard.completedRegistration"),
      type: "user",
    },
    {
      id: 5,
      action: t("dashboard.assetUpdated"),
      user: "Admin",
      email: "admin@church.org",
      time: "1 " + t("dashboard.daysAgo"),
      details: t("dashboard.updatedAssetStatus"),
      type: "asset",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-white" />;
      case "asset":
        return <Package className="h-4 w-4 text-white" />;
      case "post":
        return <FileText className="h-4 w-4 text-white" />;
      default:
        return <FileText className="h-4 w-4 text-white" />;
    }
  };

  const getActivityIconBg = (type: string) => {
    switch (type) {
      case "user":
        return "bg-gradient-to-br from-emerald-500 to-green-500";
      case "asset":
        return "bg-gradient-to-br from-violet-500 to-purple-500";
      case "post":
        return "bg-gradient-to-br from-amber-500 to-orange-500";
      default:
        return "bg-gradient-to-br from-slate-500 to-slate-600";
    }
  };

  const getTrendIcon = (direction: string) => {
    return direction === "up" ? (
      <ArrowUp className="h-3 w-3 text-emerald-600" />
    ) : (
      <ArrowDown className="h-3 w-3 text-red-600" />
    );
  };

  const handleExportReport = () => {
    console.log("Exporting dashboard report...");
    // Implement export functionality
  };

  const handleViewAllActivities = () => {
    console.log("Viewing all activities...");
    // Implement view all functionality
  };

  return (
    <div className="space-y-8 p-6">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-emerald-900 to-violet-900 p-8 text-white border border-emerald-500/20">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                  <Sparkles className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-200 to-violet-200 bg-clip-text text-transparent">
                    {t("nav.dashboard")}
                  </h1>
                  <p className="text-emerald-100 text-lg mt-2">
                    {t("dashboard.overview")}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Shield className="h-6 w-6 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-xs text-emerald-200">Uptime</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Zap className="h-6 w-6 text-amber-400" />
                  <div>
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-xs text-amber-200">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <Home className="h-6 w-6 text-violet-400" />
                  <div>
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-xs text-violet-200">Community</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-violet-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg">
            <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExportReport}
            className="flex items-center gap-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Download className="h-4 w-4" />
            {t("dashboard.exportReport")}
          </Button>
          <Button
            onClick={handleViewAllActivities}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Eye className="h-4 w-4" />
            {t("dashboard.viewAll")}
          </Button>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500 group rounded-3xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {stat.title}
              </CardTitle>
              <div className={`p-3 rounded-2xl ${stat.iconBg} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(stat.trendDirection)}
                <span
                  className={`text-sm font-semibold ${
                    stat.trendDirection === "up"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.trend}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {t("dashboard.fromLastMonth")}
                </span>
              </div>
            </CardContent>

            {/* Animated Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-full bg-gradient-to-r ${
                  stat.trendDirection === "up"
                    ? "from-emerald-500 to-green-500"
                    : "from-red-500 to-orange-500"
                } transition-all duration-1000`}
                style={{ width: "75%" }}
              ></div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          </Card>
        ))}
      </div>

      {/* Premium Recent Activity */}
      <Card className="border-0 bg-white dark:bg-slate-800 shadow-2xl rounded-3xl">
        <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white text-2xl">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <div>{t("dashboard.recentActivity")}</div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Latest updates and system activities
                </p>
              </div>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAllActivities}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-xl"
            >
              {t("dashboard.viewAll")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 py-5 px-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-all duration-300 group rounded-xl mx-2 my-2"
                onClick={() => setSelectedActivity(activity)}
              >
                <div
                  className={`p-3 rounded-2xl ${getActivityIconBg(
                    activity.type
                  )} shadow-lg`}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {activity.user} • {activity.email}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    {t("dashboard.viewDetails")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Premium Activity Detail Modal */}
      <Dialog
        open={!!selectedActivity}
        onOpenChange={() => setSelectedActivity(null)}
      >
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-2xl rounded-3xl">
          <DialogHeader className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <DialogTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
                <Eye className="h-5 w-5 text-white" />
              </div>
              {t("dashboard.activityDetails")}
            </DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {t("dashboard.action")}
                  </p>
                  <p className="text-base text-slate-800 dark:text-white font-semibold">
                    {selectedActivity.action}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {t("dashboard.time")}
                  </p>
                  <p className="text-base text-slate-800 dark:text-white font-semibold">
                    {selectedActivity.time}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {t("dashboard.user")}
                  </p>
                  <p className="text-base text-slate-800 dark:text-white font-semibold">
                    {selectedActivity.user}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {t("dashboard.email")}
                  </p>
                  <p className="text-base text-slate-800 dark:text-white font-semibold">
                    {selectedActivity.email}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {t("dashboard.details")}
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedActivity.details}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  onClick={() => setSelectedActivity(null)}
                  className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all duration-300"
                >
                  {t("dashboard.close")}
                </Button>
                <Button
                  onClick={handleExportReport}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t("dashboard.exportDetails")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
