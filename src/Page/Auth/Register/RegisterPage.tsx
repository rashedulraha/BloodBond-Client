import Container from "@/Page/Shared/Responsive/Container";

import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaTint, FaUserPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
// import useAxiosSecure from "@/Hook/useAxiosSecure";
import useAuth from "@/Hook/useAuth";
import axios from "axios";
import useAxiosSecure from "@/Hook/useAxiosSecure";

type Inputs = {
  name: string;
  email: string;
  avatar: FileList;
  bloodGroup: string;
  division: string;
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
    control,
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const { registerUser, profileUpdate, signinWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    console.log("Form Data:", data);

    const profileImage = data.avatar[0];

    registerUser(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
        toast.success("Signup successfully");

        //? store the image and get the photo url

        const formData = new FormData();
        formData.append("image", profileImage);

        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(image_Api_Url, formData).then((res) => {
          //! update profile here
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          const createAt = new Date();
          const userInfo = {
            ...data,
            createAt,
            role: "donor",
            imageURL: res.data.data.url,
            status: "active",
          };

          axiosSecure.post("/register-user", userInfo).then(() => {
            profileUpdate(userProfile)
              .then()
              .catch((error: { message: unknown }) => {
                console.log(error.message);
              });
          });
        });
      })
      .catch(() => {
        toast.error("Network error please try again");
      });
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signinWithGoogle();

      if (!result) {
        throw new Error("Google login failed");
      }
      const userData = result?.user;

      if (!userData) {
        throw new Error("User data not found");
      }

      console.log(userData);

      const userInfo = {
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        role: "donor",
        provider: "google",
      };

      axiosSecure
        .post("/register-user", userInfo)
        .then(() => console.log("user add"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl">
          {/* ... Left Column (unchanged) ... */}
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
                <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                  <FaTint />
                </div>
                <span className="text-foreground">
                  All blood groups welcome
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-foreground">Location-based matching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <FaUser />
                </div>
                <span className="text-foreground">
                  Track your donation impact
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form (FIXED) */}
          <div className="bg-card rounded-md shadow-lg p-8 border border-border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between gap-5 flex-col md:flex-row">
                {/* Name Field (OK) */}
                <div className="w-full">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Rashedul Islam"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field (Assuming InputGroupInput handles forwardRef, otherwise switch to standard Input) */}
                <div className="w-full">
                  <Label>Email</Label>
                  <InputGroup>
                    <InputGroupInput
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </InputGroup>
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center flex-col md:flex-row gap-5 ">
                {/* Avatar Upload (FIXED Validation) */}
                <div className="w-full">
                  <Label>Profile Photo</Label>
                  <div className="relative">
                    <Input
                      type="file"
                      // Correct validation for FileList
                      {...register("avatar", {
                        required: "Profile photo is required",
                        validate: (value) =>
                          (value && value.length > 0) ||
                          "Profile photo is required",
                      })}
                    />
                  </div>
                  {errors.avatar && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.avatar.message}
                    </p>
                  )}
                </div>

                {/* Blood Group (FIXED: Using Controller with Select) */}
                <div className="w-full">
                  <Label>Blood Group</Label>
                  <Controller
                    name="bloodGroup"
                    control={control}
                    rules={{ required: "Blood group is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger
                          className={
                            errors.bloodGroup ? "border-destructive" : ""
                          }>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel> Select your blood group</SelectLabel>
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
                    )}
                  />
                  {errors.bloodGroup && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.bloodGroup.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Division (FIXED: Using Controller and name="division") */}
                <div className="w-full">
                  <Label>Division</Label>
                  <Controller
                    name="division" // Corrected field name
                    control={control}
                    rules={{ required: "Division is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger
                          className={
                            errors.division ? "border-destructive" : ""
                          }>
                          <SelectValue placeholder="Select division" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel> Select your division </SelectLabel>
                            <SelectItem value="Dhaka">Dhaka</SelectItem>
                            <SelectItem value="Chattogram">
                              Chattogram
                            </SelectItem>
                            <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                            <SelectItem value="Khulna">Khulna</SelectItem>
                            <SelectItem value="Barisal">Barisal</SelectItem>
                            <SelectItem value="Sylhet">Sylhet</SelectItem>
                            <SelectItem value="Rangpur">Rangpur</SelectItem>
                            <SelectItem value="Mymensingh">
                              Mymensingh
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.division && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.division.message}
                    </p>
                  )}
                </div>

                {/* District (FIXED: Still need to filter options based on 'division') */}
                <div className="w-full">
                  <Label>District</Label>
                  <Controller
                    name="district" // Corrected field name
                    control={control}
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // Disable district selection until division is selected
                        // disabled={!selectedDivision}
                      >
                        <SelectTrigger
                          className={
                            errors.district ? "border-destructive" : ""
                          }>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel> Select your district </SelectLabel>
                            {/* You need to dynamically load district options here based on the selected division */}
                            <SelectItem value="Placeholder_DHA_1">
                              Dhanmondi (Needs Dynamic Data)
                            </SelectItem>
                            <SelectItem value="Placeholder_DHA_2">
                              Mirpur (Needs Dynamic Data)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.district && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ... Password Fields and Submit Button (unchanged) ... */}
              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                  <Label>Password</Label>
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <Label>Confirm Password</Label>
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className=" flex-1  flex items-center justify-center">
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
                      Creating Account...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleLoginWithGoogle}
                  variant="outline"
                  className="flex-1 rounded">
                  Login with Google
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
