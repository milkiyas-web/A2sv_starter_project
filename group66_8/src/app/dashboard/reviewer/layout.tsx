// app/dashboard/reviewer/layout.tsx
import type { ReactNode } from "react";
import { Toaster } from "sonner";

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: "Reviewer Dashboard",
  description: "Manage and review assigned applications",
};

export default function ReviewerLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster richColors position="top-right" />
      {children}
    </div>
  );
}
