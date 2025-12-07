import useAuth from "@/Hook/useAuth/useAuth";
import Container from "@/Page/Shared/Responsive/Container";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUser,
  FaHeartbeat,
} from "react-icons/fa";

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
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const onInputSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const email = data?.email;
      const password = data?.password;
      await loginUser(email, password);
      navigate(location.state?.from?.pathname || "/dashboard");
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Header and Icon */}
          <div className="text-center lg:text-left">
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
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <FaHeartbeat />
                </div>
                <span className="text-foreground">
                  Track your donation history
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="text-foreground">Manage your profile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FaEnvelope />
                </div>
                <span className="text-foreground">
                  Respond to donation requests
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
            <form onSubmit={handleSubmit(onInputSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    className={`w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-destructive" : "border-border"
                    } rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="rashed@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    className={`w-full pl-10 pr-3 py-2 border ${
                      errors.password ? "border-destructive" : "border-border"
                    } rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
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
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary/80">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  "Sign In"
                )}
              </button>
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
