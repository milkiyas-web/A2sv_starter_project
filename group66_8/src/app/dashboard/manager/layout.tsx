import type { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Manager Dashboard",
  description: "Manage applications and performance metrics",
};

export default function ReviewerLayout({ children }: Props) {
  return <div className="min-h-screen bg-gray-50 p-6">{children}</div>;
}
