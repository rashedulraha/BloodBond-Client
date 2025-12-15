import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Pencil,
  Save,
  XCircle,
  MapPin,
  Mail,
  Droplet,
  User as UserIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

import useRole from "@/Hook/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import useAuth from "@/Hook/useAuth";
import type { Inputs } from "@/types/blog";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, reset } = useForm<Inputs>({
    defaultValues: {
      userName: "",
      bloodGroup: "",
      district: "",
      division: "",
    },
  });

  const { data: profileInfo = [] } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email not found");
      const res = await axiosSecure.get(`/profile/${user.email}/data`);
      return res.data;
    },
  });

  const userData = profileInfo[0];

  // ✅ Populate form once data loads
  useEffect(() => {
    if (userData) {
      reset({
        userName: userData.name,
        bloodGroup: userData.bloodGroup,
        district: userData.district,
        division: userData.division,
      });
    }
  }, [userData, reset]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const updateProfile = async (data: Inputs) => {
    setLoading(true);
    try {
      console.log("Updated Data:", data);
      // await axiosSecure.put(`/profile/update`, data);
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-background">
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <h2 className="text-4xl font-extrabold text-primary">
              User Profile
            </h2>

            <div className="flex space-x-3">
              <ModeToggle />
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}>
                    <XCircle className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-1" />
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="w-4 h-4 mr-1" /> Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Card */}
          <div className="bg-card p-8 rounded-md border">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left */}
              <div className="w-full md:w-1/4 text-center">
                <img
                  src={userData?.photoURL}
                  className="w-32 h-32 mx-auto rounded-full border"
                />
                <h3 className="mt-4 font-semibold">{userData?.name}</h3>
                <p className="text-sm mt-1 capitalize">Role: {role}</p>
              </div>

              {/* Right */}
              <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-2" /> Name
                  </Label>
                  <Input {...register("userName")} disabled={!isEditing} />
                </div>

                {/* Email */}
                <div>
                  <Label className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </Label>
                  <Input value={userData?.email} disabled />
                </div>

                {/* Blood Group */}
                <div>
                  <Label className="flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-destructive" />
                    Blood Group
                  </Label>

                  <Controller
                    name="bloodGroup"
                    control={control}
                    render={({ field }) => (
                      <Select
                        disabled={!isEditing}
                        value={field.value}
                        onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                          ].map((bg) => (
                            <SelectItem key={bg} value={bg}>
                              {bg}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* District */}
                <div>
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> District
                  </Label>
                  <Input {...register("district")} disabled={!isEditing} />
                </div>

                {/* Division */}
                <div>
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Division
                  </Label>
                  <Input {...register("division")} disabled={!isEditing} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
