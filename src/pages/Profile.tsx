import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Shield,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Users,
  Save,
  Camera,
  Star,
  Award,
  Target,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    aboutMe:
      "Dedicated Sunday School teacher with over 5 years of experience in nurturing young minds and fostering spiritual growth.",
    address: "123 Church Street",
    city: "Addis Ababa",
    country: "Ethiopia",
    occupation: "Sunday School Teacher",
    education: "Bachelor of Theology, St. Mary University",
    sundaySchool: "St. George Sunday School",
    responsibility: "Lead Teacher - Children's Ministry",
    joinDate: "January 2020",
    classLevel: "Elementary (Ages 6-12)",
    notifications: true,
    emailUpdates: true,
  });

  const updateField = (field: string, value: string | boolean) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Profile updated successfully", {
      description: "Your changes have been saved",
    });
    setIsLoading(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please choose an image smaller than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        toast.success("Profile picture updated", {
          description: "Your new photo has been saved",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50 dark:from-slate-900 dark:via-blue-950/20 dark:to-emerald-950/10">
      {/* Premium Header */}
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/60 dark:border-slate-800/60 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-300 hover:scale-105 border-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Profile Settings
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Manage your personal information and teaching profile
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
            <Sparkles className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Premium Sidebar Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                <CardContent className="p-6">
                  <div className="text-center space-y-6">
                    {/* Premium Avatar Section */}
                    <div className="relative inline-block">
                      <div className="relative">
                        <Avatar className="h-28 w-28 border-4 border-white dark:border-slate-800 shadow-2xl mx-auto">
                          <AvatarImage src={avatarUrl} />
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-semibold">
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-1 shadow-lg border-2 border-white dark:border-slate-800">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <Label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 cursor-pointer"
                      >
                        <div className="p-2 bg-slate-900 dark:bg-slate-100 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border-2 border-white dark:border-slate-800">
                          <Camera className="h-4 w-4 text-white dark:text-slate-900" />
                        </div>
                      </Label>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                        {profileData.firstName} {profileData.lastName}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {profileData.occupation}
                      </p>
                    </div>

                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                      <Users className="h-3 w-3 mr-1" />
                      {profileData.responsibility}
                    </Badge>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <Mail className="h-4 w-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <Phone className="h-4 w-4" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {profileData.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Stats Card */}
              <Card className="border-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 text-white shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Teaching Stats
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <span className="text-emerald-100">Students</span>
                        <span className="font-bold text-lg">24</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <span className="text-cyan-100">Classes</span>
                        <span className="font-bold text-lg">3</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                        <span className="text-blue-100">Experience</span>
                        <span className="font-bold text-lg">5 years</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Premium Main Content Area */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 p-1 rounded-2xl shadow-lg">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                  >
                    <User className="h-4 w-4" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                  >
                    <BookOpen className="h-4 w-4" />
                    Teaching
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                  >
                    <MapPin className="h-4 w-4" />
                    Location
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                  >
                    <Shield className="h-4 w-4" />
                    Account
                  </TabsTrigger>
                </TabsList>

                {/* Premium Profile Tab */}
                <TabsContent value="profile">
                  <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white text-xl">
                        <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl shadow-lg">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        Personal Information
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Update your basic personal details and contact
                        information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            First Name
                          </Label>
                          <Input
                            value={profileData.firstName}
                            onChange={(e) =>
                              updateField("firstName", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Last Name
                          </Label>
                          <Input
                            value={profileData.lastName}
                            onChange={(e) =>
                              updateField("lastName", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <Input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          About Me
                        </Label>
                        <Textarea
                          rows={4}
                          value={profileData.aboutMe}
                          onChange={(e) =>
                            updateField("aboutMe", e.target.value)
                          }
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-300 shadow-sm"
                          placeholder="Share your teaching philosophy and experience..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Premium Teaching Details Tab */}
                <TabsContent value="details">
                  <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white text-xl">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        Teaching Profile
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Information about your teaching role and
                        responsibilities
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            Occupation
                          </Label>
                          <Input
                            value={profileData.occupation}
                            onChange={(e) =>
                              updateField("occupation", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Class Level
                          </Label>
                          <Input
                            value={profileData.classLevel}
                            onChange={(e) =>
                              updateField("classLevel", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Education & Qualifications
                        </Label>
                        <Textarea
                          rows={3}
                          value={profileData.education}
                          onChange={(e) =>
                            updateField("education", e.target.value)
                          }
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Sunday School
                          </Label>
                          <Input
                            value={profileData.sundaySchool}
                            onChange={(e) =>
                              updateField("sundaySchool", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Teaching Role
                          </Label>
                          <Input
                            value={profileData.responsibility}
                            onChange={(e) =>
                              updateField("responsibility", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Premium Location Tab */}
                <TabsContent value="location">
                  <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white text-xl">
                        <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        Location Information
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Your address and location details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Street Address
                        </Label>
                        <Input
                          value={profileData.address}
                          onChange={(e) =>
                            updateField("address", e.target.value)
                          }
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            City
                          </Label>
                          <Input
                            value={profileData.city}
                            onChange={(e) =>
                              updateField("city", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Country
                          </Label>
                          <Input
                            value={profileData.country}
                            onChange={(e) =>
                              updateField("country", e.target.value)
                            }
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Premium Account Tab */}
                <TabsContent value="account">
                  <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-slate-800 dark:text-white text-xl">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        Account & Security
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        Manage your account settings and security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                          <Shield className="h-5 w-5 text-purple-500" />
                          Password
                        </h4>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Current Password
                          </Label>
                          <Input
                            type="password"
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm"
                            placeholder="Enter your current password"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            New Password
                          </Label>
                          <Input
                            type="password"
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm"
                            placeholder="Enter your new password"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Confirm New Password
                          </Label>
                          <Input
                            type="password"
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm"
                            placeholder="Confirm your new password"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                          {/* <Bell className="h-5 w-5 text-blue-500" /> */}
                          Notifications
                        </h4>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300">
                          <div className="space-y-1">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Push Notifications
                            </Label>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Receive alerts about class updates
                            </p>
                          </div>
                          <Switch
                            checked={profileData.notifications}
                            onCheckedChange={(checked) =>
                              updateField("notifications", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300">
                          <div className="space-y-1">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                              Email Updates
                            </Label>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Get weekly teaching resources
                            </p>
                          </div>
                          <Switch
                            checked={profileData.emailUpdates}
                            onCheckedChange={(checked) =>
                              updateField("emailUpdates", checked)
                            }
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Password Requirements
                        </h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Include uppercase and lowercase letters</li>
                          <li>• Include at least one number</li>
                          <li>• Include at least one special character</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
