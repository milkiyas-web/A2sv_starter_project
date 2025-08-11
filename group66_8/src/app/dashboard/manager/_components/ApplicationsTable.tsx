"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { toast } from "sonner";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import ApplicantDetailsReview from "./Review";
import { toast } from "sonner";

interface Application {
  id: string;
  applicant_name: string;
  status: string;
  assigned_reviewer_name: string | null;
  submitted_at?: string;
}

interface Reviewer {
  id: string;
  full_name: string;
  email: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  reviewers: Reviewer[];
  onAssignReviewer: (applicationId: string, reviewerId: string) => void;
  fetchApplicationDetails: (id: string) => Promise<any>;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  reviewersPagination: {
    page: number;
    limit: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  onReviewersPageChange: (page: number) => void;
  onStatusChange: () => void;
}

export default function ApplicationsTable({
  applications,
  reviewers,
  onAssignReviewer,
  fetchApplicationDetails,
  pagination,
  reviewersPagination,
  onPageChange,
  onReviewersPageChange,
  onStatusChange,
}: ApplicationsTableProps) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoadingReviewers, setIsLoadingReviewers] = useState(false);
  const [showReviewerSubmenu, setShowReviewerSubmenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const assignReviewerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredReviewers = reviewers.filter((reviewer) =>
    reviewer.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (
    applicationId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (openMenuId === applicationId) {
      setOpenMenuId(null);
      setShowReviewerSubmenu(false);
      setMenuPosition(null);
      setSubmenuPosition(null);
    } else {
      setOpenMenuId(applicationId);
      setShowReviewerSubmenu(false);
      const buttonRect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.top,
        right: window.innerWidth - buttonRect.right,
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      (!subMenuRef.current ||
        !subMenuRef.current.contains(event.target as Node)) &&
      (!assignReviewerRef.current ||
        !assignReviewerRef.current.contains(event.target as Node)) &&
      (!buttonRef.current || !buttonRef.current.contains(event.target as Node))
    ) {
      setOpenMenuId(null);
      setShowReviewerSubmenu(false);
      setMenuPosition(null);
      setSubmenuPosition(null);
    }
  };

  const handleViewDetails = async (application: Application) => {
    try {
      if (!application || !application?.id) {
        throw new Error("Invalid application data");
      }

      if (!session?.user) {
        await signIn();
        return;
      }

      const details = await fetchApplicationDetails(application?.id);

      if (!details) {
        throw new Error("Failed to fetch application details");
      }

      setSelectedApp({
        id: application.id,
        applicant_details: details.applicant_details,
        review_details: details.review_details,
        assigned_reviewer_name: application.assigned_reviewer_name,
      });
      setShowDetailsModal(true);
      setOpenMenuId(null);
      setMenuPosition(null);
    } catch (err) {
      console.error("Error in handleViewDetails:", err);

      toast.error( "Failed to load details")
    }
  };

  const handleViewReview = async (application: Application) => {
    try {
      if (!application || !application?.id) {
        throw new Error("Invalid application data");
      }

      if (!session?.user) {
        await signIn();
        return;
      }

      const details = await fetchApplicationDetails(application?.id);

      if (!details) {
        throw new Error("Failed to fetch review details");
      }

      setSelectedApp({
        id: application.id,
        applicant_details: details?.applicant_details,
        review_details: details?.review_details,
        assigned_reviewer_name: application.assigned_reviewer_name, // ✅ comma fixed
      });
      setShowReviewModal(true);
      setOpenMenuId(null);
      setMenuPosition(null);
    } catch (err) {
      console.error("Error in handleViewReview:", err);
      toast.error("error")
      toast.error("Failed to load review")
      
    }
  };

  const loadMoreReviewers = async () => {
    if (reviewers.length >= reviewersPagination.total) return;

    try {
      setIsLoadingReviewers(true);
      await onReviewersPageChange(reviewersPagination.page + 1);
    } catch (error: any) {
      toast.error("Failed to load more reviewers")
    } finally {
      setIsLoadingReviewers(false);
    }
  };

  const handleAssignReviewerHover = () => {
    if (assignReviewerRef.current) {
      const rect = assignReviewerRef.current.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top + rect.height / 2,
        left: rect.right,
      });
      setShowReviewerSubmenu(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 bg-gray-100 rounded-t-lg">
            <TableHead className="font-semibold text-gray-700 rounded-tl-lg text-left">
              APPLICANT
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-left">
              SUBMITTED
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-left">
              ASSIGNED REVIEWER
            </TableHead>
            <TableHead className="font-semibold text-gray-700 text-left">
              STATUS
            </TableHead>
            <TableHead className="text-right rounded-tr-lg">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id} className="border-b border-gray-100">
              <TableCell className="font-medium text-left">
                {application.applicant_name}
              </TableCell>
              <TableCell className="text-gray-600 text-left">
                {application.submitted_at
                  ? new Date(application.submitted_at).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell className="text-left">
                {application.assigned_reviewer_name ? (
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                    {application.assigned_reviewer_name}
                  </span>
                ) : (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                    Not Assigned
                  </span>
                )}
              </TableCell>
              <TableCell className="text-left">
                <span
                  className={`px-2 py-1 rounded text-sm capitalize ${application.status === "pending review"
                    ? "bg-green-50 text-green-700"
                    : application.status === "interview"
                      ? "bg-yellow-50 text-yellow-700"
                      : application.status === "Accepted"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {application.status.replace("_", " ")}
                </span>
              </TableCell>
              <TableCell className="text-right relative">
                <Button
                  ref={buttonRef}
                  variant="ghost"
                  className="h-8 px-3 py-1 text-blue-600 text-sm flex items-center gap-1"
                  onClick={(e) => toggleMenu(application.id, e)}
                >
                  Actions <ChevronDown className="h-3 w-3" />
                </Button>

                {openMenuId === application.id && menuPosition && (
                  <div
                    ref={menuRef}
                    className="fixed bg-white rounded-md shadow-lg z-[1000] border border-gray-200 w-48"
                    style={{
                      top: `${menuPosition.top}px`,
                      right: `${menuPosition.right}px`,
                    }}
                  >
                    <div className="py-1">
                      <div
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewReview(application);
                        }}
                      >
                        Review
                      </div>
                      <div
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(application);
                        }}
                      >
                        View Details
                      </div>
                      <div className="w-full border-t border-gray-200"></div>

                      <div
                        ref={assignReviewerRef}
                        className="relative"
                        onMouseEnter={handleAssignReviewerHover}
                        onMouseLeave={() =>
                          setTimeout(() => setShowReviewerSubmenu(false), 200)
                        }
                      >
                        <div className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-start">
                          Assign Reviewer
                        </div>
                        {showReviewerSubmenu && submenuPosition && (
                          <div
                            ref={subMenuRef}
                            className="fixed bg-white rounded-md shadow-lg z-[1001] border border-gray-200 w-64"
                            style={{
                              top: `${submenuPosition.top}px`,
                              left: `${submenuPosition.left}px`,
                            }}
                          >
                            <div className="px-2 py-1 relative">
                              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search reviewers..."
                                className="w-full pl-8 pr-2 py-1 text-sm border rounded"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                              {filteredReviewers.map((reviewer) => (
                                <div
                                  key={reviewer.id}
                                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-start"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAssignReviewer(
                                      application.id,
                                      reviewer.id
                                    );
                                    setSearchTerm("");
                                    setOpenMenuId(null);
                                    setShowReviewerSubmenu(false);
                                    setMenuPosition(null);
                                    setSubmenuPosition(null);
                                    onStatusChange();
                                  }}
                                >
                                  {reviewer.full_name}
                                </div>
                              ))}
                              {reviewers.length < reviewersPagination.total && (
                                <div
                                  className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer text-center flex justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    loadMoreReviewers();
                                  }}
                                >
                                  {isLoadingReviewers ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <span>Load More</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm text-gray-700">
            Showing {applications.length} of {pagination.total} applications
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={
              applications.length < pagination.limit ||
              applications.length >= pagination.total
            }
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {showReviewModal && selectedApp && (
        <ApplicantDetailsReview
          applicant={selectedApp.applicant_details}
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {showDetailsModal && selectedApp && (
        <ApplicationDetailsModal
          application={selectedApp}
          onClose={() => setShowDetailsModal(false)}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
}
