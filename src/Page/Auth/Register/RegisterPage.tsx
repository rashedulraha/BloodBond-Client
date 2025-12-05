import React, { useState, useCallback, useMemo, ChangeEvent } from "react";
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

// Type definitions
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
type District = "Dhaka" | "Chattogram" | "Rajshahi";
type Upazila = string;

interface UpazilaOptions {
  [key: string]: Upazila[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  bloodGroup: BloodGroup;
  district: District;
  upazila: Upazila;
  password: string;
  confirmPassword: string;
  avatar?: File;
}

// Constants with proper typing
const BLOOD_GROUPS: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];
const DISTRICTS: District[] = ["Dhaka", "Chattogram", "Rajshahi"];
const UPAZILAS: UpazilaOptions = {
  Dhaka: ["Dhanmondi", "Mirpur"],
  Chattogram: ["Patiya", "Banshkhali"],
  Rajshahi: ["Bagmara", "Durgapur"],
};

// Icon Input Component with proper typing
interface IconInputProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  autoComplete?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IconInput: React.FC<IconInputProps> = React.memo(
  ({
    id,
    name,
    type,
    placeholder,
    required = false,
    icon: Icon,
    autoComplete,
    className = "",
    value,
    onChange,
  }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`pl-10 h-9 w-full ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
);

// Icon Select Component with proper typing
interface IconSelectProps {
  placeholder: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const IconSelect: React.FC<IconSelectProps> = React.memo(
  ({
    placeholder,
    required = false,
    icon: Icon,
    children,
    value,
    onValueChange,
    disabled = false,
  }) => (
    <Select
      required={required}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}>
      <SelectTrigger className="h-9 pl-10 w-full">
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
);

// File Upload Component with proper typing
const FileUpload: React.FC<{ onFileChange?: (file: File | null) => void }> =
  React.memo(({ onFileChange }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setFileName(file.name);
          onFileChange?.(file);
        } else {
          setFileName(null);
          onFileChange?.(null);
        }
      },
      [onFileChange]
    );

    return (
      <div className="space-y-2">
        <Label htmlFor="avatar-upload">Avatar</Label>
        <div className="relative">
          <FaCloudUploadAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="avatar-upload"
            name="avatar-upload"
            type="file"
            onChange={handleFileChange}
            className="sr-only"
            accept="image/*"
          />
          <label
            htmlFor="avatar-upload"
            className="flex h-9 w-full cursor-pointer items-center rounded-md border border-input bg-background px-3 py-1 text-sm">
            <span className="truncate">{fileName || "Choose file..."}</span>
          </label>
        </div>
      </div>
    );
  });

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    bloodGroup: "A+",
    district: "Dhaka",
    upazila: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedDistrict, setSelectedDistrict] = useState<District>("Dhaka");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const upazilaOptions = useMemo(
    () => UPAZILAS[selectedDistrict] || [],
    [selectedDistrict]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleDistrictChange = useCallback((value: District) => {
    setSelectedDistrict(value);
    setFormData((prev) => ({
      ...prev,
      district: value,
      upazila: "",
    }));
  }, []);

  const handleUpazilaChange = useCallback((value: Upazila) => {
    setFormData((prev) => ({
      ...prev,
      upazila: value,
    }));
  }, []);

  const handleBloodGroupChange = useCallback((value: BloodGroup) => {
    setFormData((prev) => ({
      ...prev,
      bloodGroup: value,
    }));
  }, []);

  const handleFileChange = useCallback((file: File | null) => {
    setAvatarFile(file);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Form validation and submission logic here
      console.log("Form data:", formData);
      console.log("Avatar file:", avatarFile);
    },
    [formData, avatarFile]
  );

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              <div className="space-y-2 w-full">
                <Label htmlFor="firstName">First Name</Label>
                <IconInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Rashedul"
                  required
                  icon={FaUser}
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="lastName">Last Name</Label>
                <IconInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Islam"
                  required
                  icon={FaUser}
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <FileUpload onFileChange={handleFileChange} />

            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              <div className="space-y-2 w-full">
                <Label htmlFor="email">Email Address</Label>
                <IconInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  icon={FaEnvelope}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label>Blood Group</Label>
                <IconSelect
                  placeholder="Select Blood Group"
                  required
                  icon={FaTint}
                  value={formData.bloodGroup}
                  onValueChange={handleBloodGroupChange}>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </IconSelect>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              <div className="space-y-2 w-full">
                <Label>District</Label>
                <IconSelect
                  placeholder="Select District"
                  required
                  icon={FaMapMarkerAlt}
                  value={formData.district}
                  onValueChange={handleDistrictChange}>
                  {DISTRICTS.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </IconSelect>
              </div>

              <div className="space-y-2 w-full">
                <Label>Upazila</Label>
                <IconSelect
                  placeholder="Select Upazila"
                  required
                  icon={FaMapMarkerAlt}
                  value={formData.upazila}
                  onValueChange={handleUpazilaChange}
                  disabled={!selectedDistrict}>
                  {upazilaOptions.map((upazila) => (
                    <SelectItem key={upazila} value={upazila}>
                      {upazila}
                    </SelectItem>
                  ))}
                </IconSelect>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5 flex-col md:flex-row">
              <div className="space-y-2 w-full">
                <Label htmlFor="password">Password</Label>
                <IconInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  icon={FaLock}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <IconInput
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  icon={FaLock}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
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
