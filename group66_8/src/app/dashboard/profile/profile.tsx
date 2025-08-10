import AdminNav from "@/components/AdminNav";
import ApplicantNav from "@/components/ApplicantNav";


export const metadata = { title: "Profile Page" }


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
            </body>
        </html>
    );
}
