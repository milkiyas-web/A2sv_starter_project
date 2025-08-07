"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Application {
  application_id: string;
  applicant_name: string;
  status: string;
  submission_date: string;
  school: string;
}

export default function ReviewerDashboard() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "pending" | "complete">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const itemsPerPage = 3;

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://a2sv-application-platform-backend-team8.onrender.com/reviews/assigned/?page=${currentPage}&limit=${itemsPerPage}&status=${filter}&sort=${sortOrder}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await res.json();
      if (data.success) {
        setApplications(data.data.reviews);
        setTotalCount(data.data.total_count);
        setTotalPages(Math.ceil(data.data.total_count / itemsPerPage));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchApplications();
    }
  }, [currentPage, filter, sortOrder, session?.accessToken]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        1
      </Button>
    );

    // Show ellipsis if current page is beyond first few pages
    if (currentPage > maxVisiblePages + 1) {
      pages.push(
        <span key="ellipsis-start" className="flex items-center px-2">
          ...
        </span>
      );
    }

    // Show current page and adjacent pages
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Show ellipsis if current page is not near the end
    if (currentPage < totalPages - maxVisiblePages) {
      pages.push(
        <span key="ellipsis-end" className="flex items-center px-2">
          ...
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Assigned Applications</h1>
        <p className="text-muted-foreground mt-2">
          Showing {applications.length} of {totalCount} applications
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "secondary"}
              className={
                filter === "all"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
              size="sm"
              onClick={() => {
                setFilter("all");
                setCurrentPage(1);
              }}
            >
              All
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "secondary"}
              className={
                filter === "pending"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
              size="sm"
              onClick={() => {
                setFilter("pending");
                setCurrentPage(1);
              }}
            >
              Under Review
            </Button>
            <Button
              variant={filter === "complete" ? "default" : "secondary"}
              className={
                filter === "complete"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : ""
              }
              size="sm"
              onClick={() => {
                setFilter("complete");
                setCurrentPage(1);
              }}
            >
              Complete
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest");
                setCurrentPage(1);
              }}
            >
              Sort by Submission Date {sortOrder === "newest" ? "↓" : "↑"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {applications.map((app) => (
          <Card
            key={app.application_id}
            className="p-4 hover:shadow-md transition-shadow"
          >
            <div className="justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar name={app.applicant_name} size="sm" />
                <div>
                  <h3 className="font-medium">{app.applicant_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Submitted:{" "}
                    {new Date(app.submission_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Badge
                  variant={
                    app.status.toLowerCase() === "complete"
                      ? "success"
                      : app.status.toLowerCase().includes("update") ||
                        app.status.toLowerCase().includes("pending")
                      ? "warning"
                      : "default"
                  }
                >
                  {app.status}
                </Badge>
              </div>
              <Card className="border-0 shadow-none bg-gray-50 mt-4">
                <div>
                  <Link href={`/dashboard/reviewer/${app.application_id}`}>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-blue-500 text-white hover:bg-blue-600 w-full hover:cursor-pointer"
                    >
                      {app.status.toLowerCase() === "complete"
                        ? "View"
                        : app.status.toLowerCase().includes("update")
                        ? "Update"
                        : "Review"}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>

          {renderPageNumbers()}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
