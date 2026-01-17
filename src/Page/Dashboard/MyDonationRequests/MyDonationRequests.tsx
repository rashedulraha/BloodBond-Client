import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  Edit,
  Trash2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

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
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Container from "@/Page/Shared/Responsive/Container";
import useAuth from "@/Hook/useAuth";
import useAxiosSecure from "@/Hook/useAxiosSecure";
import type {
  DonationStatus,
  myDonationRequestData,
} from "@/types/MydonationRequestType";

const ITEMS_PER_PAGE = 5;

// Status Badge Component
const getStatusBadge = (status: DonationStatus) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 dark:text-yellow-500">
          <Hourglass className="w-3 h-3 mr-1" /> Pending
        </Badge>
      );
    case "inprogress":
      return (
        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-500">
          <RefreshCw className="w-3 h-3 mr-1" /> In Progress
        </Badge>
      );
    case "done":
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-500">
          <CheckCircle className="w-3 h-3 mr-1" /> Done
        </Badge>
      );
    case "canceled":
      return (
        <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-500">
          <XCircle className="w-3 h-3 mr-1" /> Canceled
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

// Custom Pagination Component
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
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-primary/10"
            }
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-default"
                  : "cursor-pointer hover:bg-primary/10"
              }>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer hover:bg-primary/10"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// Main Component
const MyDonationRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [filterStatus, setFilterStatus] = useState<DonationStatus | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  // Fetch my donation requests from database
  const {
    data: allRequests = [],

    error,
  } = useQuery<myDonationRequestData[]>({
    queryKey: ["my-donation-requests", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/my-donation/${user?.email}/request`
      );
      console.log(response.data);

      return response.data;
    },
    enabled: !!user?.email,
  });

  //! Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosSecure.delete(`/donation-request/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-donation-requests"] });
      toast.success("Donation request deleted successfully!");
      setDeleteDialogOpen(false);
      setRequestToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete donation request. Please try again.");
    },
  });

  //! Update status mutation (for Done/Cancel buttons)
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: DonationStatus;
    }) => {
      await axiosSecure.patch(`/donation-request/${id}/status`, {
        donationStatus: status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-donation-requests"] });
      toast.success("Status updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    },
  });

  //! Filtering Logic
  const filteredRequests = useMemo(() => {
    if (filterStatus === "all") {
      return allRequests;
    }
    return allRequests.filter((req) => req.donationStatus === filterStatus);
  }, [allRequests, filterStatus]);

  // Pagination Logic
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

  // Handle View Details
  const handleViewDetails = (id: string) => {
    navigate(`/donation-request/${id}`);
  };

  // Handle Edit
  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit-donation-request/${id}`);
  };

  // Handle Delete
  const handleDeleteClick = (id: string) => {
    setRequestToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      deleteMutation.mutate(requestToDelete);
    }
  };

  // Handle Status Update (Done/Cancel)
  const handleStatusUpdate = (id: string, status: DonationStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const statusOptions = [
    { value: "all", label: "All Requests" },
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "In Progress" },
    { value: "done", label: "Done" },
    { value: "canceled", label: "Canceled" },
  ];

  //? Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Error Loading Requests
          </h2>
          <p className="text-muted-foreground">
            Failed to load your donation requests. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-10">
      {/* Header */}
      <Container>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground flex items-center gap-3">
            <List className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            My Donation Requests
          </h1>
          <p className="mt-2 text-base md:text-xl text-muted-foreground">
            All blood donation requests initiated by you ({user?.displayName}).
          </p>
        </header>

        {/* Filter Control */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b">
          <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filter Requests ({totalItems} total)
          </h2>

          <Select
            onValueChange={(value: DonationStatus | "all") =>
              setFilterStatus(value)
            }
            value={filterStatus}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card border-2">
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

        {/* Data Table - Desktop */}
        <div className="hidden md:block rounded-md overflow-x-auto  border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold text-primary">
                  Recipient
                </TableHead>
                <TableHead className="font-bold text-primary">
                  <HeartPulse className="w-4 h-4 inline mr-1" /> Blood
                </TableHead>
                <TableHead className="font-bold text-primary">
                  <MapPin className="w-4 h-4 inline mr-1" /> Location
                </TableHead>
                <TableHead className="font-bold text-primary">
                  <Clock className="w-4 h-4 inline mr-1" /> Date & Time
                </TableHead>
                <TableHead className="font-bold text-primary text-center">
                  Status
                </TableHead>
                <TableHead className="font-bold text-primary text-center">
                  Donor Info
                </TableHead>
                <TableHead className="font-bold text-primary text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map((request) => (
                  <TableRow key={request._id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {request.recipientName}
                    </TableCell>
                    <TableCell className="font-bold text-destructive">
                      {request.bloodGroup}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="text-sm">
                        <div>{request.recipientUpazila}</div>
                        <div className="text-xs">
                          {request.recipientDistrict}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {formatDate(request.donationDate)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(request.donationTime)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(request.donationStatus)}
                    </TableCell>
                    <TableCell className="text-center">
                      {request.donationStatus === "inprogress" &&
                      request.donorName ? (
                        <div className="text-xs">
                          <div className="font-medium">{request.donorName}</div>
                          <div className="text-muted-foreground">
                            {request.donorEmail}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* View Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(request._id)}
                          className="hover:bg-primary/10">
                          <Eye className="w-4 h-4" />
                        </Button>

                        {/* Edit Button - Only for pending status */}
                        {request.donationStatus === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(request._id)}
                            className="hover:bg-blue-500/10 text-blue-600">
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(request._id)}
                          className="hover:bg-destructive/10 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        {/* Done Button - Only for inprogress */}
                        {request.donationStatus === "inprogress" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(request._id, "done")
                            }
                            className="hover:bg-green-500/10 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}

                        {/* Cancel Button - Only for inprogress */}
                        {request.donationStatus === "inprogress" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(request._id, "canceled")
                            }
                            className="hover:bg-red-500/10 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-12 h-12 text-muted-foreground/50" />
                      <p>
                        No donation requests found for status: {filterStatus}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((request) => (
              <div
                key={request._id}
                className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">
                      {request.recipientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {request.recipientUpazila}, {request.recipientDistrict}
                    </p>
                  </div>
                  <Badge className="bg-destructive/10 text-destructive">
                    {request.bloodGroup}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    {formatDate(request.donationDate)} at{" "}
                    {formatTime(request.donationTime)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {getStatusBadge(request.donationStatus)}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(request._id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    {request.donationStatus === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(request._id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(request._id)}
                      className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No donation requests found for status: {filterStatus}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              donation request from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90">
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyDonationRequestsPage;
