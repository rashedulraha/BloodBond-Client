import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Loader2,
} from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// --- [ 1. Zod Schema for Contact Form ] ---
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setLoading(true);
    setSubmissionStatus("idle");

    try {
      // ⚠️ API Call to send contact form data (e.g., to a dedicated form submission endpoint or email service)
      console.log("Contact form submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmissionStatus("success");
      reset(); // Clear form on success
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* --- [ 2. Header ] --- */}
        <div className="text-center pt-8 pb-4 border-b border-border mb-10">
          <h1 className="text-5xl font-extrabold text-primary mb-2">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            We're here to help you. Send us a message or find our details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- [ 3. Contact Information (2/3 width on large screen) ] --- */}
          <div className="lg:col-span-2 bg-card p-8 rounded-md  border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-primary" /> Send Us A
              Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    {...register("name")}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email Address</Label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  type="text"
                  {...register("subject")}
                  placeholder="Regarding Blood Donation Request"
                />
                {errors.subject && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label>Your Message</Label>
                <Textarea
                  rows={5}
                  {...register("message")}
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Status and Submit */}
              <div className="flex flex-col items-center pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message <Send className="w-5 h-5 ml-2" />
                    </span>
                  )}
                </Button>

                {submissionStatus === "success" && (
                  <p className="text-green-500 mt-3 font-semibold">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submissionStatus === "error" && (
                  <p className="text-destructive mt-3 font-semibold">
                    Submission failed. Please try again later.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* --- 4. Organization Details (1/3 width on large screen) --- */}
          <div className="lg:col-span-1 space-y-8 p-6 bg-secondary/30 rounded-md border border-secondary/50 h-fit">
            <h3 className="text-2xl font-bold text-foreground">
              Contact Details
            </h3>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Email Address</p>
                <a
                  href="mailto:support@bloodconnect.org"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  support@bloodconnect.org
                </a>
              </div>
            </div>

            {/* Phone/Contact Number */}
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Contact Number</p>
                <a
                  href="tel:+880123456789"
                  className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                  +880 1992284845
                </a>
                <p className="text-xs text-muted-foreground">
                  (Available 24/7 for emergencies)
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Our Location</p>
                <p className="text-muted-foreground">
                  BloodConnect HQ, <br />
                  Road 10, Sector 12, Gulshan, Dhaka, Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
