import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Heart,
  History,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Eye,
  List,
  MapPin,
  Clock,
  HeartPulse,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import DashboardSpinner from "@/Page/Shared/Spinner/DashboardSpinner";

type DonationStatus = "pending" | "inprogress" | "done" | "canceled";

interface DonationRequest {
  _id: string;
  recipientName: string;
  recipientDistrict: string;
  recipientUpazila: string;
  hospitalName: string;
  donationDate: string;
  donationTime: string;
  bloodGroup: string;
  donationStatus: DonationStatus;
  requesterName: string;
  requesterEmail: string;
  donorName?: string;
  donorEmail?: string;
}

// Status Badge Component
const getStatusBadge = (status: DonationStatus) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 dark:text-yellow-500">
          Pending
        </Badge>
      );
    case "inprogress":
      return (
        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-500">
          In Progress
        </Badge>
      );
    case "done":
      return (
        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-500">
          Done
        </Badge>
      );
    case "canceled":
      return (
        <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-500">
          Canceled
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const DashboardWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  //! Fetch user's donation requests (latest 3)
  const { data: allRequests = [], isLoading } = useQuery<DonationRequest[]>({
    queryKey: ["my-recent-requests", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/my-donation/${user?.email}/request`,
        {
          params: { requesterEmail: user?.email },
        }
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Get only the 3 most recent requests
  const recentRequests = allRequests.slice(0, 3);
  const hasRequests = recentRequests.length > 0;

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosSecure.delete(`/donation-request/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-recent-requests"] });
      toast.success("Donation request deleted successfully!");
      setDeleteDialogOpen(false);
      setRequestToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete donation request. Please try again.");
    },
  });

  // Update status mutation
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
      queryClient.invalidateQueries({ queryKey: ["my-recent-requests"] });
      toast.success("Status updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    },
  });

  // Handle Status Change
  const handleStatusChange = (id: string, newStatus: "done" | "canceled") => {
    updateStatusMutation.mutate({ id, status: newStatus });
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

  // Handle View Details
  const handleViewDetails = (id: string) => {
    navigate(`/donation-request/${id}`);
  };

  // Handle Edit
  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit-donation-request/${id}`);
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

  return (
    <div className="min-h-screen bg-background py-8 md:py-10">
      <Container>
        <div className="space-y-8 md:space-y-12">
          {/* Welcome Message */}
          <div className="pb-6 border-b border-border">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground flex items-center gap-3 flex-wrap">
              <Heart className="w-7 h-7 md:w-8 md:h-8 text-destructive shrink-0" />
              <span>Welcome back,</span>
              <span className="text-primary">{user?.displayName}!</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mt-2">
              Your latest donation requests and dashboard insights are here.
            </p>
          </div>

          {/* Recent Requests Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <History className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Your Recent Requests
                {hasRequests && (
                  <Badge variant="outline" className="ml-2">
                    {recentRequests.length}
                  </Badge>
                )}
              </h2>

              {hasRequests && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/dashboard/my-donation-requests")}
                  className="hidden md:flex items-center gap-2">
                  <List className="w-4 h-4" />
                  View All
                </Button>
              )}
            </div>

            {isLoading ? (
              <DashboardSpinner />
            ) : hasRequests ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-card rounded-lg border border-border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-bold text-primary">
                          Recipient
                        </TableHead>
                        <TableHead className="font-bold text-primary">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Location
                        </TableHead>
                        <TableHead className="font-bold text-primary text-center">
                          <HeartPulse className="w-4 h-4 inline mr-1" />
                          Blood
                        </TableHead>
                        <TableHead className="font-bold text-primary">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Date & Time
                        </TableHead>
                        <TableHead className="font-bold text-primary text-center">
                          Status
                        </TableHead>
                        <TableHead className="font-bold text-primary text-center">
                          Donor Info
                        </TableHead>
                        <TableHead className="font-bold text-primary text-center">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentRequests.map((req) => (
                        <TableRow key={req._id} className="hover:bg-muted/50">
                          <TableCell className="font-semibold">
                            {req.recipientName}
                          </TableCell>
                          <TableCell className="text-sm">
                            <div>{req.recipientUpazila}</div>
                            <div className="text-xs text-muted-foreground">
                              {req.recipientDistrict}
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-extrabold text-destructive">
                            {req.bloodGroup}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {formatDate(req.donationDate)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatTime(req.donationTime)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(req.donationStatus)}
                          </TableCell>
                          <TableCell className="text-center">
                            {req.donationStatus === "inprogress" &&
                            req.donorName ? (
                              <div className="text-xs">
                                <div className="font-medium text-blue-600">
                                  {req.donorName}
                                </div>
                                <div className="text-muted-foreground">
                                  {req.donorEmail}
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-xs">
                                -
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              {/* Done/Cancel buttons - only for inprogress */}
                              {req.donationStatus === "inprogress" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusChange(req._id, "done")
                                    }
                                    className="hover:bg-green-500/10 text-green-600"
                                    title="Mark as Done">
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleStatusChange(req._id, "canceled")
                                    }
                                    className="hover:bg-red-500/10 text-red-600"
                                    title="Cancel">
                                    <XCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              )}

                              {/* View button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetails(req._id)}
                                className="hover:bg-primary/10"
                                title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>

                              {/* Edit button - only for pending */}
                              {req.donationStatus === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(req._id)}
                                  className="hover:bg-blue-500/10 text-blue-600"
                                  title="Edit">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              )}

                              {/* Delete button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteClick(req._id)}
                                className="hover:bg-destructive/10 text-destructive"
                                title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {recentRequests.map((req) => (
                    <div
                      key={req._id}
                      className="bg-card border border-border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base">
                            {req.recipientName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {req.recipientUpazila}, {req.recipientDistrict}
                          </p>
                        </div>
                        <Badge className="bg-destructive/10 text-destructive">
                          {req.bloodGroup}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {formatDate(req.donationDate)} at{" "}
                          {formatTime(req.donationTime)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        {getStatusBadge(req.donationStatus)}

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(req._id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          {req.donationStatus === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(req._id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(req._id)}
                            className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button - Mobile */}
                <div className="md:hidden text-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard/my-donation-requests")}
                    className="w-full">
                    <List className="w-4 h-4 mr-2" />
                    View All My Requests
                  </Button>
                </div>
              </>
            ) : (
              // No Requests State
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <AlertCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No Donation Requests Yet
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  You haven't created any donation requests yet. Start by
                  creating your first request to help someone in need.
                </p>
                <Button
                  onClick={() => navigate("/dashboard/donation-requests")}
                  className="bg-linear-to-r from-primary to-destructive hover:from-primary/90 hover:to-destructive/90">
                  <Heart className="w-4 h-4 mr-2" />
                  Create Your First Request
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              donation request from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90">
              {deleteMutation.isPending ? "Deleting..." : "Yes, Delete Request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardWelcome;
