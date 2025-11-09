import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import heroImage from "@/assets/hero-church.jpg";
import { Eye, EyeOff, Lock, Mail, Sparkles, Church } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success(t("auth.welcome") || "Welcome back!");

      if (email.includes("admin")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/whats-new");
      }
    } catch (error) {
      toast.error(
        t("auth.loginError") || "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header with controls */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Login Form Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Clean Logo Section */}
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex justify-center">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-3xl border border-primary/20 animate-pulse-slow">
                  <Church className="h-16 w-16 text-primary animate-float" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="font-logo text-5xl text-slate-800 dark:text-white font-bold animate-slide-down">
                  Sunday School
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 font-medium animate-slide-down delay-100">
                  Ethiopian Orthodox Tewahedo Church
                </p>
              </div>
            </div>

            {/* Enhanced Form as Premium Card */}
            <div className="animate-scale-in delay-300">
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/50 p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {t("auth.email")}
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
                        <Input
                          id="email"
                          type="email"
                          placeholder={
                            t("auth.emailPlaceholder") || "your@email.com"
                          }
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary rounded-xl transition-all duration-300 h-12 hover:border-primary/50 focus:shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {t("auth.password")}
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={
                            t("auth.passwordPlaceholder") || "••••••••"
                          }
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary rounded-xl transition-all duration-300 h-12 hover:border-primary/50 focus:shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-300 hover:scale-110"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded transition-all duration-300 hover:scale-110"
                      />
                      <label
                        htmlFor="remember"
                        className="text-slate-700 dark:text-slate-300"
                      >
                        {t("auth.rememberMe") || "Remember me"}
                      </label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-primary hover:text-primary/90 font-medium transition-all duration-300 hover:scale-105"
                    >
                      {t("auth.forgotPassword") || "Forgot Password?"}
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group relative overflow-hidden h-12 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("auth.signingIn") || "Signing in..."}
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">{t("auth.login")}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600 opacity-100 group-hover:opacity-0 transition-all duration-500"></div>
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-3 text-sm">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300 dark:border-slate-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">
                          {t("auth.noAccount") || "Don't have an account?"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link
                        to="/signup"
                        className="inline-flex items-center justify-center w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-all duration-300 hover:shadow-lg h-12 transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {t("auth.signup")}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
                {t("auth.welcomeDescription") ||
                  "Access your Sunday School community, manage your profile, stay connected with announcements, and grow in faith together."}
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
                {t("auth.communityText") ||
                  "Join our growing spiritual community"}
              </span>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-2xl font-bold text-amber-400">50+</div>
                <div className="text-xs text-white/70">
                  {t("auth.weeklySessions") || "Weekly Sessions"}
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-2xl font-bold text-emerald-400">99%</div>
                <div className="text-xs text-white/70">
                  {t("auth.satisfaction") || "Satisfaction"}
                </div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-xs text-white/70">
                  {t("auth.support") || "Support"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
