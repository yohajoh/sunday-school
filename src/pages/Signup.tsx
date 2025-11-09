import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Shield,
  BookOpen,
  Home,
  Target,
  Star,
  CheckCircle2,
  ArrowRight,
  Church,
} from "lucide-react";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    occupation: "",
    education: "",
    currentSundaySchool: "",
    responsibility: "",
    aboutMe: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signup(formData);
      toast.success("Account created successfully!");
      navigate("/whats-new");
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  const StepIndicator = ({
    number,
    title,
    isActive,
    isCompleted,
  }: {
    number: number;
    title: string;
    isActive: boolean;
    isCompleted: boolean;
  }) => (
    <div className="flex items-center gap-3">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isCompleted
            ? "bg-emerald-500 border-emerald-500 text-white"
            : isActive
            ? "bg-blue-500 border-blue-500 text-white"
            : "border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
        }`}
      >
        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : number}
      </div>
      <span
        className={`text-sm font-medium hidden sm:block transition-all duration-300 ${
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {title}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30 dark:from-slate-900 dark:via-blue-950/10 dark:to-emerald-950/5">
      {/* Premium Header */}
      <div className="flex justify-between items-center p-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <Link to="/login" className="group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Church className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-logo text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Sunday School
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Faith • Community • Growth
              </p>
            </div>
          </div>
        </Link>
        <div className="flex gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Enhanced Progress Section */}
      <div className="px-8 py-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200/30 dark:border-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Create Your Account
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Step {step} of {totalSteps}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {Math.round(progress)}% Complete
              </p>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <Progress
            value={progress}
            className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"
          />

          {/* Step Indicators */}
          <div className="flex justify-between items-center mt-6 px-4">
            <StepIndicator
              number={1}
              title="Account"
              isActive={step === 1}
              isCompleted={step > 1}
            />
            <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <StepIndicator
              number={2}
              title="Personal"
              isActive={step === 2}
              isCompleted={step > 2}
            />
            <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <StepIndicator
              number={3}
              title="Location"
              isActive={step === 3}
              isCompleted={step > 3}
            />
            <div className="flex-1 h-0.5 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <StepIndicator
              number={4}
              title="Ministry"
              isActive={step === 4}
              isCompleted={step > 4}
            />
          </div>
        </div>
      </div>

      {/* Premium Form Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Account Credentials */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
                          Account Setup
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                          Create your secure login credentials
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 max-w-2xl mx-auto">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Username
                        </Label>
                        <Input
                          value={formData.username}
                          onChange={(e) =>
                            updateField("username", e.target.value)
                          }
                          required
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300 shadow-sm"
                          placeholder="Choose a unique username"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300 shadow-sm"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Password
                          </Label>
                          <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                              updateField("password", e.target.value)
                            }
                            required
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300 shadow-sm"
                            placeholder="••••••••"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Confirm Password
                          </Label>
                          <Input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              updateField("confirmPassword", e.target.value)
                            }
                            required
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl transition-all duration-300 shadow-sm"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
                          Personal Details
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                          Tell us about yourself
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 max-w-2xl mx-auto">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            First Name
                          </Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) =>
                              updateField("firstName", e.target.value)
                            }
                            required
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all duration-300 shadow-sm"
                            placeholder="John"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Last Name
                          </Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) =>
                              updateField("lastName", e.target.value)
                            }
                            required
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all duration-300 shadow-sm"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all duration-300 shadow-sm"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Location & Background */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Home className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
                          Location & Background
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                          Where are you from?
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 max-w-2xl mx-auto">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Address
                        </Label>
                        <Input
                          value={formData.address}
                          onChange={(e) =>
                            updateField("address", e.target.value)
                          }
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-xl transition-all duration-300 shadow-sm"
                          placeholder="123 Church Street"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            City
                          </Label>
                          <Input
                            value={formData.city}
                            onChange={(e) =>
                              updateField("city", e.target.value)
                            }
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-xl transition-all duration-300 shadow-sm"
                            placeholder="Addis Ababa"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Country
                          </Label>
                          <Input
                            value={formData.country}
                            onChange={(e) =>
                              updateField("country", e.target.value)
                            }
                            className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-xl transition-all duration-300 shadow-sm"
                            placeholder="Ethiopia"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Occupation
                        </Label>
                        <Input
                          value={formData.occupation}
                          onChange={(e) =>
                            updateField("occupation", e.target.value)
                          }
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-xl transition-all duration-300 shadow-sm"
                          placeholder="Your profession"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Sunday School Details */}
                {step === 4 && (
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
                          Ministry Details
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                          Your role and background
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-6 max-w-2xl mx-auto">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Education Background
                        </Label>
                        <Textarea
                          value={formData.education}
                          onChange={(e) =>
                            updateField("education", e.target.value)
                          }
                          rows={3}
                          className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl resize-none transition-all duration-300 shadow-sm"
                          placeholder="Tell us about your educational background..."
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Current Sunday School
                        </Label>
                        <Input
                          value={formData.currentSundaySchool}
                          onChange={(e) =>
                            updateField("currentSundaySchool", e.target.value)
                          }
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all duration-300 shadow-sm"
                          placeholder="St. George Sunday School"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Responsibility/Role
                        </Label>
                        <Input
                          placeholder="e.g., Student, Teacher, Coordinator"
                          value={formData.responsibility}
                          onChange={(e) =>
                            updateField("responsibility", e.target.value)
                          }
                          className="h-12 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          About Me
                        </Label>
                        <Textarea
                          value={formData.aboutMe}
                          onChange={(e) =>
                            updateField("aboutMe", e.target.value)
                          }
                          rows={4}
                          className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-xl resize-none transition-all duration-300 shadow-sm"
                          placeholder="Tell us about your interests, background, and what brings you to our Sunday School community..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Create Account
                    </Button>
                  )}
                </div>

                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-all duration-300"
                  >
                    Sign in here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
