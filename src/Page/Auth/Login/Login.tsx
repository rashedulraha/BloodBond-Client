import Container from "@/Page/Shared/Responsive/Container";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { FaEnvelope, FaSignInAlt, FaUser, FaHeartbeat } from "react-icons/fa";

// ✅ FIX 1: Label component is correctly imported from Shadcn/ui components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { loginUser, signinWithGoogle, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  if (user) {
    return <Navigate to={location.state || "/"} />;
  }

  const onInputSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const email = data.email;
      const password = data.password;

      if (!email || !password) {
        toast.error("Email and password are required.");
        setIsLoading(false);
        return;
      }

      await loginUser(email, password);

      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true }); // Using replace: true is often better for login redirects

      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signinWithGoogle();

      const userData = result?.user;

      const userInfo = {
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        role: "donor",
        status: "active",
        provider: "google",
      };

      await axiosSecure.post("/register-user", userInfo);

      navigate(location.state || "/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-4xl">
          {/* Left Column - Header and Icon (unchanged) */}
          <div className="text-center lg:text-left col-span-1">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
              <FaSignInAlt className="text-3xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Welcome Back to <span className="text-primary">Blood Bond</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Sign in to your account to continue saving lives through blood
              donation.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <FaHeartbeat />
                </div>
                <span className="text-foreground">
                  Track your donation history
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="text-foreground">Manage your profile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                  <FaEnvelope />
                </div>
                <span className="text-foreground">
                  Respond to donation requests
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="bg-card/50  rounded-md shadow-md p-8 border border-secondary col-span-1">
            <form onSubmit={handleSubmit(onInputSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <Label> Email </Label>

                <Input
                  type="email"
                  placeholder="Enter your valid email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <Label>Password</Label>
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your valid password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Remember Me & Forgot Password (Unchanged) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password" // Changed href="#" to Link
                    className="font-medium text-primary hover:text-primary/80">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Submit Button (FIXED Text) */}
              <div className="flex items-center gap-5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 font-medium flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleLoginWithGoogle}
                  variant="outline"
                  className="flex-1 rounded ">
                  Login with Google
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
