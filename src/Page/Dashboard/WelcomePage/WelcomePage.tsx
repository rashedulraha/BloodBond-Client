import React, { useState } from "react";
import {
  Heart,
  Send,
  History,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Eye,
  List,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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

// --- [ Import Mock Data & Types ] ---
// Assuming the data structure above is available
const loggedInUser = {
  name: "Rashedul Islam",
  email: "rashedulk@example.com",
  id: "user123",
};
const mockRequests = [
  {
    id: "req001",
    recipientName: "Farah Begum",
    district: "Dhaka",
    upazila: "Mirpur",
    donationDate: "2025-12-20",
    donationTime: "11:00 AM",
    bloodGroup: "O+",
    status: "inprogress",
    donorInfo: { name: "Volunteer Z", email: "z@volunteer.org" },
  },
  {
    id: "req002",
    recipientName: "Rahim Mia",
    district: "Khulna",
    upazila: "Sadar",
    donationDate: "2025-12-18",
    donationTime: "04:30 PM",
    bloodGroup: "A-",
    status: "pending",
  },
  {
    id: "req003",
    recipientName: "Sadia Afroz",
    district: "Chattogram",
    upazila: "Agrabad",
    donationDate: "2025-12-15",
    donationTime: "09:00 AM",
    bloodGroup: "B+",
    status: "done",
    donorInfo: { name: "Volunteer X", email: "x@volunteer.org" },
  },
] as const;

type DonationStatus = "pending" | "inprogress" | "done" | "canceled";
interface DonationRequest {
  id: string;
  recipientName: string;
  district: string;
  upazila: string;
  donationDate: string;
  donationTime: string;
  bloodGroup: string;
  status: DonationStatus;
  donorInfo?: { name: string; email: string };
}
// --- [ End Mock Data ] ---

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<DonationRequest[]>([
    ...mockRequests,
  ]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  // Filter to show maximum 3 recent requests
  const recentRequests = requests.slice(0, 3);
  const hasRequests = recentRequests.length > 0;

  // --- [ State Management Logic (Done/Cancel) ] ---
  const handleStatusChange = (id: string, newStatus: "done" | "canceled") => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    console.log(`Request ${id} status changed to: ${newStatus}`);
  };

  // --- [ Delete Logic ] ---
  const confirmDelete = (id: string) => {
    setRequestToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (requestToDelete) {
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== requestToDelete)
      );
      console.log(`Request ${requestToDelete} deleted.`);
      setRequestToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // --- [ Helper: Status Badge ] ---
  const getStatusBadge = (status: DonationStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-600">
            Pending
          </Badge>
        );
      case "inprogress":
        return (
          <Badge className="bg-blue-500/20 text-blue-600 hover:bg-blue-500/30">
            In Progress
          </Badge>
        );
      case "done":
        return (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
            Done
          </Badge>
        );
      case "canceled":
        return <Badge variant="destructive">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-background min-h-screen">
      <div className="mx-auto space-y-12">
        {/* --- [ 1. Welcome Message ] --- */}
        <div className="pb-6 border-b border-border" data-aos="fade-right">
          <h1 className="text-4xl font-extrabold text-foreground flex items-center">
            <Heart className="w-8 h-8 mr-3 text-destructive" /> Welcome back,{" "}
            <span className="text-primary ml-2">{loggedInUser.name}!</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            Your latest donation requests and dashboard insights are here.
          </p>
        </div>

        {/* --- [ 2. Recent Requests Section ] --- */}
        <div data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <History className="w-5 h-5 mr-2 text-primary" /> Your Recent
            Requests ({recentRequests.length})
          </h2>

          {hasRequests ? (
            <div className="bg-card rounded-md border border-border overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-center">Blood</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Donor Info</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-semibold">
                        {req.recipientName}
                      </TableCell>
                      <TableCell className="text-sm">
                        <MapPin className="w-4 h-4 inline mr-1 text-primary/70" />{" "}
                        {req.upazila}, {req.district}
                      </TableCell>
                      <TableCell className="text-center font-extrabold text-destructive">
                        {req.bloodGroup}
                      </TableCell>
                      <TableCell className="text-sm">
                        {req.donationDate} @ {req.donationTime}
                      </TableCell>

                      {/* Status Cell */}
                      <TableCell>{getStatusBadge(req.status)}</TableCell>

                      {/* Donor Info Cell */}
                      <TableCell className="text-sm">
                        {req.donorInfo ? (
                          <span className="text-blue-600 font-medium">
                            {req.donorInfo.name}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>

                      {/* Action Buttons Cell (Dynamic) */}
                      <TableCell className="space-x-2 whitespace-nowrap text-center">
                        {/* Status Change Buttons (Shown ONLY when In Progress) */}
                        {req.status === "inprogress" && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                handleStatusChange(req.id, "done")
                              }>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(req.id, "canceled")
                              }>
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}

                        {/* Edit Button (Link to Edit Page) */}
                        <Button
                          variant="outline"
                          size="sm"
                          title="Edit Request"
                          onClick={() =>
                            navigate(`/dashboard/edit-request/${req.id}`)
                          }>
                          <Edit className="w-4 h-4" />
                        </Button>

                        {/* Delete Button (Confirmation Modal) */}
                        <Button
                          variant="destructive"
                          size="sm"
                          title="Delete Request"
                          onClick={() => confirmDelete(req.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        {/* View Button (Link to Details Page) */}
                        <Button
                          variant="secondary"
                          size="sm"
                          title="View Details"
                          onClick={() =>
                            navigate(`/dashboard/request-details/${req.id}`)
                          }>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            // Hidden if no request has been made (Requirement met)
            <div className="text-center p-10 bg-secondary/30 rounded-xl border border-secondary/50">
              <Send className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                You have not created any donation requests yet.
                <Link
                  to="/dashboard/create-donation-request"
                  className="text-primary hover:underline ml-1">
                  Create your first request now.
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* --- [ 3. View All Requests Button ] --- */}
        {hasRequests && (
          <div
            className="text-center pt-4"
            data-aos="fade-up"
            data-aos-delay="300">
            <Link to="/dashboard/my-requests">
              <Button
                variant="outline"
                className="text-base font-semibold rounded shadow-md hover:bg-primary/10">
                <List className="w-5 h-5 mr-2" /> View My All Requests
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* --- [ Delete Confirmation Modal ] --- */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              donation request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-red-700">
              Yes, Delete Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WelcomePage;
