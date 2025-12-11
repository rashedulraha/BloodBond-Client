import React, { useState, useEffect } from "react";
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

interface UserProfile {
  name: string;
  email: string;
  photoURL: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  role: "donor" | "volunteer" | "admin";
  status: "active" | "blocked";
}

// --- [ 2. Mock Data ] ---
const mockUser: UserProfile = {
  name: "Rashedul",
  email: "rashedul.doe@example.com",
  photoURL: "https://i.ibb.co/3d9cT9k/avatar.png",
  bloodGroup: "A+",
  district: "Dhaka",
  upazila: "Gulshan",
  role: "donor",
  status: "active",
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [formData, setFormData] = useState<UserProfile>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(mockUser);
    setUser(mockUser);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to the last saved user state
    setFormData(user);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ---  API Call Placeholder: PUT/PATCH  ---
      console.log("Updating user data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success:
      setUser(formData);
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
                  src={user.photoURL}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                />
                <h3 className="text-xl font-semibold mt-4 text-foreground">
                  {user.name}
                </h3>
                <p
                  className={`text-sm font-medium mt-1 p-1 px-3 rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                  Status:{" "}
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </p>
                <p className="text-sm mt-2 text-muted-foreground flex items-center">
                  <UserIcon className="w-4 h-4 mr-1 text-primary" /> Role:{" "}
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
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
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                  />
                </div>

                {/* Field 2: Email (Read-Only) */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email (Non-Editable)
                  </Label>
                  <Input type="email" value={formData.email} disabled />
                </div>

                {/* Field 3: Blood Group */}
                <div className="space-y-2">
                  <Label className=" flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-destructive" /> Blood
                    Group
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your blood" />
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
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!isEditing || loading}
                  />
                  {/* Note: This should ideally be a select input fetching data from API */}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Upazila
                  </Label>
                  <Input
                    type="text"
                    value={formData.upazila}
                    onChange={handleChange}
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
