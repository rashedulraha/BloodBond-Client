import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Pencil,
  Save,
  XCircle,
  MapPin,
  Mail,
  Droplet,
  User as UserIcon,
  Shield,
  AlertCircle,
  Phone,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import Container from "@/Page/Shared/Responsive/Container";

import useRole from "@/Hook/useRole";
import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import DashboardSpinner from "@/Page/Shared/Spinner/DashboardSpinner";

// Blood Groups
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Divisions
const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

// Districts by Division
const districtsByDivision: { [key: string]: string[] } = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachhari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Rajshahi: [
    "Bogra",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Nawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Barishal: [
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  Sylhet: ["Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

interface ProfileFormData {
  name: string;
  bloodGroup: string;
  division: string;
  district: string;
  phone?: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  photoURL: string;
  bloodGroup: string;
  division: string;
  district: string;
  phone?: string;
  role: string;
  status: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      bloodGroup: "",
      division: "",
      district: "",
      phone: "",
    },
  });

  // Watch division to update districts
  const watchDivision = watch("division");

  // Update available districts when division changes
  useEffect(() => {
    if (watchDivision) {
      setSelectedDivision(watchDivision);
      // Reset district if it doesn't belong to new division
      // eslint-disable-next-line react-hooks/incompatible-library
      const currentDistrict = watch("district");
      const newDistricts = districtsByDivision[watchDivision] || [];
      if (!newDistricts.includes(currentDistrict)) {
        setValue("district", "");
      }
    }
  }, [watchDivision, setValue, watch]);

  // Fetch user profile
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery<UserProfile>({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email not found");
      const response = await axiosSecure.get(`/profile/${user.email}/data`);
      return response.data[0] || response.data;
    },
    enabled: !!user?.email,
  });

  // Populate form when data loads
  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name || "",
        bloodGroup: profileData.bloodGroup || "",
        division: profileData.division || "",
        district: profileData.district || "",
        phone: profileData.phone || "",
      });
      if (profileData.division) {
        setSelectedDivision(profileData.division);
      }
    }
  }, [profileData, reset]);

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      await axiosSecure.put(`/profile/update/${user?.email}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    },
  });

  // Handle edit button
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle cancel button
  const handleCancel = () => {
    if (profileData) {
      reset({
        name: profileData.name || "",
        bloodGroup: profileData.bloodGroup || "",
        division: profileData.division || "",
        district: profileData.district || "",
        phone: profileData.phone || "",
      });
    }
    setIsEditing(false);
  };

  // Handle form submission
  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate(data);
  };

  // Get role badge
  const getRoleBadge = (userRole: string) => {
    switch (userRole) {
      case "admin":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </Badge>
        );
      case "volunteer":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <UserIcon className="w-3 h-3 mr-1" /> Volunteer
          </Badge>
        );
      case "donor":
        return (
          <Badge className="bg-primary/10 text-primary">
            <Droplet className="w-3 h-3 mr-1" /> Donor
          </Badge>
        );
      default:
        return <Badge variant="outline">{userRole}</Badge>;
    }
  };

  // Loading State
  if (isLoading) {
    return <DashboardSpinner />;
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Error Loading Profile
          </h2>
          <p className="text-muted-foreground">
            Failed to load your profile. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-10">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-border gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground flex items-center gap-3">
                <UserIcon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                {user?.displayName}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your profile information
              </p>
            </div>

            <div className="flex items-center gap-3">
              <ModeToggle />
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={updateMutation.isPending}>
                    <XCircle className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="bg-linear-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90">
                    <Save className="w-4 h-4 mr-1" />
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side - Avatar & Basic Info */}
                <div className="lg:w-1/3">
                  <div className="text-center lg:sticky lg:top-8">
                    <div className="inline-block relative">
                      <img
                        src={profileData?.photoURL || "/default-avatar.png"}
                        alt={profileData?.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-lg object-cover mx-auto"
                      />
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-card"></div>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-foreground">
                      {profileData?.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      {profileData?.email}
                    </p>

                    <div className="mt-4 flex justify-center">
                      {getRoleBadge(role || profileData?.role || "donor")}
                    </div>

                    {profileData?.bloodGroup && (
                      <div className="mt-4">
                        <Badge className="bg-destructive/10 text-destructive text-lg px-4 py-2">
                          <Droplet className="w-5 h-5 mr-2" />
                          {profileData.bloodGroup}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side - Form Fields */}
                <div className="lg:w-2/3">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-primary" />
                    Profile Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-primary" />
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        {...register("name", { required: "Name is required" })}
                        disabled={!isEditing}
                        className={
                          !isEditing ? "cursor-not-allowed bg-muted/50" : ""
                        }
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        Email Address
                      </Label>
                      <Input
                        value={profileData?.email || ""}
                        disabled
                        className="cursor-not-allowed bg-muted/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Blood Group */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-destructive" />
                        Blood Group <span className="text-destructive">*</span>
                      </Label>
                      <Controller
                        name="bloodGroup"
                        control={control}
                        rules={{ required: "Blood group is required" }}
                        render={({ field }) => (
                          <Select
                            disabled={!isEditing}
                            value={field.value}
                            onValueChange={field.onChange}>
                            <SelectTrigger
                              className={
                                !isEditing
                                  ? "cursor-not-allowed bg-muted/50"
                                  : ""
                              }>
                              <SelectValue placeholder="Select blood group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Blood Groups</SelectLabel>
                                {bloodGroups.map((bg) => (
                                  <SelectItem key={bg} value={bg}>
                                    <div className="flex items-center gap-2">
                                      <Droplet className="w-3 h-3 text-destructive" />
                                      {bg}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.bloodGroup && (
                        <p className="text-sm text-destructive">
                          {errors.bloodGroup.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        Phone Number
                      </Label>
                      <Input
                        {...register("phone")}
                        disabled={!isEditing}
                        placeholder="+880 1XXX-XXXXXX"
                        className={
                          !isEditing ? "cursor-not-allowed bg-muted/50" : ""
                        }
                      />
                    </div>

                    {/* Division */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Division <span className="text-destructive">*</span>
                      </Label>
                      <Controller
                        name="division"
                        control={control}
                        rules={{ required: "Division is required" }}
                        render={({ field }) => (
                          <Select
                            disabled={!isEditing}
                            value={field.value}
                            onValueChange={field.onChange}>
                            <SelectTrigger
                              className={
                                !isEditing
                                  ? "cursor-not-allowed bg-muted/50"
                                  : ""
                              }>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Divisions</SelectLabel>
                                {divisions.map((div) => (
                                  <SelectItem key={div} value={div}>
                                    {div}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.division && (
                        <p className="text-sm text-destructive">
                          {errors.division.message}
                        </p>
                      )}
                    </div>

                    {/* District */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        District <span className="text-destructive">*</span>
                      </Label>
                      <Controller
                        name="district"
                        control={control}
                        rules={{ required: "District is required" }}
                        render={({ field }) => (
                          <Select
                            disabled={!isEditing || !selectedDivision}
                            value={field.value}
                            onValueChange={field.onChange}>
                            <SelectTrigger
                              className={
                                !isEditing || !selectedDivision
                                  ? "cursor-not-allowed bg-muted/50"
                                  : ""
                              }>
                              <SelectValue
                                placeholder={
                                  selectedDivision
                                    ? "Select district"
                                    : "Select division first"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Districts</SelectLabel>
                                {(
                                  districtsByDivision[selectedDivision] || []
                                ).map((dist) => (
                                  <SelectItem key={dist} value={dist}>
                                    {dist}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.district && (
                        <p className="text-sm text-destructive">
                          {errors.district.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Edit Mode Info */}
                  {isEditing && (
                    <div className="mt-6 p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="text-sm text-foreground">
                          <p className="font-semibold mb-1">Important:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Your email address cannot be changed</li>
                            <li>All fields marked with * are required</li>
                            <li>Changes will be saved to your profile</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Profile;
