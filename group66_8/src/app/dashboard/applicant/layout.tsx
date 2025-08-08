import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applicant Dashboard",
  description: "View your applications that are in progress",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-white">{children}</div>;
}
