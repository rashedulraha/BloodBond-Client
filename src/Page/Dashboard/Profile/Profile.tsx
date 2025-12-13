import React, { useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import useRole from "@/Hook/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import useAuth from "@/Hook/useAuth";

// --- [ 2. Mock Data ] ---

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: profileInfo = [] } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email not available for role query.");
      }
      const result = await axiosSecure.get(`/profile/${user.email}/data`);
      return result.data;
    },
  });

  const userData = profileInfo[0];

  console.log(profileInfo);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to the last saved user state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ---  API Call Placeholder: PUT/PATCH  ---
      console.log("Updating user data:");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success:

      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      // Display a toast/notification on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-background ">
      <div className="max-w-6xl mx-auto">
        {/* --- [ 3. Header & Action Buttons ] --- */}
        <div className="flex items-center justify-between mb-8 border-b pb-4 border-border">
          <h2 className="text-4xl font-extrabold text-primary">User Profile</h2>

          <div className="flex space-x-3">
            <ModeToggle />
            {isEditing ? (
              <>
                <Button
                  onClick={handleCancel}
                  type="button"
                  className="rounded"
                  disabled={loading}>
                  <XCircle className="w-4 h-4 mr-1" /> Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant={"secondary"}
                  className="rounded"
                  disabled={loading}>
                  <Save className="w-4 h-4 mr-1" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                variant={"outline"}
                onClick={handleEdit}
                className="rounded cursor-pointer">
                <Pencil className="w-4 h-4 mr-1" /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* ---  4. Profile Card Layout  --- */}
        <div className="bg-card p-8 rounded-md border border-border">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row items-start md:space-x-8">
              {/* Left Side: Avatar & Basic Info */}
              <div className="w-full md:w-1/4 flex flex-col items-center mb-8 md:mb-0">
                <img
                  src={userData?.photoURL}
                  alt={userData?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                />
                <h3 className="text-xl font-semibold mt-4 text-foreground">
                  {userData?.name}
                </h3>
                <p
                  className={`text-sm font-medium mt-1 p-1 px-3 rounded-full ${
                    userData?.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                  Status:
                  {userData?.status.charAt(0).toUpperCase() +
                    userData?.status.slice(1)}
                </p>
                <p className="text-sm mt-2 text-muted-foreground flex items-center capitalize">
                  <UserIcon className="w-4 h-4 mr-1 text-primary" /> Role:{" "}
                  {role}
                  {/* {user.role.charAt(0).toUpperCase() + user.role.slice(1)} */}
                </p>
              </div>

              {/* Right Side: Form Fields */}
              <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {/* Field 1: Name */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-2" /> Name
                  </Label>
                  <Input
                    type="text"
                    defaultValue={userData?.name}
                    disabled={!isEditing || loading}
                  />
                </div>

                {/* Field 2: Email (Read-Only) */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email (Non-Editable)
                  </Label>
                  <Input type="email" value={userData?.email} disabled />
                </div>

                {/* Field 3: Blood Group */}
                <div className="space-y-2">
                  <Label className=" flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-destructive" /> Blood
                    Group
                  </Label>
                  <Select disabled={!isEditing || loading}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select your blood group</SelectLabel>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Field 4: District */}
                <div className="space-y-2">
                  <Label className=" flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> District
                  </Label>
                  <Input
                    type="text"
                    defaultValue={userData?.district}
                    disabled={!isEditing || loading}
                  />
                  {/* Note: This should ideally be a select input fetching data from API */}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Division
                  </Label>
                  <Input
                    type="text"
                    defaultValue={userData?.division}
                    disabled={!isEditing || loading}
                  />
                  {/* Note: This should ideally be a select input fetching data from API */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
