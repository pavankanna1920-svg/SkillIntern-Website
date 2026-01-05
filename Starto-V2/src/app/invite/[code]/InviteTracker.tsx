"use client";

import { useEffect } from "react";
import { setInviteCookie } from "@/app/actions/invite";

export default function InviteTracker({ code }: { code: string }) {
    useEffect(() => {
        if (code) {
            setInviteCookie(code);
        }
    }, [code]);

    return null; // This component renders nothing
}
