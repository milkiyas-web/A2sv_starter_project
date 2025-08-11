import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers/AuthProvider";
import { StateProvider } from "@/providers/StateProvider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";


const inter = Inter({
  variable: "--font-inter-technology",
  subsets: ["latin"]
})
export const metadata: Metadata = {
  title: "Application website",
  description: "A2SV application website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-gray-100`}
      >
        {/* <ToastProvider> */}
        <Provider>
          <StateProvider>
            {children}
          </StateProvider>
        </Provider>
        {/* </ToastProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
