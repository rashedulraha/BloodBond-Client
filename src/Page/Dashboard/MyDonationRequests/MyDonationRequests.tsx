import React, { useState, useMemo, useCallback } from "react";
import {
  HeartPulse,
  Filter,
  Clock,
  MapPin,
  List,
  XCircle,
  CheckCircle,
  Hourglass,
  RefreshCw,
} from "lucide-react";

// Shadcn UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import Container from "@/Page/Shared/Responsive/Container";

// ---------------------------------------------------
// 1. DATA AND TYPE DEFINITIONS
// ---------------------------------------------------

type DonationStatus = "pending" | "inprogress" | "done" | "canceled";

interface DonationRequest {
  id: string;
  recipientName: string;
  bloodGroup: string;
  location: string;
  donationDate: string;
  donationTime: string;
  status: DonationStatus;
  requesterEmail: string; // Used to filter requests made by the current user
}

// Mock Logged-in User (The requester)
const currentUser = {
  email: "rahim.ahmed@example.com",
  name: "Rahim Ahmed",
};

// Mock Data Source (All requests, including some not made by the current user)
const mockDonationRequests: DonationRequest[] = [
  // Requests made by the current user (Rahim Ahmed)
  {
    id: "req001",
    recipientName: "Father",
    bloodGroup: "O+",
    location: "Dhaka Medical",
    donationDate: "2025-12-20",
    donationTime: "10:00 AM",
    status: "pending",
    requesterEmail: currentUser.email,
  },
  {
    id: "req002",
    recipientName: "Niece",
    bloodGroup: "A-",
    location: "Rajshahi Clinic",
    donationDate: "2025-12-18",
    donationTime: "04:30 PM",
    status: "inprogress",
    requesterEmail: currentUser.email,
  },
  {
    id: "req003",
    recipientName: "Wife",
    bloodGroup: "B+",
    location: "Square Hospital",
    donationDate: "2025-12-10",
    donationTime: "11:00 AM",
    status: "done",
    requesterEmail: currentUser.email,
  },
  {
    id: "req004",
    recipientName: "Friend",
    bloodGroup: "AB-",
    location: "Panchlaish",
    donationDate: "2025-12-05",
    donationTime: "09:00 AM",
    status: "canceled",
    requesterEmail: currentUser.email,
  },
  {
    id: "req005",
    recipientName: "Brother",
    bloodGroup: "O+",
    location: "Savar",
    donationDate: "2026-01-01",
    donationTime: "08:00 AM",
    status: "pending",
    requesterEmail: currentUser.email,
  },
  {
    id: "req006",
    recipientName: "Cousin",
    bloodGroup: "A+",
    location: "Motihar",
    donationDate: "2025-12-25",
    donationTime: "01:00 PM",
    status: "inprogress",
    requesterEmail: currentUser.email,
  },
  {
    id: "req007",
    recipientName: "Patient X",
    bloodGroup: "B-",
    location: "Tejgaon",
    donationDate: "2025-12-28",
    donationTime: "02:00 PM",
    status: "pending",
    requesterEmail: currentUser.email,
  },
  // Other users' requests (will be filtered out)
  {
    id: "req100",
    recipientName: "Donor Y",
    bloodGroup: "AB+",
    location: "Chittagong",
    donationDate: "2025-12-22",
    donationTime: "03:00 PM",
    status: "pending",
    requesterEmail: "other.user@example.com",
  },
];

const ITEMS_PER_PAGE = 5;

// ---------------------------------------------------
// 2. HELPER FUNCTIONS & COMPONENTS
// ---------------------------------------------------

const getStatusBadge = (status: DonationStatus) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
          <Hourglass className="w-3 h-3 mr-1" /> Pending
        </Badge>
      );
    case "inprogress":
      return (
        <Badge
          variant="secondary"
          className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
          <RefreshCw className="w-3 h-3 mr-1" /> In Progress
        </Badge>
      );
    case "done":
      return (
        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
          <CheckCircle className="w-3 h-3 mr-1" /> Done
        </Badge>
      );
    case "canceled":
      return (
        <Badge
          variant="destructive"
          className="bg-destructive/10 text-destructive hover:bg-destructive/20">
          <XCircle className="w-3 h-3 mr-1" /> Canceled
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {/* Page Number Links */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-default"
                  : "cursor-pointer"
              }>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// ---------------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------------

const MyDonationRequestsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<DonationStatus | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // 3.1 Filtering Logic (Memoized)
  const filteredRequests = useMemo(() => {
    // 1. Filter by current user (Requester)
    const userRequests = mockDonationRequests.filter(
      (req) => req.requesterEmail === currentUser.email
    );

    // 2. Filter by status
    if (filterStatus === "all") {
      return userRequests;
    }
    return userRequests.filter((req) => req.status === filterStatus);
  }, [filterStatus]);

  // 3.2 Pagination Logic
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, endIndex);
  }, [filteredRequests, currentPage]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  // Function to handle opening a request detail (if needed)
  const handleViewDetails = (id: string) => {
    // Example: navigate(`/requests/${id}`);
    alert(`Viewing details for Request ID: ${id}`);
  };

  const statusOptions = [
    { value: "all", label: "All Requests" },
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "canceled", label: "Canceled" },
  ];

  return (
    <div className=" py-10">
      <header className="Container mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-foreground flex items-center">
          <List className="w-8 h-8 mr-3 text-primary" />
          My Donation Requests
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          All blood donation requests initiated by you ({currentUser.name}).
        </p>
      </header>

      <Container>
        {/* --- Filtering Control --- */}
        <div className="flex justify-between items-center mb-6 pb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Filter className="w-5 h-5 mr-2 text-primary" />
            Filter Requests ({totalItems} total)
          </h2>

          <Select
            onValueChange={(value: DonationStatus | "all") =>
              setFilterStatus(value)
            }
            value={filterStatus}>
            <SelectTrigger className="w-[180px] bg-input/50">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* --- Data Table --- */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-primary">ID</TableHead>
              <TableHead className="text-primary">Recipient Name</TableHead>
              <TableHead className="text-primary">
                <HeartPulse className="w-4 h-4 inline mr-1" /> Blood Group
              </TableHead>
              <TableHead className="text-primary">
                <MapPin className="w-4 h-4 inline mr-1" /> Location
              </TableHead>
              <TableHead className="text-primary">
                <Clock className="w-4 h-4 inline mr-1" /> Date
              </TableHead>
              <TableHead className="text-primary text-center">Status</TableHead>
              <TableHead className="text-primary text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRequests.length > 0 ? (
              paginatedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-primary">
                    {request.id}
                  </TableCell>
                  <TableCell>{request.recipientName}</TableCell>
                  <TableCell className="font-bold text-destructive">
                    {request.bloodGroup}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.location}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{request.donationDate}</span>{" "}
                    at {request.donationTime}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(request.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewDetails(request.id)}
                      className="hover:bg-secondary/80">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground">
                  No donation requests found for the selected status (
                  {filterStatus}).
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* --- Pagination Control --- */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </div>
  );
};

export default MyDonationRequestsPage;
