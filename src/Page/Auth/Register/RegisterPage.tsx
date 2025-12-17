import Container from "@/Page/Shared/Responsive/Container";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
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
import useAuth from "@/Hook/useAuth";
import axios from "axios";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import type { District } from "@/types/blog";

type Inputs = {
  name: string;
  email: string;
  avatar: FileList;
  bloodGroup: string;
  division: string;
  district: string;
  password: string;
  confirmPassword: string;
};

const DIVISIONS = [
  { id: "1", name: "Chattogram" },
  { id: "2", name: "Rajshahi" },
  { id: "3", name: "Khulna" },
  { id: "4", name: "Barisal" },
  { id: "5", name: "Sylhet" },
  { id: "6", name: "Dhaka" },
  { id: "7", name: "Rangpur" },
  { id: "8", name: "Mymensingh" },
];

const DISTRICTS_JSON_URL = "/districts.json";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(true);
  const [districtError, setDistrictError] = useState<string | null>(null);

  const { registerUser, profileUpdate, signinWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const password = watch("password");
  const selectedDivision = watch("division");

  useEffect(() => {
    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      setDistrictError(null);
      try {
        const response = await axios.get<District[]>(DISTRICTS_JSON_URL);

        setDistricts(response.data);
      } catch (err) {
        console.error("Failed to load districts:", err);
        setDistrictError("Failed to load district information.");
        setDistricts([]);
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    setValue("district", "");

    if (selectedDivision && districts.length > 0) {
      const divisionObj = DIVISIONS.find((d) => d.name === selectedDivision);
      if (divisionObj) {
        const filtered = districts.filter(
          (d) => d.division_id === divisionObj.id
        );
        setFilteredDistricts(filtered);
      } else {
        setFilteredDistricts([]);
      }
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedDivision, districts, setValue]);

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
            name: data.name,
            email: data.email,
            bloodGroup: data.bloodGroup,
            division: data.division,
            district: data.district,
            createAt,
            photoURL: res.data.data.url,
            role: "donor",
            provider: "normal-register",
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
      navigate(location.state || "/");
      const userData = result.user;
      const userInfo = {
        name: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        role: "donor",
        status: "active",
        provider: "google",
      };
      await axiosSecure.post("/register-user", userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
            <FaUserPlus className="text-3xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Join Our <span className="text-primary">Life-Saving</span> Community
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Become a donor and help save lives. Your registration will connect
            you with people in need of blood in your area.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <FaTint />
              </div>
              <span className="text-foreground">All blood groups welcome</span>
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

        {/* Right Column - Form */}
        <div className="bg-card rounded-md shadow-lg p-8 border border-border">
          {loadingDistricts && (
            <p className="text-center text-primary mb-4">
              Loading districts...
            </p>
          )}
          {districtError && (
            <p className="text-center text-destructive mb-4">{districtError}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Email */}
            <div className="flex flex-col md:flex-row gap-5">
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

            {/* Avatar & Blood Group */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full">
                <Label>Profile Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  {...register("avatar", {
                    required: "Profile photo is required",
                    validate: (value) =>
                      value.length > 0 || "Profile photo is required",
                  })}
                />
                {errors.avatar && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.avatar.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label>Blood Group</Label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  rules={{ required: "Blood group is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger
                        className={
                          errors.bloodGroup ? "border-destructive" : ""
                        }>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select your blood group</SelectLabel>
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                          ].map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
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

            {/* Division & District */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <Label>Division</Label>
                <Controller
                  name="division"
                  control={control}
                  rules={{ required: "Division is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      disabled={loadingDistricts}>
                      <SelectTrigger
                        className={errors.division ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select your division</SelectLabel>
                          {DIVISIONS.map((div) => (
                            <SelectItem key={div.id} value={div.name}>
                              {div.name}
                            </SelectItem>
                          ))}
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

              <div className="w-full">
                <Label>District</Label>
                <Controller
                  name="district"
                  control={control}
                  rules={{ required: "District is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      disabled={
                        !selectedDivision ||
                        loadingDistricts ||
                        districtError !== null
                      }>
                      <SelectTrigger
                        className={errors.district ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select your district</SelectLabel>
                          {filteredDistricts.length === 0 &&
                            selectedDivision &&
                            !loadingDistricts && (
                              <p className="px-4 py-2 text-muted-foreground italic">
                                No districts found
                              </p>
                            )}
                          {filteredDistricts.map((dist) => (
                            <SelectItem key={dist.id} value={dist.name}>
                              {dist.name}
                            </SelectItem>
                          ))}
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

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <Label>Password</Label>
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
              <div className="w-full">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
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

            {/* Buttons */}
            <div className="flex items-center gap-5">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
              <Button
                type="button"
                onClick={handleLoginWithGoogle}
                variant="outline"
                className="flex-1">
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
  );
};

export default RegisterPage;
