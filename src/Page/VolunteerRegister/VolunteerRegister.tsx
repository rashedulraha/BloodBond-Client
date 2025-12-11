import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Smile,
  Clock,
  HeartHandshake,
  Send,
  Loader2,
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
import z from "zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const volunteerSchema = z.object({
  name: z
    .string()
    .min(3, "Full Name is required and must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .regex(
      /^(\+88)?01[3-9]\d{8}$/,
      "Invalid Bangladeshi phone number format. (e.g., 017xxxxxxxx)"
    ),
  district: z.string().min(2, "District is required."),
  motivation: z
    .string()
    .min(20, "Please explain your motivation (min 20 characters)."),
  preferredTime: z.enum([
    "Morning (9 AM - 1 PM)",
    "Afternoon (1 PM - 5 PM)",
    "Evening (5 PM - 9 PM)",
    "Anytime",
  ]),
});
type VolunteerFormInputs = z.infer<typeof volunteerSchema>;

const VolunteerRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormInputs>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      preferredTime: "Anytime",
    },
  });

  const onSubmit: SubmitHandler<VolunteerFormInputs> = async (data) => {
    setLoading(true);
    setSubmissionStatus("idle");

    try {
      // ⚠️ API Call to register the new volunteer
      console.log("Volunteer Registration Data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmissionStatus("success");
      reset(); // Clear form on success
    } catch (error) {
      console.error("Registration error:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-background ">
      <div className="max-w-4xl mx-auto">
        {/* --- [ Header ] --- */}
        <div className="text-center pt-8 pb-4 border-b border-border mb-8">
          <h1 className="text-5xl font-extrabold text-primary mb-2 flex items-center justify-center">
            <HeartHandshake className="w-10 h-10 mr-3 text-destructive" />{" "}
            Volunteer Registration
          </h1>
          <p className="text-lg text-muted-foreground">
            Join us to organize blood drives and support the community.
          </p>
        </div>

        {/* --- [ Registration Card ] --- */}
        <div className="bg-card p-6 md:p-10 rounded-md border border-primary/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Section 1: Personal Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className=" flex items-center">
                  <User className="w-4 h-4 mr-2" /> Full Name
                </Label>
                <Input
                  {...register("name")}
                  placeholder="Your Full Name"
                  disabled={loading}
                />
                {errors.name && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Email Address
                </Label>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Section 2: Contact and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> Phone Number (BD Format)
                </Label>
                <Input
                  type="tel"
                  {...register("phone")}
                  placeholder="017xxxxxxxx"
                  className="Input Input-bordered w-full"
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> District
                </Label>
                <Input
                  {...register("district")}
                  placeholder="Enter your district"
                  disabled={loading}
                />
                {errors.district && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.district.message}
                  </p>
                )}
                {/* Note: This should ideally be a select Input fetching data from API */}
              </div>
            </div>

            {/* Section 3: Motivation and Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Contact Time */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> Preferred Contact Time
                </Label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Select a fruit"
                      {...register("preferredTime")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Chose time</SelectLabel>
                      <SelectItem value="Morning (9 AM - 1 PM)">
                        Morning (9 AM - 1 PM)
                      </SelectItem>
                      <SelectItem value="Afternoon (1 PM - 5 PM)">
                        Afternoon (1 PM - 5 PM)
                      </SelectItem>
                      <SelectItem value="Evening (5 PM - 9 PM)">
                        Evening (5 PM - 9 PM)
                      </SelectItem>
                      <SelectItem value="Anytime">Anytime</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.preferredTime && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>
            </div>

            {/* Section 4: Motivation */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center">
                <Smile className="w-4 h-4 mr-2" /> Why do you want to volunteer?
              </Label>
              <Textarea
                {...register("motivation")}
                rows={4}
                placeholder="Share your passion for community service and blood donation..."
                disabled={loading}
              />
              {errors.motivation && (
                <p className="text-destructive text-xs mt-1">
                  {errors.motivation.message}
                </p>
              )}
            </div>

            {/* Submit Button and Status */}
            <div className="pt-4 flex items-center justify-center">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Submit Volunteer Application{" "}
                    <Send className="w-5 h-5 ml-2" />
                  </span>
                )}
              </Button>

              {submissionStatus === "success" && (
                <p className="text-green-500 text-center mt-3 font-semibold">
                  Thank you! Your application has been submitted successfully.
                  We will contact you soon.
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="text-destructive text-center mt-3 font-semibold">
                  Registration failed. Please check your details and try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegister;
