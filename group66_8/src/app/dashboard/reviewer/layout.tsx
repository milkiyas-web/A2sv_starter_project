import ApplicantNav from "@/components/ApplicantNav";
import { BaseFooter } from "@/components/Footer";
import ManagerNav from "@/components/ManagerNav";
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
        <ManagerNav />
        {children}
        <BaseFooter />
      </body>
    </html>
  );
}

