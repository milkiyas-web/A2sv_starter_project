import dynamic from "next/dynamic";
import { Suspense } from "react";

const ResetPasswordClient = dynamic(() => import("./ResetPasswordClient"),{ssr:true});

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordClient />
        </Suspense>
    );
}
