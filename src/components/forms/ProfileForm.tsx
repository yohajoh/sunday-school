// components/forms/ProfileForm.tsx
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Camera,
  Star,
  Award,
  Target,
  Sparkles,
  Users,
  Heart,
  Church,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileFormProps {
  user: User;
  onSave?: (userData: Partial<User>) => void;
}

interface ProfileFormData {
  // Personal Information
  studentId: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  sex: "male" | "female";
  phoneNumber: string;

  // Disability Information
  disability: boolean;
  disabilityType?: string;

  // Personal Details
  dateOfBirth: string;
  nationalId: string;
  occupation?: string;
  marriageStatus: "single" | "married" | "divorced" | "widowed";

  // Location Information
  country: string;
  region: string;
  zone?: string;
  woreda?: string;
  church: string;

  // Parent/Guardian Information
  parentStatus: "both" | "mother" | "father" | "guardian";
  parentFullName: string;
  parentEmail?: string;
  parentPhoneNumber: string;

  // Account
  avatar?: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave }) => {
  const { t } = useLanguage();
  const { updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      studentId: user.studentId || "",
      email: user.email || "",
      firstName: user.firstName || "",
      middleName: user.middleName || "",
      lastName: user.lastName || "",
      sex: user.sex || "male",
      phoneNumber: user.phoneNumber || "",
      disability: user.disability || false,
      disabilityType: user.disabilityType || "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      nationalId: user.nationalId || "",
      occupation: user.occupation || "",
      marriageStatus: user.marriageStatus || "single",
      country: user.country || "Ethiopia",
      region: user.region || "",
      zone: user.zone || "",
      woreda: user.woreda || "",
      church: user.church || "",
      parentStatus: user.parentStatus || "both",
      parentFullName: user.parentFullName || "",
      parentEmail: user.parentEmail || "",
      parentPhoneNumber: user.parentPhoneNumber || "",
      avatar: user.avatar || "",
    },
  });

  const watchDisability = watch("disability");

  const onSubmit = async (data: ProfileFormData) => {
    if (!isDirty) {
      toast.info("No changes detected", {
        description: "Please make changes before saving.",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔄 [ProfileForm] Submitting form data:", data);

      // Convert form data to match User type
      const userData: Partial<User> = {
        studentId: data.studentId,
        email: data.email,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        sex: data.sex,
        phoneNumber: data.phoneNumber,
        disability: data.disability,
        disabilityType: data.disabilityType,
        dateOfBirth: data.dateOfBirth,
        nationalId: data.nationalId,
        occupation: data.occupation,
        marriageStatus: data.marriageStatus,
        country: data.country,
        region: data.region,
        zone: data.zone,
        woreda: data.woreda,
        church: data.church,
        parentStatus: data.parentStatus,
        parentFullName: data.parentFullName,
        parentEmail: data.parentEmail,
        parentPhoneNumber: data.parentPhoneNumber,
        avatar: data.avatar,
      };

      // Remove undefined fields
      Object.keys(userData).forEach((key) => {
        if (userData[key as keyof User] === undefined) {
          delete userData[key as keyof User];
        }
      });

      console.log("📤 [ProfileForm] Sending to updateProfile:", userData);

      await updateProfile(userData);

      // Call the onSave callback if provided
      onSave?.(userData);

      // Reset form with new values to clear dirty state
      reset(data);

      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("❌ [ProfileForm] Error in onSubmit:", error);
      toast.error("Failed to update profile", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please select an image smaller than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // In a real app, you would upload this to your server and then update the profile
        const avatarUrl = reader.result as string;
        // Update the avatar in the form
        // Note: This would need to be integrated with your actual avatar upload endpoint
        toast.success("Profile picture updated locally!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                {/* Avatar Section */}
                <div className="relative inline-block">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800 shadow-xl mx-auto">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white font-semibold">
                        {user.firstName?.[0]}
                        {user.middleName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 shadow-lg border-2 border-white dark:border-slate-800">
                      <Award className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 cursor-pointer"
                  >
                    <div className="p-1.5 bg-slate-900 dark:bg-slate-100 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 border-2 border-white dark:border-slate-800">
                      <Camera className="h-3 w-3 text-white dark:text-slate-900" />
                    </div>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    {user.firstName} {user.middleName}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {user.occupation || "Sunday School Member"}
                  </p>
                </div>

                <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  {user.role?.toUpperCase() || "USER"}
                </Badge>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <Mail className="h-3 w-3" />
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <Phone className="h-3 w-3" />
                    <span className="text-xs">{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Content */}
        <div className="lg:col-span-3">
          <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white text-lg">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg shadow-lg">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                Complete Profile Information
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Update all your personal, location, and parent information in
                one place
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-md font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-orange-500" />
                    Personal Information
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      First Name *
                    </Label>
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: "First name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          required
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Middle Name
                    </Label>
                    <Controller
                      name="middleName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Last Name *
                    </Label>
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: "Last name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          required
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Sex *
                    </Label>
                    <Controller
                      name="sex"
                      control={control}
                      rules={{ required: "Sex is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300">
                            <SelectValue placeholder="Select sex" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.sex && (
                      <p className="text-red-500 text-xs">
                        {errors.sex.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      Phone Number *
                    </Label>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="tel"
                          required
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Date of Birth *
                    </Label>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      rules={{ required: "Date of birth is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="date"
                          required
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      )}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-red-500 text-xs">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Occupation
                    </Label>
                    <Controller
                      name="occupation"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Marital Status *
                    </Label>
                    <Controller
                      name="marriageStatus"
                      control={control}
                      rules={{ required: "Marital status is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.marriageStatus && (
                      <p className="text-red-500 text-xs">
                        {errors.marriageStatus.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Disability Information */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Controller
                      name="disability"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                        />
                      )}
                    />
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-orange-500" />
                      Do you have any disability?
                    </Label>
                  </div>

                  {watchDisability && (
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Disability Type
                      </Label>
                      <Controller
                        name="disabilityType"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Specify the type of disability"
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          />
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Location Information Section */}
                <div className="space-y-6">
                  <h3 className="text-md font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    Location Information
                  </h3>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Church className="h-3 w-3" />
                      Church *
                    </Label>
                    <Controller
                      name="church"
                      control={control}
                      rules={{ required: "Church is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          required
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                      )}
                    />
                    {errors.church && (
                      <p className="text-red-500 text-xs">
                        {errors.church.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Country *
                      </Label>
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            required
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        )}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Region *
                      </Label>
                      <Controller
                        name="region"
                        control={control}
                        rules={{ required: "Region is required" }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            required
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        )}
                      />
                      {errors.region && (
                        <p className="text-red-500 text-xs">
                          {errors.region.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Zone
                      </Label>
                      <Controller
                        name="zone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Woreda
                      </Label>
                      <Controller
                        name="woreda"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information Section */}
                <div className="space-y-6">
                  <h3 className="text-md font-semibold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Parent/Guardian Information
                  </h3>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Parent Status *
                    </Label>
                    <Controller
                      name="parentStatus"
                      control={control}
                      rules={{ required: "Parent status is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300">
                            <SelectValue placeholder="Select parent status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="both">Both Parents</SelectItem>
                            <SelectItem value="mother">Mother Only</SelectItem>
                            <SelectItem value="father">Father Only</SelectItem>
                            <SelectItem value="guardian">Guardian</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.parentStatus && (
                      <p className="text-red-500 text-xs">
                        {errors.parentStatus.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Parent/Guardian Full Name *
                    </Label>
                    <Controller
                      name="parentFullName"
                      control={control}
                      rules={{
                        required: "Parent/Guardian name is required",
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          required
                          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        />
                      )}
                    />
                    {errors.parentFullName && (
                      <p className="text-red-500 text-xs">
                        {errors.parentFullName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        Parent Phone *
                      </Label>
                      <Controller
                        name="parentPhoneNumber"
                        control={control}
                        rules={{
                          required: "Parent phone number is required",
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="tel"
                            required
                            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                          />
                        )}
                      />
                      {errors.parentPhoneNumber && (
                        <p className="text-red-500 text-xs">
                          {errors.parentPhoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* UPDATE BUTTON - AT THE BOTTOM OF THE FORM */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-orange-500" />
                        Ready to Update Your Profile?
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                        {isDirty
                          ? "You have made changes to your profile. Click the button below to save all your updates."
                          : "Make changes to any field above to enable the update button."}
                      </p>
                    </div>
                    <Button
                      type="submit"
                      disabled={!isDirty || isLoading}
                      className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap font-semibold px-6 py-2"
                      size="lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Update Profile
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
