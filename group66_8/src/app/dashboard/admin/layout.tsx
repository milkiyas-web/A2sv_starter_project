import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers/AuthProvider";
import { StateProvider } from "@/providers/StateProvider";
import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/sonner";
import AdminNav from "@/components/AdminNav";


export const metadata = { title: "Admin Page" }


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className="bg-gray-100"
            >
                <AdminNav />
                {children}
            </body>
        </html>
    );
}
