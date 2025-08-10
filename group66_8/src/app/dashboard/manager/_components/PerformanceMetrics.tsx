"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Reviewer = {
  id: string;
  full_name: string;
  email: string;
};

type ReviewersProps = {
  reviewers: Reviewer[];
};

export default function PerformanceMetrics({ reviewers }: ReviewersProps) {
  const topReviewers = reviewers.slice(0, 2);

  return (
    <Card className="border-0 bg-white shadow-sm h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Team Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topReviewers.length > 0 ? (
          topReviewers.map((reviewer) => (
            <div key={reviewer.id}>
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{reviewer.full_name}</h4>
                <p className="text-sm text-gray-600">4 Reviews</p>
              </div>
              <p className="text-sm text-gray-600">
                Assigned: 3 / Avg. 2.5 per day{" "}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No reviewers assigned yet</p>
        )}
      </CardContent>
    </Card>
  );
}
