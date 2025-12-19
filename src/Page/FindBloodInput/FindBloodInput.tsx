import React, { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Droplet, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import DonationRequestCard from "./Shared/DonationRequestCard/DonationRequestCard";
import type { bloodDonation } from "@/types/blog";
import Container from "../Shared/Responsive/Container";
import DashboardSpinner from "@/Page/Shared/Spinner/DashboardSpinner";

// Blood Groups
const BloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const FindBloodInput: React.FC = () => {
  // State Management
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [upazila, setUpazila] = useState<string>("");
  const [isSearched, setIsSearched] = useState(false);

  // District & Upazila Data States
  const [allDistricts, setAllDistricts] = useState<
    { id: string; name: string }[]
  >([]);
  const [allUpazilas, setAllUpazilas] = useState<
    { id: string; district_id: string; name: string }[]
  >([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setAllDistricts(data))
      .catch((err) => console.error("Error loading districts:", err));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setAllUpazilas(data))
      .catch((err) => console.error("Error loading upazilas:", err));
  }, []);

  //! Fetch all donation requests
  const { data: donationCardData = [], isLoading } = useQuery({
    queryKey: ["card-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-request");
      return res.data;
    },
  });

  const availableUpazilas = useMemo(() => {
    if (!district) return [];

    return allUpazilas?.filter((u) => u.district_id === district);
  }, [district, allUpazilas]);

  const filteredRequests = useMemo(() => {
    if (!isSearched) return donationCardData;

    return donationCardData.filter((donation: bloodDonation) => {
      const matchesBloodGroup = bloodGroup
        ? donation.bloodGroup === bloodGroup
        : true;
      const matchesDistrict = district
        ? donation.districtId === district
        : true;
      const matchesUpazila = upazila ? donation.upazilaId === upazila : true;

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
    setIsSearched(true);
  };

  // Handle reset
  const handleReset = () => {
    setBloodGroup("");
    setDistrict("");
    setUpazila("");
    setIsSearched(false);
  };

  const selectedDistrictName =
    allDistricts.find((d) => d.id === district)?.name || "";
  const selectedUpazilaName =
    allUpazilas?.find((u) => u.id === upazila)?.name || "";

  return (
    <Container>
      {/* Header */}
      <div className="text-center pb-6 border-b border-border mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-3 flex items-center justify-center flex-wrap gap-2">
          <Search className="w-7 h-7 md:w-8 md:h-8 text-destructive" />
          Find Lifesaving Blood
        </h1>
        <p className="text-base md:text-lg text-muted-foreground px-4">
          Connect with verified donors instantly by selecting your requirements.
        </p>
      </div>

      {/* Search Card & Form */}
      <div className="bg-card/50 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg border border-primary/30 max-w-5xl mx-auto mb-20">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Blood Group Select */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <Droplet className="w-4 h-4 mr-2 text-destructive" /> Blood
                Group
              </Label>
              <Select onValueChange={setBloodGroup} value={bloodGroup}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select Blood" />
                </SelectTrigger>
                <SelectContent>
                  {BloodGroups.map((bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Select */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" /> District
              </Label>
              <Select onValueChange={handleDistrictChange} value={district}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {allDistricts.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upazila Select */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" /> Upazila
              </Label>
              <Select
                onValueChange={setUpazila}
                value={upazila}
                disabled={!district}>
                <SelectTrigger className="h-11">
                  <SelectValue
                    placeholder={
                      district ? "Select Upazila" : "First Select District"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableUpazilas.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-end">
              <Button
                type="submit"
                className="h-11 font-bold"
                disabled={!bloodGroup || !district || !upazila}>
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          </div>

          {isSearched && (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="gap-2">
                <RefreshCcw className="w-4 h-4" /> Reset Filters
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Results Section */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <DashboardSpinner />
        </div>
      ) : (
        <>
          {isSearched && (
            <div className="mb-6 p-4 bg-primary/10 border-l-4 border-primary rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span>
                Found{" "}
                <span className="font-bold text-primary">
                  {filteredRequests.length}
                </span>{" "}
                requests for
                <span className="text-destructive font-bold">
                  {" "}
                  {bloodGroup}
                </span>{" "}
                in {selectedUpazilaName}, {selectedDistrictName}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRequests.map((donation: bloodDonation) => (
              <DonationRequestCard key={donation._id} donationdata={donation} />
            ))}
          </div>

          {isSearched && filteredRequests.length === 0 && (
            <div className="text-center py-20 bg-muted/30 rounded-lg border-2 border-dashed">
              <Droplet className="w-12 h-12 text-destructive mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-semibold">
                No Matching Requests Found
              </h3>
              <p className="text-muted-foreground mt-2">
                Try changing your location or blood group.
              </p>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default FindBloodInput;
