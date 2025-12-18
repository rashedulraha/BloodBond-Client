import React, { useState, useMemo } from "react";
import { Search, MapPin, Droplet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import DonationRequestCard from "./Shared/DonationRequestCard/DonationRequestCard";
import type { bloodDonation } from "@/types/blog";
import Container from "../Shared/Responsive/Container";

// Blood Groups
const BloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Districts and Upazilas
const locationData: { [key: string]: string[] } = {
  Dhaka: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
  Chattogram: [
    "Anwara",
    "Banshkhali",
    "Boalkhali",
    "Chandanaish",
    "Fatikchhari",
  ],
  Khulna: ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra"],
  Rajshahi: ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari"],
  Sylhet: ["Balaganj", "Beanibazar", "Bishwanath", "Companigonj", "Fenchuganj"],
  Barishal: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi"],
  Rangpur: ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha"],
  Mymensingh: ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur"],
};

const FindBloodInput: React.FC = () => {
  // State Management
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [upazila, setUpazila] = useState<string>("");
  const [isSearched, setIsSearched] = useState(false);

  const axiosSecure = useAxiosSecure();

  //! Fetch all donation requests
  const { data: donationCardData = [], isLoading } = useQuery({
    queryKey: ["card-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-request");
      return res.data;
    },
  });

  // Get available upazilas based on selected district
  const availableUpazilas = useMemo(() => {
    return district ? locationData[district] || [] : [];
  }, [district]);

  // Filter donation requests based on search criteria
  const filteredRequests = useMemo(() => {
    if (!isSearched) return donationCardData;

    return donationCardData.filter((donation: bloodDonation) => {
      const matchesBloodGroup = bloodGroup
        ? donation.bloodGroup === bloodGroup
        : true;
      const matchesDistrict = district
        ? donation.recipientDistrict === district
        : true;
      const matchesUpazila = upazila
        ? donation.recipientUpazila === upazila
        : true;

      return matchesBloodGroup && matchesDistrict && matchesUpazila;
    });
  }, [donationCardData, bloodGroup, district, upazila, isSearched]);

  // Handle district change
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setUpazila("");
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bloodGroup || !district || !upazila) {
      console.warn("Please select all fields.");
      return;
    }

    setIsSearched(true);
  };

  // Handle reset
  const handleReset = () => {
    setBloodGroup("");
    setDistrict("");
    setUpazila("");
    setIsSearched(false);
  };

  return (
    <Container>
      {/* Header */}
      <div
        className="text-center pb-6 border-b border-border mb-8"
        data-aos="fade-down">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-3 flex items-center justify-center flex-wrap gap-2">
          <Search className="w-7 h-7 md:w-8 md:h-8 text-destructive" />
          Find Lifesaving Blood
        </h1>
        <p className="text-base md:text-lg text-muted-foreground px-4">
          Connect with verified donors instantly by selecting your requirements.
        </p>
      </div>

      {/* Search Card & Form */}
      <div
        className="bg-card/50 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg border border-primary/30 max-w-5xl mx-auto mb-20"
        data-aos="fade-up"
        data-aos-delay="200">
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Blood Group */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center text-foreground">
                <Droplet className="w-4 h-4 mr-2 text-destructive shrink-0" />
                <span className="truncate">Blood Group</span>
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Select onValueChange={setBloodGroup} value={bloodGroup}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select Blood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Blood Groups</SelectLabel>
                    {BloodGroups.map((bg) => (
                      <SelectItem key={bg} value={bg}>
                        <div className="flex items-center gap-2">
                          <Droplet className="w-3 h-3 text-destructive" />
                          {bg}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center text-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" />
                <span className="truncate">District</span>
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Select onValueChange={handleDistrictChange} value={district}>
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Districts</SelectLabel>
                    {Object.keys(locationData).map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center text-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" />
                <span className="truncate">Upazila</span>
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Select
                onValueChange={setUpazila}
                value={upazila}
                disabled={!district}>
                <SelectTrigger
                  className={`w-full h-11 ${
                    !district ? "cursor-not-allowed opacity-60" : ""
                  }`}>
                  <SelectValue
                    placeholder={
                      district ? "Select Upazila" : "Select District First"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Upazilas</SelectLabel>
                    {availableUpazilas.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-transparent">
                Action
              </Label>
              <Button
                type="submit"
                className="w-full h-11 text-base font-bold shadow-md transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]"
                disabled={!bloodGroup || !district || !upazila}>
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Reset Button - Full Width on Mobile */}
          {isSearched && (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="w-full sm:w-auto border-2 border-primary/50 hover:bg-primary/10">
                Reset Filters
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Search Results Info */}
      {isSearched && (
        <div
          className="mb-6 p-4 bg-primary/10 border-l-4 border-primary rounded-lg"
          data-aos="fade-up">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <AlertCircle className="w-5 h-5 text-primary shrink-0" />
            <span>
              Found{" "}
              <span className="text-primary text-lg">
                {filteredRequests.length}
              </span>{" "}
              donation request{filteredRequests.length !== 1 ? "s" : ""} for{" "}
              <span className="text-destructive">{bloodGroup}</span> in{" "}
              <span className="text-primary">
                {upazila}, {district}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading donation requests...</p>
        </div>
      )}

      {/* Donation Request Cards Grid */}
      {!isLoading && filteredRequests.length > 0 && (
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4 xl:gap-8 "
          data-aos="fade-up"
          data-aos-delay="300">
          {filteredRequests.map((donationData: bloodDonation) => (
            <DonationRequestCard
              donationdata={donationData}
              key={donationData._id}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && isSearched && filteredRequests.length === 0 && (
        <div
          className="text-center py-20 bg-card rounded-lg border border-border shadow-lg"
          data-aos="fade-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
            <Droplet className="w-10 h-10 text-destructive" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            No Donations Found
          </h3>
          <p className="text-muted-foreground mb-6 px-4">
            We couldn't find any donation requests matching{" "}
            <strong className="text-destructive">{bloodGroup}</strong> in{" "}
            <strong className="text-primary">
              {upazila}, {district}
            </strong>
            .
          </p>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-2 border-primary hover:bg-primary hover:text-primary-foreground">
            Clear Filters
          </Button>
        </div>
      )}
    </Container>
  );
};

export default FindBloodInput;
