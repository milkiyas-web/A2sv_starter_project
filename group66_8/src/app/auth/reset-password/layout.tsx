import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}