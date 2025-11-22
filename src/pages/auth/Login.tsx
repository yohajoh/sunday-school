import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-church.jpg";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Church,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Login: React.FC = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "password",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!", {
        description: "You have successfully signed in.",
      });
      navigate("/");
    } catch (error) {
      toast.error(t("auth.loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const demoLogin = (isAdmin: boolean) => {
    setFormData({
      email: isAdmin ? "admin@sundayschool.org" : "user@church.org",
      password: "password",
      rememberMe: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}

      <div className="flex-1 flex flex-col gap-4 p-4 lg:p-8 bg-gradient-to-br from-amber-50 via-orange-50/30 to-rose-50/50 dark:from-slate-900 dark:via-amber-950/20 dark:to-rose-950/10 lg:gap-20">
        <div className="flex items-center gap-1 justify-end">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="flex justify-center">
          <Card className=" bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg">
                  <Church className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t("auth.welcome")}
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm lg:text-base">
                {t("auth.welcomeDescription")}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {t("auth.email")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-sm lg:text-base"
                      placeholder={t("auth.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {t("auth.password")}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      required
                      className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-sm lg:text-base"
                      placeholder={t("auth.passwordPlaceholder")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        updateField("rememberMe", checked)
                      }
                      className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm text-slate-700 dark:text-slate-300"
                    >
                      {t("auth.rememberMe")}
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-amber-600 dark:text-amber-400 hover:underline whitespace-nowrap"
                  >
                    {t("auth.forgotPassword")}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t("auth.signingIn")}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      {t("auth.login")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                      {t("auth.demoCredentials")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => demoLogin(true)}
                    className="border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl text-xs lg:text-sm"
                  >
                    {t("auth.adminAccess")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => demoLogin(false)}
                    className="border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl text-xs lg:text-sm"
                  >
                    {t("auth.memberAccess")}
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t("auth.noAccount")}{" "}
                  <Link
                    to="/signup"
                    className="text-amber-600 dark:text-amber-400 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    {t("auth.signup")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Enhanced Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        {/* Enhanced Overlay Content */}
        <div className="relative h-full flex items-end p-12">
          <div className="text-white space-y-6 max-w-lg animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-4xl font-bold font-ethiopic mb-4 bg-gradient-to-r from-amber-200 to-emerald-200 bg-clip-text text-transparent">
                {t("auth.welcome")}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {t("auth.welcomeDescription")}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/20">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-110"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-110"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-white shadow-lg transform transition-all duration-300 hover:scale-110"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs text-white font-semibold transform transition-all duration-300 hover:scale-110">
                  +500
                </div>
              </div>
              <span className="text-white/80 text-sm font-medium">
                {t("auth.communityText")}
              </span>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-2xl font-bold text-amber-400">50+</div>
                <div className="text-xs text-white/70">
                  {t("auth.weeklySessions")}
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-2xl font-bold text-emerald-400">99%</div>
                <div className="text-xs text-white/70">
                  {t("auth.satisfaction")}
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-xs text-white/70">{t("auth.support")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
    </div>
  );
};
