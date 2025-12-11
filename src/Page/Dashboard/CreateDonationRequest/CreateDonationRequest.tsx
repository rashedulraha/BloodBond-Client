import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  MapPin,
  Calendar,
  Clock,
  Hospital,
  MessageSquare,
  Send,
  User,
  Mail,
  Droplet,
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

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

// --- [ 1. Validation Schema ] ---
const requestSchema = z.object({
  recipientName: z.string().min(2, "Recipient name is required"),
  recipientDistrict: z.string().min(1, "Please select a district"),
  recipientUpazila: z.string().min(1, "Please select an upazila"),
  hospitalName: z.string().min(3, "Hospital name is required"),
  fullAddress: z.string().min(5, "Full address is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: () => ({ message: "Please select a blood group" }),
  }),
  donationDate: z.string().min(1, "Donation date is required"),
  donationTime: z.string().min(1, "Donation time is required"),
  requestMessage: z
    .string()
    .min(10, "Please provide more details (min 10 chars)"),
});

type RequestFormInputs = z.infer<typeof requestSchema>;

const CreateDonationRequest: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Mocking logged-in user data (This should come from your AuthContext)
  const currentUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active", // Only active users can create requests
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormInputs>({
    resolver: zodResolver(requestSchema),
  });

  const onSubmit: SubmitHandler<RequestFormInputs> = async (data) => {
    setLoading(true);
    try {
      const finalData = {
        ...data,
        requesterName: currentUser.name,
        requesterEmail: currentUser.email,
        donationStatus: "pending", // Default status
      };

      console.log("Submitting Request:", finalData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Donation request created successfully!");
      reset(); // Clear form
    } catch (error) {
      console.error("Error creating request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-background">
      <div className="mb-8 border-b pb-4 border-border sticky top-0 z-5  bg-background flex items-center justify-between pt-5">
        <div>
          <h2 className="text-4xl font-extrabold text-primary">
            Create Blood Request
          </h2>
          <p className="text-muted-foreground mt-2">
            Fill in the details to find a donor.
          </p>
        </div>
        <ModeToggle />
      </div>

      <div className="bg-card p-6 md:p-10 rounded-md  border border-border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Section 1: Requester Info (Read Only) */}
              <div className="bg-muted/20 p-4 rounded-lg border border-dashed border-border">
                <h3 className="font-semibold mb-3 text-primary">
                  Requester Information
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="flex items-center">
                      <User className="w-4 h-4 mr-2" /> Requester Name
                    </Label>
                    <Input
                      value={currentUser.name}
                      readOnly
                      className="cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className=" flex items-center">
                      <Mail className="w-4 h-4 mr-2" /> Requester Email
                    </Label>
                    <Input
                      value={currentUser.email}
                      readOnly
                      className=" cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Recipient Details */}
              <div>
                <h3 className="font-semibold mb-3 text-primary">
                  Recipient Details
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className=" flex items-center">Recipient Name</Label>
                    <Input
                      {...register("recipientName")}
                      placeholder="Enter recipient name"
                    />
                    {errors.recipientName && (
                      <p className="text-destructive text-xs">
                        {errors.recipientName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className=" flex items-center">
                      <Droplet className="w-4 h-4 mr-2 text-primary" /> Blood
                      Group
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your blood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select your blood group</SelectLabel>
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
                  </div>
                </div>
              </div>

              {/* Section 3: Location */}
              <div>
                <h3 className="font-semibold mb-3 text-primary">Location</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> District
                    </label>
                    <input
                      {...register("recipientDistrict")}
                      placeholder="e.g. Dhaka"
                      className="input input-bordered w-full"
                    />
                    {errors.recipientDistrict && (
                      <p className="text-destructive text-xs">
                        {errors.recipientDistrict.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> Upazila
                    </label>
                    <input
                      {...register("recipientUpazila")}
                      placeholder="e.g. Gulshan"
                      className="input input-bordered w-full"
                    />
                    {errors.recipientUpazila && (
                      <p className="text-destructive text-xs">
                        {errors.recipientUpazila.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Section 4: Hospital & Address */}
              <div>
                <h3 className="font-semibold mb-3 text-primary">
                  Hospital & Address
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Hospital className="w-4 h-4 mr-2" /> Hospital Name
                    </label>
                    <input
                      {...register("hospitalName")}
                      placeholder="e.g. Dhaka Medical College"
                      className="input input-bordered w-full"
                    />
                    {errors.hospitalName && (
                      <p className="text-destructive text-xs">
                        {errors.hospitalName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      Full Address Line
                    </label>
                    <input
                      {...register("fullAddress")}
                      placeholder="e.g. House 12, Road 5, Sector 3"
                      className="input input-bordered w-full"
                    />
                    {errors.fullAddress && (
                      <p className="text-destructive text-xs">
                        {errors.fullAddress.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 5: Date & Time */}
              <div>
                <h3 className="font-semibold mb-3 text-primary">
                  Donation Schedule
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" /> Donation Date
                    </label>
                    <input
                      type="date"
                      {...register("donationDate")}
                      className="input input-bordered w-full"
                    />
                    {errors.donationDate && (
                      <p className="text-destructive text-xs">
                        {errors.donationDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2" /> Donation Time
                    </label>
                    <input
                      type="time"
                      {...register("donationTime")}
                      className="input input-bordered w-full"
                    />
                    {errors.donationTime && (
                      <p className="text-destructive text-xs">
                        {errors.donationTime.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 6: Message */}
              <div>
                <h3 className="font-semibold mb-3 text-primary">
                  Additional Information
                </h3>
                <div className="space-y-2 ">
                  <label className="text-sm font-medium flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> Request Message
                  </label>
                  <textarea
                    {...register("requestMessage")}
                    rows={4}
                    placeholder="Explain why blood is needed..."
                    className="textarea textarea-bordered w-full"
                  />
                  {errors.requestMessage && (
                    <p className="text-destructive text-xs">
                      {errors.requestMessage.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-border flex items-center justify-center">
            <Button
              type="submit"
              disabled={loading || currentUser.status === "blocked"}>
              {loading ? "Creating..." : "Request Donation"}
              {!loading && <Send className="w-5 h-5 ml-2" />}
            </Button>
            {currentUser.status === "blocked" && (
              <p className="text-destructive text-center mt-2 text-sm font-bold">
                Your account is blocked. You cannot create donation requests.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
