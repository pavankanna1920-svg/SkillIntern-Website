
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { responseId } = await req.json();

        if (!responseId) {
            return NextResponse.json({ error: "Response ID required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Find the response and ensure I own the help request
        const helpResponse = await prisma.helpResponse.findUnique({
            where: { id: responseId },
            include: { helpRequest: true, helper: true }
        });

        if (!helpResponse) {
            return NextResponse.json({ error: "Response not found" }, { status: 404 });
        }

        if (helpResponse.helpRequest.userId !== user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Update Response Status
        await prisma.helpResponse.update({
            where: { id: responseId },
            data: { status: "ACCEPTED" }
        });

        // CRITICAL: Mark the Help Request as RESOLVED instantly to close the loop (expire it)
        await prisma.helpRequest.update({
            where: { id: helpResponse.helpRequestId },
            data: { status: "RESOLVED" }
        });

        const helper = await prisma.user.findUnique({
            where: { id: helpResponse.helperId },
            select: { phoneNumber: true, name: true }
        });

        // Generate WhatsApp Link
        let whatsappLink = null;
        if (helper?.phoneNumber) {
            // Clean phone number (remove +, spaces) if needed, but usually wa.me handles it if standard format
            const cleanPhone = helper.phoneNumber.replace(/[^\d]/g, '');
            const text = encodeURIComponent(`Hi ${helper.name || 'there'}, I accepted your help offer on Starto!`);
            whatsappLink = `https://wa.me/${cleanPhone}?text=${text}`;
        }

        // Return the link. If no phone, frontend handles fallback (maybe show email or just "Connected")
        return NextResponse.json({ success: true, whatsappLink, helperPhone: helper?.phoneNumber });

    } catch (error) {
        console.error("ACCEPT_HELP_ERROR", error);
        return NextResponse.json({ error: "Failed to accept help" }, { status: 500 });
    }
}
