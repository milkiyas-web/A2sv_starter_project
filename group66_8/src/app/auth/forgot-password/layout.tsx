import type { Metadata } from "next";
import ForgotPasswordNav from "@/components/ForgotPasswordNav";
import { BaseFooter } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Recover your account access",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <ForgotPasswordNav />
      <main className="">{children}</main>
      <BaseFooter />
    </div>
  );
}