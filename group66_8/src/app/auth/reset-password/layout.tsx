import type { Metadata } from "next";
import ForgotPasswordNav from "@/components/ForgotPasswordNav";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <ForgotPasswordNav />
      <main className="">{children}</main>
    </div>
  );
}