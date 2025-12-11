import React, { useState } from "react";
import { Search, MapPin, Droplet } from "lucide-react";
// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Using label for better accessibility
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Assuming the Container component is available
// import Container from "../Responsive/Container";

const BloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const Districts = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const FindBloodInput: React.FC = () => {
  // --- [ 1. State Management (Corrected) ] ---
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bloodGroup || !district) {
      // Simple client-side check before search (though full validation is excluded)
      console.warn("Please select both Blood Group and District.");
      return;
    }

    // ⚠️ Placeholder for future search API integration (No actual functionality here)
    console.log("Search initiated (Placeholder)");
    console.log("Searching for:", { bloodGroup, district });
  };

  return (
    <div className="p-4 sm:p-8 bg-background min-h-screen flex items-start justify-center">
      <div className="max-w-3xl w-full mx-auto mt-12">
        {/* --- [ Header ] --- */}
        <div
          className="text-center pt-4 pb-4 border-b border-border mb-8"
          data-aos="fade-down">
          <h1 className="text-4xl font-extrabold text-primary mb-2 flex items-center justify-center">
            <Search className="w-8 h-8 mr-3 text-destructive" /> Find Lifesaving
            Blood
          </h1>
          <p className="text-lg text-muted-foreground">
            Connect with verified donors instantly by selecting your
            requirements.
          </p>
        </div>

        {/* --- [ 2. Search Card & Input Form - Improved Responsive Layout ] --- */}
        <div
          className="bg-card p-6 md:p-8 rounded-md  border border-primary/30"
          data-aos="fade-up"
          data-aos-delay="200">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* --- [ Inputs Section: Grid Layout for better responsiveness ] --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end">
              {/* 1. Blood Group Input */}
              <div>
                <Label
                  htmlFor="blood-group"
                  className="text-sm font-medium flex items-center text-foreground">
                  <Droplet className="w-4 h-4 mr-2 text-destructive" /> Required
                  Blood Group
                </Label>
                <Select onValueChange={setBloodGroup} value={bloodGroup}>
                  <SelectTrigger
                    id="blood-group"
                    className="w-full text-base font-semibold">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Blood Groups</SelectLabel>
                      {BloodGroups.map((bg) => (
                        <SelectItem key={bg} value={bg}>
                          {bg}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* 2. District Input */}
              <div>
                <Label
                  htmlFor="district"
                  className="text-sm font-medium flex items-center text-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-primary" /> Donation
                  District
                </Label>
                <Select onValueChange={setDistrict} value={district}>
                  <SelectTrigger id="district" className="w-full">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Districts in Bangladesh</SelectLabel>
                      {Districts.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Search Button (Takes full width on mobile, 1/3 on desktop) */}
              <div className="w-full pt-2 md:pt-0">
                <Button
                  type="submit"
                  className="w-full h-10 text-base font-bold shadow-md transition-transform duration-200 hover:shadow-lg"
                  disabled={!bloodGroup || !district}>
                  <Search className="w-5 h-5 mr-2" />
                  Search Donors
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* --- [ Bottom Placeholder/Info ] --- */}
        <div
          className="mt-8 p-4 text-center bg-secondary/30 border border-secondary/50 rounded-lg text-muted-foreground text-sm"
          data-aos="fade-up"
          data-aos-delay="400">
          <p>
            **Note:** This search bar provides instant filtering. After clicking
            'Search', the donor results will appear immediately below this
            section.
          </p>
          <p className="font-semibold mt-1">
            (The results table and donor list will be implemented here later.)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FindBloodInput;
