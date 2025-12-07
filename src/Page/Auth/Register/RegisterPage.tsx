import useAuth from "@/Hook/useAuth/useAuth";
import Container from "@/Page/Shared/Responsive/Container";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaTint,
  FaImage,
  FaUserPlus,
} from "react-icons/fa";

type Inputs = {
  name: string;
  email: string;
  avatar: FileList;
  bloodGroup: string;
  district: string;
  upazila: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useAuth();

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("district", data.district);
      formData.append("upazila", data.upazila);
      formData.append("password", data.password);

      // Handle avatar upload to ImageBB
      if (data.avatar && data.avatar[0]) {
        const imageFormData = new FormData();
        imageFormData.append("image", data.avatar[0]);

        // Replace with your ImageBB API key
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=YOUR_IMAGEBB_API_KEY",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const imageData = await response.json();
        if (imageData.success) {
          formData.append("avatar", imageData.data.url);
        }
      }

      // Register user
      await registerUser(formData);
      toast.success("Registration successful! Please login.");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Header and Icon */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
              <FaUserPlus className="text-3xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Join Our <span className="text-primary">Life-Saving</span>{" "}
              Community
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Become a donor and help save lives. Your registration will connect
              you with people in need of blood in your area.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <FaTint />
                </div>
                <span className="text-foreground">
                  All blood groups welcome
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-foreground">Location-based matching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="text-foreground">
                  Track your donation impact
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-5 flex-col md:flex-row">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.name ? "border-destructive" : "border-border"
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="john@example.com"
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
              </div>

              <div className="flex items-center flex-col md:flex-row gap-5 ">
                {/* Avatar Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Profile Photo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaImage className="text-muted-foreground" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.avatar ? "border-destructive" : "border-border"
                      } rounded-lg bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90`}
                      {...register("avatar", {
                        required: "Profile photo is required",
                      })}
                    />
                  </div>
                  {errors.avatar && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.avatar.message}
                    </p>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Blood Group
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTint className="text-muted-foreground" />
                    </div>
                    <select
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.bloodGroup
                          ? "border-destructive"
                          : "border-border"
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent appearance-none`}
                      {...register("bloodGroup", {
                        required: "Blood group is required",
                      })}>
                      <option value="">Select your blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  {errors.bloodGroup && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.bloodGroup.message}
                    </p>
                  )}
                </div>
              </div>

              {/* District and Upazila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    District
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-muted-foreground" />
                    </div>
                    <select
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.district ? "border-destructive" : "border-border"
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent appearance-none`}
                      {...register("district", {
                        required: "District is required",
                      })}>
                      <option value="">Select district</option>
                      {/* Add districts from the resource here */}
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                  {errors.district && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upazila
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-muted-foreground" />
                    </div>
                    <select
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.upazila ? "border-destructive" : "border-border"
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent appearance-none`}
                      {...register("upazila", {
                        required: "Upazila is required",
                      })}>
                      <option value="">Select upazila</option>
                      {/* Add upazilas based on selected district here */}
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Gulshan">Gulshan</option>
                      <option value="Mirpur">Mirpur</option>
                      <option value="Uttara">Uttara</option>
                    </select>
                  </div>
                  {errors.upazila && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.upazila.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent`}
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

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-muted-foreground" />
                    </div>
                    <input
                      type="password"
                      className={`w-full pl-10 pr-3 py-2 border ${
                        errors.confirmPassword
                          ? "border-destructive"
                          : "border-border"
                      } rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="••••••••"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
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
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
