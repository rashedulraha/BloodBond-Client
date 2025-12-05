import React, { useState, useCallback, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

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
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox component

// Type definitions
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Icon Input Component (reused for consistency)
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

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Handle input changes for text fields
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = useCallback((checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Here you would typically handle the login logic
      // e.g., API call to authenticate the user
      console.log("Login attempted with:", formData);
      alert("Login functionality to be implemented!");
    },
    [formData]
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* Header Section */}

      {/* Form Section */}
      <div className="w-full max-w-lg mx-auto p-6 lg:p-8">
        <Card className="h-full">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center">
              <FaLock className="h-10 w-10 text-primary-foreground" />{" "}
              {/* Changed icon to FaLock */}
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
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

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <IconInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  icon={FaLock}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me for 30 days
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              {/* Link to Register Page */}
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline">
                  Register
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
