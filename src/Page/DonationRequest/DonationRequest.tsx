import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Mock Location Data
const locationData: { [key: string]: string[] } = {
  Dhaka: ["Savar", "Dhamrai", "Tejgaon", "Mirpur"],
  Chittagong: ["Hathazari", "Panchlaish", "Patenga", "Kotwali"],
  Rajshahi: ["Paba", "Bagmara", "Motihar", "Boalia"],
};

// Mock User Context (Example: Donor is logged in)
const mockUser = {
  name: "Rahim Ahmed",
  email: "rahim.ahmed@example.com",
  isActive: true, // Set to false to test blocked user message
};

// ---------------------------------------------------
// Component Interface
// ---------------------------------------------------

interface DonationRequestFormState {
  recipientName: string;
  recipientDistrict: string;
  recipientUpazila: string;
  hospitalName: string;
  fullAddressLine: string;
  bloodGroup: string;
  donationDate: string;
  donationTime: string;
  requestMessage: string;
}

const CreateDonationRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DonationRequestFormState>({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddressLine: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });
  const [error, setError] = useState<string | null>(null);
  const user = mockUser;

  // --- Blocked User Check (Themed) ---
  if (!user.isActive) {
    return (
      <div className="p-12 min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="max-w-xl mx-auto bg-card shadow-2xl rounded-xl p-10 text-center border-t-4 border-destructive">
          <AlertTriangle className="w-12 h-12 mx-auto text-destructive mb-4" />
          <h2 className="text-3xl font-bold text-destructive">
            Action Blocked
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            **Sorry, your account is currently inactive.** You are not
            authorized to create new blood donation requests. Please contact
            support.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "recipientDistrict") {
      setFormData((prev) => ({ ...prev, recipientUpazila: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !formData.recipientName ||
      !formData.bloodGroup ||
      !formData.donationDate ||
      !formData.recipientDistrict
    ) {
      setError(
        "Please fill in the Recipient Name, Blood Group, District, and Donation Date."
      );
      return;
    }

    try {
      const requestPayload = {
        requesterName: user.name,
        requesterEmail: user.email,
        ...formData,
        donationStatus: "pending",
      };

      // --- API Submission Mock ---
      console.log("Submitting Donation Request:", requestPayload);

      // await fetch('/api/donations/create', { method: 'POST', body: JSON.stringify(requestPayload) });

      alert("Donation Request created successfully!");
      navigate("/dashboard");
    } catch (apiError) {
      setError(
        "An issue occurred while creating the request. Please try again."
      );
      console.error("API Submission Error:", apiError);
    }
  };

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

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN: Requester Information (Read-Only) --- */}
          <div className="lg:col-span-1 bg-card p-6 rounded-xl shadow-lg h-fit border-l-4 border-primary">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Requester Information
            </h2>

            <div className="space-y-4">
              {/* Requester Name (Read Only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-muted-foreground flex items-center">
                    <User className="w-4 h-4 mr-1" /> Requester Name
                  </span>
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm shadow-sm cursor-not-allowed"
                />
              </div>

              {/* Requester Email (Read Only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-muted-foreground flex items-center">
                    <Mail className="w-4 h-4 mr-1" /> Email Address
                  </span>
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm shadow-sm cursor-not-allowed"
                />
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground border-t border-border pt-4">
              *These fields are locked as you are logged in as the requester.
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Recipient Name <span className="text-destructive">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Enter full name of the recipient"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Required Blood Group{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Donation Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    Donation Date <span className="text-destructive">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  name="donationDate"
                  value={formData.donationDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    Donation Time
                  </span>
                </label>
                <input
                  type="time"
                  name="donationTime"
                  value={formData.donationTime}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            {/* Hospital Name */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Hospital Name</span>
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="e.g., Dhaka Medical College Hospital"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Location Details (District and Upazila) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    Recipient District{" "}
                    <span className="text-destructive">*</span>
                  </span>
                </label>
                <select
                  name="recipientDistrict"
                  value={formData.recipientDistrict}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="" disabled>
                    Select District
                  </option>
                  {Object.keys(locationData).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Recipient Upazila
                  </span>
                </label>
                <select
                  name="recipientUpazila"
                  value={formData.recipientUpazila}
                  onChange={handleChange}
                  disabled={!formData.recipientDistrict}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm disabled:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="" disabled>
                    Select Upazila
                  </option>
                  {formData.recipientDistrict &&
                    locationData[formData.recipientDistrict].map((upazila) => (
                      <option key={upazila} value={upazila}>
                        {upazila}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Full Address Line */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">
                  Full Address Line
                </span>
              </label>
              <input
                type="text"
                name="fullAddressLine"
                value={formData.fullAddressLine}
                onChange={handleChange}
                placeholder="e.g., Zahir Raihan Rd, Dhaka"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Request Message */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />
                  Request Message (Reason for need)
                </span>
              </label>
              <textarea
                name="requestMessage"
                value={formData.requestMessage}
                onChange={handleChange}
                placeholder="Write in detail why blood is needed and any critical information..."
                className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive p-3 rounded-lg mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Request Button */}
            <div className="form-control mt-8">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background 
                         bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 text-lg shadow-lg">
                <HeartPulse className="w-6 h-6 mr-3" />
                Submit Donation Request
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequestPage;
