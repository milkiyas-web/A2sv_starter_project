// src/app/auth/signup/layout.tsx
import type { Metadata } from "next";
import SignupNav from "@/components/SignupNav";
import { BaseFooter } from "@/components/Footer";

export const metadata: Metadata = {
  title: "A2SV - Sign Up",
  description: "Create a new applicant account",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100">
      <SignupNav />
      <main>{children}</main>
      <BaseFooter />
    </div>
  );
}
