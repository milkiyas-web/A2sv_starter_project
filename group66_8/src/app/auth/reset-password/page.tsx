import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const ResetPasswordClient = dynamic(() => import("./ResetPasswordClient"), { ssr: true });

export default function ResetPassword() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#4F46E5]" /></div>}>
            <ResetPasswordClient />
        </Suspense>
    );
}
