"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApplicantDetails {
  id: string;
  applicant_name: string;
  status: string;
  school: string;
  student_id: string;
  leetcode_handle: string;
  codeforces_handle: string;
  github_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
}

interface ReviewDetails {
  id: string;
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes: string;
}

export default function ReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [applicant, setApplicant] = useState<ApplicantDetails | null>(null);
  const [review, setReview] = useState<ReviewDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    activity_check_notes: "",
    resume_score: 0,
    essay_why_a2sv_score: 0,
    essay_about_you_score: 0,
    technical_interview_score: 0,
    behavioral_interview_score: 0,
    interview_notes: "",
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://a2sv-application-platform-backend-team8.onrender.com/reviews/${params.id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch application");
        }

        const data = await res.json();
        if (data.success) {
          setApplicant(data.data.applicant_details);
          setReview(data.data.review_details);
          setFormData({
            activity_check_notes:
              data.data.review_details.activity_check_notes || "",
            resume_score: data.data.review_details.resume_score || 0,
            essay_why_a2sv_score:
              data.data.review_details.essay_why_a2sv_score || 0,
            essay_about_you_score:
              data.data.review_details.essay_about_you_score || 0,
            technical_interview_score:
              data.data.review_details.technical_interview_score || 0,
            behavioral_interview_score:
              data.data.review_details.behavioral_interview_score || 0,
            interview_notes: data.data.review_details.interview_notes || "",
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchApplication();
    }
  }, [params.id, session?.accessToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("score") ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://a2sv-application-platform-backend-team8.onrender.com/reviews/${params.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update review");
      }

      const data = await res.json();
      if (data.success) {
        toast.success("Review updated successfully");
        router.refresh();
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update review"
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">Error: {error}</p>
        <Link href="/dashboard/reviewer">
          <Button variant="outline" className="mt-4">
            Back to Applications
          </Button>
        </Link>
      </div>
    );
  }

  if (!applicant || !review) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Application not found</p>
        <Link href="/dashboard/reviewer">
          <Button variant="outline" className="mt-4">
            Back to Applications
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 text-2xl">
            {applicant.applicant_name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </Avatar>
          <div>
            <Link href="/dashboard/reviewer">
              <Button
                variant="outline"
                className="border-0 shadow-none hover:cursor-pointer"
              >
                Back to Applications
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold mt-2">
              Review: {applicant.applicant_name}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Applicant Profile</h2>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500 text-md">School</Label>
                  <p>{applicant.school}</p>
                </div>
                <div>
                  <Label className="text-gray-500 text-md">Student ID</Label>
                  <p>{applicant.student_id || "Not provided"}</p>
                </div>
              </div>
              <div className="mt-4">
                <Label className="text-gray-500 text-md">Coding Profiles</Label>
                <div className="flex gap-4 mt-1">
                  <span className="text-blue-700 hover:cursor-pointer">
                    LeetCode: {applicant.leetcode_handle || "N/A"}
                  </span>
                  <span className="text-blue-700 hover:cursor-pointer">
                    Codeforces: {applicant.codeforces_handle || "N/A"}
                  </span>
                  <span className="text-blue-700 hover:cursor-pointer">
                    GitHub: {applicant.github_handle || "N/A"}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-md text-gray-400 p-1">
                  Essay 1: Tell us about yourself?
                </h2>
                <p>{applicant.essay_about_you}</p>
              </div>

              <div className="mt-4">
                <h2 className="text-md text-gray-400 p-1">
                  Essay 2: Why do you want to Join us?
                </h2>
                <p>{applicant.essay_why_a2sv}</p>
              </div>

              <div className="mt-4">
                <h2 className="text-md text-gray-400 mb-4">Resume</h2>
                <Link
                  className="text-blue-700"
                  href={applicant.resume_url}
                  target="_blank"
                >
                  View Resume.pdf
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Evaluation Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="activity_check_notes">
                  Activity Check Notes
                </Label>
                <Input
                  id="activity_check_notes"
                  name="activity_check_notes"
                  value={formData.activity_check_notes}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resume_score">Resume Score</Label>
                  <Input
                    id="resume_score"
                    name="resume_score"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.resume_score}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="essay_about_you_score">Essay Score</Label>
                  <Input
                    id="essay_about_you_score"
                    name="essay_about_you_score"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.essay_about_you_score}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Save & Submit Review
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
