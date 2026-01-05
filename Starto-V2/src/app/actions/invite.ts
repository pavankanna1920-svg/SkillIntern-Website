"use server";

import { cookies } from "next/headers";

/**
 * Sets the invite code cookie.
 * This must be a Server Action to run on the server but be callable from Client Components.
 */
export async function setInviteCookie(code: string) {
    if (!code) return;

    // Use await cookies() for compatibility with latest Next.js versions
    const cookieStore = await cookies();

    // Check if cookie is already set to avoid unnecessary sets (optional but good)
    const existing = cookieStore.get("starto_invite_code");
    if (existing?.value === code) return;

    cookieStore.set("starto_invite_code", code, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        path: "/",
        sameSite: "lax",
    });
}
