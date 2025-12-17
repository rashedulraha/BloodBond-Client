import React, { useEffect, useState } from "react";
import {
  HeartPulse,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  AlertTriangle,
  User,
  Mail,
  PlusCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// shadcn/ui components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import type { bloodDonation } from "@/types/blog";

// Blood Groups
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Divisions with proper IDs
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

// Districts by Division (Simplified version - আপনি পরে districts.json থেকে load করতে পারেন)
const DISTRICTS_BY_DIVISION: { [key: string]: string[] } = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachhari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Rajshahi: [
    "Bogra",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Nawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Barisal: [
    "Barguna",
    "Barisal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  Sylhet: ["Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
};

const DonationRequest: React.FC = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // State for districts filtering
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  // Form setup
  const form = useForm<bloodDonation>({
    defaultValues: {
      recipientName: "",
      bloodGroup: "",
      donationDate: "",
      donationTime: "",
      hospitalName: "",
      recipientDistrict: "",
      recipientUpazila: "",
      fullAddressLine: "",
      requestMessage: "",
    },
  });

  const { control, handleSubmit, watch, setValue, formState } = form;

  // Watch selected division
  const selectedDivision = watch("recipientDistrict");

  // Update districts when division changes
  useEffect(() => {
    if (selectedDivision) {
      const districts = DISTRICTS_BY_DIVISION[selectedDivision] || [];
      setAvailableDistricts(districts);
      // Reset upazila when division changes
      setValue("recipientUpazila", "");
    } else {
      setAvailableDistricts([]);
    }
  }, [selectedDivision, setValue]);

  // Form submission
  const onSubmit: SubmitHandler<bloodDonation> = async (data) => {
    try {
      const donationInfo = {
        ...data,
        requesterEmail: user?.email || "",
        requesterName: user?.displayName || "",
        donationStatus: "pending",
      };

      await axiosSecure.post("/donation-request", donationInfo);

      toast.success("Donation request created successfully!");
      form.reset();

      // Optional: Navigate to dashboard
      setTimeout(() => {
        navigate("/dashboard/my-donation-requests");
      }, 1500);
    } catch (error) {
      console.error("Error creating donation request:", error);
      toast.error("Failed to create donation request. Please try again.");
    }
  };

  // Block check - user status should be "blocked" to show blocked message
  if (user?.status === "blocked") {
    return (
      <div className="p-12 min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="max-w-xl mx-auto bg-card shadow-2xl rounded-xl p-10 text-center border-t-4 border-destructive">
          <AlertTriangle className="w-12 h-12 mx-auto text-destructive mb-4" />
          <h2 className="text-3xl font-bold text-destructive">
            Account Blocked
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Sorry, your account is currently blocked. You cannot create donation
            requests. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground flex items-center gap-3">
          <PlusCircle className="w-7 h-7 md:w-8 md:h-8 text-primary" />
          Create New Donation Request
        </h1>
        <p className="mt-2 text-base md:text-xl text-muted-foreground">
          Please fill out the details to connect instantly with potential blood
          donors.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* LEFT COLUMN: Requester Info */}
            <div className="lg:col-span-1 bg-card p-6 rounded-xl shadow-lg h-fit border-l-4 border-primary">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 shrink-0" />
                <span className="truncate">Requester Information</span>
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center text-muted-foreground text-sm">
                    <User className="w-4 h-4 mr-1 shrink-0" /> Requester Name
                  </Label>
                  <Input
                    value={user?.displayName || ""}
                    readOnly
                    className="cursor-not-allowed bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center text-muted-foreground text-sm">
                    <Mail className="w-4 h-4 mr-1 shrink-0" /> Email Address
                  </Label>
                  <Input
                    value={user?.email || ""}
                    readOnly
                    className="cursor-not-allowed bg-muted/50 border-border"
                  />
                </div>
              </div>
              <p className="mt-5 text-xs text-muted-foreground border-t border-border pt-4">
                These fields are locked as you are logged in as the requester.
              </p>
            </div>

            {/* RIGHT COLUMN: Recipient & Donation */}
            <div className="lg:col-span-2 bg-card p-6 md:p-8 rounded-xl shadow-2xl border border-border">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-primary shrink-0" />
                Donation & Recipient Details
              </h2>

              {/* Recipient Name & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                <FormField
                  control={control}
                  name="recipientName"
                  rules={{ required: "Recipient name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Recipient Name{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter patient's full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="bloodGroup"
                  rules={{ required: "Blood group is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Blood Group <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Blood Groups</SelectLabel>
                            {bloodGroups.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                <FormField
                  control={control}
                  name="donationDate"
                  rules={{ required: "Donation date is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Donation Date{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="donationTime"
                  rules={{ required: "Donation time is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        Donation Time{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hospital Name */}
              <div className="mb-6">
                <FormField
                  control={control}
                  name="hospitalName"
                  rules={{ required: "Hospital name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Hospital Name{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Dhaka Medical College Hospital"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Division & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                {/* Division Select */}
                <FormField
                  control={control}
                  name="recipientDistrict"
                  rules={{ required: "Division is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        Recipient Division{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {DIVISIONS.map((div) => (
                              <SelectItem key={div.id} value={div.name}>
                                {div.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* District Select */}
                <FormField
                  control={control}
                  name="recipientUpazila"
                  rules={{ required: "District is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Recipient District{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!selectedDivision}>
                        <FormControl>
                          <SelectTrigger
                            className={
                              !selectedDivision
                                ? "cursor-not-allowed opacity-60"
                                : ""
                            }>
                            <SelectValue
                              placeholder={
                                selectedDivision
                                  ? "Select District"
                                  : "Select Division first"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Districts</SelectLabel>
                            {availableDistricts.map((dist) => (
                              <SelectItem key={dist} value={dist}>
                                {dist}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Full Address */}
              <FormField
                control={control}
                name="fullAddressLine"
                rules={{ required: "Full address is required" }}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>
                      Full Address Line{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Request Message */}
              <FormField
                control={control}
                name="requestMessage"
                rules={{ required: "Request message is required" }}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      Request Message{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write in detail why blood is needed and any critical information..."
                        {...field}
                        className="min-h-[120px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full sm:w-auto px-8 md:px-10 py-6 text-base md:text-lg font-semibold bg-linear-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90 shadow-lg">
                  {formState.isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <HeartPulse className="w-5 h-5 mr-2" />
                      Submit Donation Request
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DonationRequest;
