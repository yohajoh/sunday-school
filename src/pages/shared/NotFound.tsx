import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Compass, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-orange-50/50 dark:from-slate-900 dark:via-rose-950/20 dark:to-orange-950/10 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-6 sm:mb-8">
          <div className="text-7xl sm:text-9xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent animate-pulse">
            404
          </div>
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4">
            <div className="p-2 sm:p-4 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl animate-bounce">
              <Compass className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
              {t("notFound.title")}
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("notFound.description")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("notFound.goBack")}
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <Home className="h-4 w-4 mr-2" />
              {t("notFound.homePage")}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400">
                404
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t("notFound.errorCode")}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                0
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t("notFound.pagesHere")}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ∞
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t("notFound.possibilities")}
              </div>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-800 mt-6 sm:mt-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-sm sm:text-base">
                {t("notFound.searchSuggestionTitle")}
              </h3>
            </div>
            <p className="text-blue-700 dark:text-blue-400 text-xs sm:text-sm">
              {t("notFound.searchSuggestionDescription")}
            </p>
          </div>

          {/* Additional Help Section */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <Navigation className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                {t("notFound.helpTitle")}
              </h3>
            </div>
            <p className="text-purple-700 dark:text-purple-400 text-xs sm:text-sm mb-3 sm:mb-4">
              {t("notFound.helpDescription")}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/users")}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {t("nav.users")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/assets")}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {t("nav.assets")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/posts")}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {t("nav.posts")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/profile")}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              >
                {t("nav.profile")}
              </Button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm">
              {t("notFound.contactSupport")}{" "}
              <button
                onClick={() => navigate("/contact")}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 underline transition-colors"
              >
                {t("notFound.contactLink")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
