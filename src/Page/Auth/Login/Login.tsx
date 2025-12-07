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
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Sign In
              </h2>
              <p className="text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

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
