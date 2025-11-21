import React from "react";
import { useApp } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserForm } from "@/components/forms/UserForm";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User as UserIcon,
  Shield,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export const Profile: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser, updateUser } = useApp();

  const handleSave = async (userData: User) => {
    try {
      updateUser(userData.id, userData);
      toast.success(t("profile.profileUpdated"), {
        description: t("profile.changesSaved"),
      });
    } catch (error) {
      toast.error(t("profile.updateError"), {
        description: t("profile.tryAgainLater"),
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            {t("profile.loadingProfile")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:p-6">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800 via-amber-900 to-orange-900 p-6 sm:p-8 text-white border border-amber-500/20">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-400/30">
                  <UserIcon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                    {t("profile.title")}
                  </h1>
                  <p className="text-amber-100 text-sm sm:text-lg mt-2">
                    {t("profile.updateInfo")}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-1 sm:flex-none">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      Level 3
                    </p>
                    <p className="text-xs text-amber-200 truncate">
                      {t("profile.currentGrade")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-1 sm:flex-none">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      95%
                    </p>
                    <p className="text-xs text-orange-200 truncate">
                      {t("profile.attendance")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20 min-w-0 flex-1 sm:flex-none">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      Active
                    </p>
                    <p className="text-xs text-emerald-200 truncate">
                      {t("profile.status")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Quick Info */}
            <div className="text-left lg:text-right w-full lg:w-auto">
              <Badge className="bg-amber-500 text-white border-0 shadow-lg mb-3 lg:mb-2">
                {currentUser.role.toUpperCase()}
              </Badge>
              <div className="space-y-2 text-amber-100">
                <div className="flex items-center gap-2 lg:justify-end">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-2 lg:justify-end">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{currentUser.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 lg:justify-end">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{currentUser.church}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Profile Form Section */}
      <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white text-xl sm:text-2xl">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            {t("profile.editProfile")}
          </CardTitle>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
            {t("profile.updatePersonalInfo")}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <UserForm
            user={currentUser}
            mode="edit"
            onSave={handleSave}
            onCancel={() => window.history.back()}
          />
        </CardContent>
      </Card>

      {/* Additional Information Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-2xl rounded-2xl sm:rounded-3xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">
                {t("profile.accountSecurity")}
              </h3>
            </div>
            <p className="text-amber-100 text-xs sm:text-sm mb-4">
              {t("profile.accountSecurityDesc")}
            </p>
            <Badge className="bg-white/20 text-white border-0 text-xs">
              {t("profile.lastUpdated")}: {new Date().toLocaleDateString()}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm sm:text-base">
                {t("profile.membership")}
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {t("profile.memberSince")}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white truncate ml-2">
                  {new Date(currentUser.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {t("profile.studentId")}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-white truncate ml-2">
                  {currentUser.studentId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {t("profile.status")}
                </span>
                <Badge className="bg-green-500 text-white border-0 text-xs">
                  {currentUser.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
