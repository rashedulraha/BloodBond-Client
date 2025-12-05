import React, { useState } from "react"; // useState is added for a better UX
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaTint,
  FaCloudUploadAlt,
} from "react-icons/fa";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterPage: React.FC = () => {
  // State to show the selected file name in the custom input
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full rounded-none border-none">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center">
            <FaTint className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Join as a Donor</CardTitle>
          <CardDescription>Create your account to save lives.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {/* Name Input - Reduced height */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="pl-10 h-9"
                />
              </div>
            </div>

            {/* Avatar Upload - Redesigned to look like a text input */}
            <div className="space-y-2">
              <Label htmlFor="avatar-upload">Avatar</Label>
              <div className="relative">
                <FaCloudUploadAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="avatar-upload"
                  name="avatar-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only" // Hide the default input
                />
                <label
                  htmlFor="avatar-upload"
                  className="flex h-9 w-full cursor-pointer items-center rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <span className="truncate">
                    {fileName ? fileName : "Choose file..."}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              {" "}
              {/* Email Input - Reduced height */}
              <div className="space-y-2 w-full">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="pl-10 h-9 w-full"
                  />
                </div>
              </div>
              {/* Blood Group Selector - Reduced height */}
              <div className="space-y-2 w-full">
                <Label>Blood Group</Label>
                <Select required>
                  <SelectTrigger className="h-9 pl-10 w-full">
                    <div className="flex items-center">
                      <FaTint className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select Blood Group" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              {/* District Selector - Reduced height */}
              <div className="space-y-2 w-full">
                <Label>District</Label>
                <Select required>
                  <SelectTrigger className="h-9 pl-10 w-full">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select District" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                    <SelectItem value="Chattogram">Chattogram</SelectItem>
                    <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Upazila Selector - Reduced height */}
              <div className="space-y-2 w-full">
                <Label>Upazila</Label>
                <Select required>
                  <SelectTrigger className="h-9 pl-10 w-full">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select Upazila" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dhanmondi">Dhanmondi</SelectItem>
                    <SelectItem value="Mirpur">Mirpur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* password section  */}
            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              {/* Password Input - Reduced height */}
              <div className="space-y-2 w-full">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    className="pl-10 h-9 "
                  />
                </div>
              </div>

              {/* Confirm Password Input - Reduced height */}
              <div className="space-y-2 w-full">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    name="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    className="pl-10 h-9"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
