import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Recover your account access",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}