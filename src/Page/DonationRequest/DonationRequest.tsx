import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

// Assuming these are imported from your shadcn/ui setup
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
import { Textarea } from "@/components/ui/textarea"; // Added Textarea for consistency
import { Button } from "@/components/ui/button"; // Changed to Button for consistency
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "recharts";

// ---------------------------------------------------
// 1. MOCK DATA
// ---------------------------------------------------

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const locationData: { [key: string]: string[] } = {
  Dhaka: ["Savar", "Dhamrai", "Tejgaon", "Mirpur"],
  Chittagong: ["Hathazari", "Panchlaish", "Patenga", "Kotwali"],
  Rajshahi: ["Paba", "Bagmara", "Motihar", "Boalia"],
};

const mockUser = {
  name: "Rahim Ahmed",
  email: "rahim.ahmed@example.com",
  isActive: true,
};

// ---------------------------------------------------
// 2. ZOD SCHEMA (Validation)
// ---------------------------------------------------

// Define the blood group enum for Zod validation
const bloodGroupEnum = z.enum(bloodGroups as [string, ...string[]]);

const formSchema = z.object({
  recipientName: z.string().min(2, "Recipient name is required."),
  bloodGroup: bloodGroupEnum.refine((val) => val !== undefined, {
    message: "Blood group is required.",
  }),
  donationDate: z.string().min(1, "Donation date is required."),
  // Validation to ensure the date is not in the past
  donationDateValidation: z.string().refine(
    (date) => {
      return (
        new Date(date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
      );
    },
    {
      message: "Date cannot be in the past.",
      path: ["donationDate"],
    }
  ),
  donationTime: z.string().optional(),
  hospitalName: z.string().optional(),
  recipientDistrict: z.string().min(1, "District is required."),
  recipientUpazila: z.string().optional(),
  fullAddressLine: z.string().optional(),
  requestMessage: z
    .string()
    .max(500, "Message cannot exceed 500 characters.")
    .optional(),
});

// Infer the TypeScript type from the schema
type DonationRequestFormState = z.infer<typeof formSchema>;

// ---------------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------------

const DonationRequest: React.FC = () => {
  const navigate = useNavigate();
  const user = mockUser;

  // 3.1 Initialize React Hook Form
  const form = useForm<DonationRequestFormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: "",
      bloodGroup: undefined,
      donationDate: "",
      donationTime: "",
      recipientDistrict: "",
      recipientUpazila: "",
      hospitalName: "",
      fullAddressLine: "",
      requestMessage: "",
    },
    mode: "onChange",
  });

  const { watch, reset, setError } = form;
  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedDistrict = watch("recipientDistrict");

  // 3.2 Handle Form Submission
  const onSubmit: SubmitHandler<DonationRequestFormState> = async (data) => {
    try {
      const requestPayload = {
        requesterName: user.name,
        requesterEmail: user.email,
        ...data,
        donationStatus: "pending",
      };

      console.log("Submitting Donation Request:", requestPayload);

      // --- API Submission Mock ---
      // const response = await fetch('/api/donations/create', { method: 'POST', body: JSON.stringify(requestPayload) });

      alert("Donation Request created successfully!");
      reset();
      navigate("/dashboard");
    } catch (apiError) {
      // Handle actual API submission failure
      console.error("API Submission Error:", apiError);
      setError("root.serverError", {
        type: "manual",
        message:
          "An issue occurred while creating the request. Please check your connection and try again.",
      });
    }
  };

  // --- 3.3 Blocked User Check (Themed) ---
  if (!user.isActive) {
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

  // 3.4 Render Form with Shadcn/UI and RHF
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- LEFT COLUMN: Requester Information (Read-Only) --- */}
            <div className="lg:col-span-1 bg-card p-6 rounded-xl shadow-lg h-fit border-l-4 border-primary">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Requester Information
              </h2>

              <div className="space-y-4">
                {/* Requester Name (Read Only) */}
                <div className="space-y-2">
                  <Label className="flex items-center text-muted-foreground">
                    <User className="w-4 h-4 mr-1" /> Requester Name
                  </Label>
                  <Input
                    type="text"
                    value={user.name}
                    readOnly
                    disabled
                    className="cursor-not-allowed bg-muted/50 border-border"
                  />
                </div>

                {/* Requester Email (Read Only) */}
                <div className="space-y-2">
                  <Label className="flex items-center text-muted-foreground">
                    <Mail className="w-4 h-4 mr-1" /> Email Address
                  </Label>
                  <Input
                    type="email"
                    value={user.email}
                    readOnly
                    disabled
                    className="cursor-not-allowed bg-muted/50 border-border"
                  />
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground border-t border-border pt-4">
                These fields are locked as you are logged in as the requester.
              </p>
            </div>

            {/* --- RIGHT COLUMN: Recipient and Donation Details (Main Form) --- */}
            <div className="lg:col-span-2 bg-card p-8 rounded-xl shadow-2xl border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <HeartPulse className="w-5 h-5 mr-2 text-primary" />
                Donation & Recipient Details
              </h2>

              {/* Recipient Name and Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* 1. Recipient Name */}
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
                        <Input
                          placeholder="Enter full name of the recipient"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 2. Blood Group (Select Component) */}
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

              {/* Donation Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* 3. Donation Date (Input type="date") */}
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
                        {/* Ensure date input only allows today or future dates */}
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

                {/* 4. Donation Time (Input type="time") */}
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

              {/* 5. Hospital Name */}
              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel>Hospital Name</FormLabel>
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

              {/* Location Details (District and Upazila) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* 6. Recipient District (Select Component) */}
                <FormField
                  control={form.control}
                  name="recipientDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                        Recipient District{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          // Reset Upazila when District changes
                          form.setValue("recipientUpazila", "");
                          field.onChange(value);
                        }}
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

                {/* 7. Recipient Upazila (Select Component) */}
                <FormField
                  control={form.control}
                  name="recipientUpazila"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Upazila</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        // Disable if no district is selected
                        disabled={!selectedDistrict}>
                        <FormControl>
                          <SelectTrigger className="disabled:cursor-not-allowed disabled:bg-muted/50">
                            <SelectValue placeholder="Select Upazila" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Upazilas</SelectLabel>
                            {/* Populate options based on the selected district */}
                            {selectedDistrict &&
                              locationData[selectedDistrict] &&
                              locationData[selectedDistrict].map((upazila) => (
                                <SelectItem key={upazila} value={upazila}>
                                  {upazila}
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

              {/* 8. Full Address Line */}
              <FormField
                control={form.control}
                name="fullAddressLine"
                render={({ field }) => (
                  <FormItem className="mb-6">
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

              {/* 9. Request Message (Textarea Component) */}
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
                        placeholder="Write in detail why blood is needed and any critical information..."
                        {...field}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Server Error Message (Displays API submission errors) */}
              {form.formState.errors.root?.serverError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive p-3 rounded-lg mb-4">
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-sm font-medium">
                    {form.formState.errors.root.serverError.message}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <div className="form-control mt-8 flex item-center justify-center">
                <Button
                  type="submit"
                  // Disable button while submitting
                  disabled={form.formState.isSubmitting}>
                  <HeartPulse className="w-6 h-6 mr-3" />
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Donation Request"}
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
