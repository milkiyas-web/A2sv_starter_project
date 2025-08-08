import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/providers/AuthProvider";
import { StateProvider } from "@/providers/StateProvider";
import { ToastProvider } from "@/components/ui/use-toast";


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
        className="bg-gray-100"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
        <Provider>
          <StateProvider>
            {children}
          </StateProvider>
        </Provider>
        </ToastProvider>
      </body>
    </html>
  );
}
