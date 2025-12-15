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
import { useForm, type SubmitHandler } from "react-hook-form";
import type { bloodDonation } from "@/types/blog";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const locationData: { [key: string]: string[] } = {
  Dhaka: ["Savar", "Dhamrai", "Tejgaon", "Mirpur"],
  Chittagong: ["Hathazari", "Panchlaish", "Patenga", "Kotwali"],
  Rajshahi: ["Paba", "Bagmara", "Motihar", "Boalia"],
};

const DonationRequest: React.FC = () => {
  const form = useForm<bloodDonation>();
  const { handleSubmit } = form;
  const { user } = useAuth();

  const onSubmit: SubmitHandler<bloodDonation> = (data) => console.log(data);

  // Block inactive users
  if (user?.status === "active") {
    return (
      <div className="p-12 min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="max-w-xl mx-auto bg-card shadow-2xl rounded-xl p-10 text-center border-t-4 border-destructive">
          <AlertTriangle className="w-12 h-12 mx-auto text-destructive mb-4" />
          <h2 className="text-3xl font-bold text-destructive">
            Action Blocked
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Sorry, your account is currently inactive. You are not authorized to
            create new blood donation requests. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-foreground flex items-center">
          <PlusCircle className="w-8 h-8 mr-3 text-primary" />
          Create New Donation Request
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Please fill out the details to connect instantly with potential blood
          donors.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Requester Info */}
            <div className="lg:col-span-1 bg-card p-6 rounded-xl shadow-lg h-fit border-l-4 border-primary">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center truncate">
                <User className="w-5 h-5 mr-2" />
                Requester Information
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="flex items-center text-muted-foreground">
                    <User className="w-4 h-4 mr-1" /> Requester Name
                  </Label>
                  {user && (
                    <Input
                      defaultValue={user.displayName ?? ""}
                      readOnly
                      className="cursor-not-allowed bg-muted/50 border-border"
                    />
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-1" /> Email Address
                  </Label>
                  {user && (
                    <Input
                      defaultValue={user.email ?? ""}
                      readOnly
                      className="cursor-not-allowed bg-muted/50 border-border"
                    />
                  )}
                </div>
              </div>

              <p className="mt-5 text-sm text-muted-foreground border-t border-border pt-4">
                These fields are locked as you are logged in as the requester.
              </p>
            </div>

            {/* RIGHT COLUMN: Recipient & Donation */}
            <div className="lg:col-span-2 bg-card p-8 rounded-xl shadow-2xl border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-primary" />
                Donation & Recipient Details
              </h2>

              {/* Recipient Name & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Recipient Name{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Required Blood Group{" "}
                        <span className="text-destructive">*</span>
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
                            {bloodGroups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="donationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
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
                  control={form.control}
                  name="donationTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                        Donation Time
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hospital & District */}
              <div className="flex items-center gap-5 mb-5">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="hospitalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Dhaka Medical College"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="recipientDistrict"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                          Recipient Division{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Available Districts</SelectLabel>
                              {Object.keys(locationData).map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
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
              </div>

              {/* Upazila & Full Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="recipientUpazila"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Upazila</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger className="disabled:cursor-not-allowed disabled:bg-muted/50">
                            <SelectValue placeholder="Select Upazila" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Upazilas</SelectLabel>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullAddressLine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address Line</FormLabel>
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
              </div>

              {/* Request Message */}
              <FormField
                control={form.control}
                name="requestMessage"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                      Request Message (Reason for need)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Explain why blood is needed..."
                        {...field}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="form-control mt-8 flex justify-center">
                <Button type="submit">
                  <HeartPulse className="w-6 h-6 mr-3" /> Submit
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
