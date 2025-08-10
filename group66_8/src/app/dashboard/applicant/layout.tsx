import AdminNav from "@/components/AdminNav";
import ApplicantNav from "@/components/ApplicantNav";
import { BaseFooter } from "@/components/Footer";


export const metadata = { title: "Applicant Page" }


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
        <ApplicantNav />
        {children}
        <BaseFooter />
      </body>
    </html>
  );
}
