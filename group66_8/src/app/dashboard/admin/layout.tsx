import AdminNav from "@/components/AdminNav";
import { BaseFooter } from "@/components/Footer";


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
                <BaseFooter />
            </body>
        </html>
    );
}
