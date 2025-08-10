import type { Metadata } from "next";
import { BaseFooter } from "@/components/Footer";

export const metadata: Metadata = {
  title: "In Progress Applications",
  description: "View your applications that are in progress",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-white">
      {children}
      <BaseFooter />
    </div>
  );
}
