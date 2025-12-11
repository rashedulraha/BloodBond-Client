import React, { useState, useEffect, useMemo } from "react";
import {
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


import type { DonationRequest } from "@/types/donation";
import mockDonations from "@/Data/MockDonations/MockDonations";

// Constants for Pagination
const ITEMS_PER_PAGE = 5;
const STATUS_FILTERS: (DonationStatus | "all")[] = [
  "all",
  "pending",
  "inprogress",
  "done",
  "canceled",
];

// Helper function to get status badge color
const getStatusBadge = (status: DonationStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "inprogress":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "done":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "canceled":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-400";
  }
};

const MyDonationRequests: React.FC = () => {
  const navigate = useNavigate();
  const [allRequests, setAllRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<DonationStatus | "all">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  // --- [ Data Fetching Simulation ] ---
  useEffect(() => {
    //  Replace with your actual API call to fetch all requests made by the logged-in user
    setLoading(true);
    setTimeout(() => {
      // Filter mock data based on the logged-in user's email (simulated)
      const userEmail = "user@example.com";
      const userRequests = mockDonations.filter(
        (req) => req.requesterEmail === userEmail
      );
      setAllRequests(userRequests);
      setLoading(false);
    }, 1000);
  }, []);

  // --- [ Filtering Logic ] ---
  const filteredRequests = useMemo(() => {
    // eslint-disable-next-line react-hooks/set-state-in-render
    setCurrentPage(1); // Reset to first page on filter change
    if (filterStatus === "all") {
      return allRequests;
    }
    return allRequests.filter((req) => req.donationStatus === filterStatus);
  }, [allRequests, filterStatus]);

  // --- [ Pagination Logic ] ---
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, currentPage]);

  // --- [ Action Handlers ] ---
  const handleStatusUpdate = (id: string, newStatus: "done" | "canceled") => {
    if (
      window.confirm(
        `Are you sure you want to mark this request as ${newStatus}?`
      )
    ) {
      // ⚠️ API Call to update status
      console.log(`Updating request ${id} to ${newStatus}`);
      setAllRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, donationStatus: newStatus } : req
        )
      );
      // Optional: Show success toast
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      // ⚠️ API Call to delete request
      console.log(`Deleting request ${id}`);
      setAllRequests((prev) => prev.filter((req) => req.id !== id));
      // Optional: Show success toast
    }
  };

  const renderActions = (request: DonationRequest) => {
    return (
      <div className="flex space-x-2 justify-end">
        {/* View Details Button (Redirects to private details page) */}
        <button
          onClick={() => navigate(`/donation-request-details/${request.id}`)}
          className="btn btn-sm btn-secondary tooltip"
          data-tip="View Details">
          <Eye className="w-4 h-4" />
        </button>

        {/* Edit & Delete Buttons (Visible ONLY if status is PENDING) */}
        {request.donationStatus === "pending" && (
          <>
            <button
              onClick={() => navigate(`/dashboard/edit-request/${request.id}`)}
              className="btn btn-sm btn-secondary tooltip"
              data-tip="Edit Request">
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(request.id)}
              className="btn btn-sm btn-destructive/80 hover:btn-destructive tooltip"
              data-tip="Delete Request">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Done & Cancel Buttons (Visible ONLY if status is IN PROGRESS) */}
        {request.donationStatus === "inprogress" && (
          <>
            <button
              onClick={() => handleStatusUpdate(request.id, "done")}
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white tooltip"
              data-tip="Mark as Done">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStatusUpdate(request.id, "canceled")}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white tooltip"
              data-tip="Cancel Request">
              <XCircle className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen-75 text-primary">
        <Loader2 className="w-8 h-8 animate-spin mr-2" /> Loading Requests...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-background min-h-screen">
      <div className="max-w-full mx-auto">
        <div className="mb-8 border-b pb-4 border-border">
          <h2 className="text-4xl font-extrabold text-primary">
            My Donation Requests
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage all the blood requests you have created.
          </p>
        </div>

        {/* --- [ Filtering and Counter ] --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 bg-card rounded-lg border border-border shadow-lg">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Filter className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              Filter by Status:
            </span>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as DonationStatus | "all")
              }
              className="select select-bordered select-sm bg-input/20 border-border">
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {paginatedRequests.length} of {filteredRequests.length}{" "}
            total results.
          </p>
        </div>

        {/* --- [ Table View ] --- */}
        <div className="overflow-x-auto bg-card rounded-xl shadow-2xl border border-border">
          <table className="table w-full text-foreground">
            <thead>
              <tr className="text-sm uppercase text-primary-foreground bg-primary/80">
                <th>Recipient</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-lg text-muted-foreground">
                    No donation requests found under this status.
                  </td>
                </tr>
              ) : (
                paginatedRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-accent/30 border-b border-border">
                    <td className="font-semibold">{request.recipientName}</td>
                    <td>
                      {request.recipientUpazila}, {request.recipientDistrict}
                    </td>
                    <td>
                      {request.donationDate} at {request.donationTime}
                    </td>
                    <td className="font-bold text-destructive">
                      {request.bloodGroup}
                    </td>
                    <td>
                      <span
                        className={`badge ${getStatusBadge(
                          request.donationStatus
                        )} font-medium`}>
                        {request.donationStatus.charAt(0).toUpperCase() +
                          request.donationStatus.slice(1)}
                      </span>
                    </td>
                    <td>
                      {request.donationStatus === "inprogress" ? (
                        <div className="text-xs">
                          <p className="font-medium text-foreground">
                            {request.donorName}
                          </p>
                          <p className="text-muted-foreground">
                            {request.donorEmail}
                          </p>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{renderActions(request)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- [ Pagination Controls ] --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="btn btn-secondary btn-sm">
              Previous
            </button>
            <span className="text-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || loading}
              className="btn btn-secondary btn-sm">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonationRequests;
