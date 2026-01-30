import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { needId } = await req.json();

        if (!needId) {
            return NextResponse.json({ error: "Missing needId" }, { status: 400 });
        }

        const fromUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!fromUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const need = await prisma.needHelp.findUnique({
            where: { id: needId },
            include: { founder: true },
        });

        if (!need || !need.founder) {
            return NextResponse.json({ error: "Need not found" }, { status: 404 });
        }

        if (need.founderId === fromUser.id) {
            return NextResponse.json({ error: "Cannot respond to your own need" }, { status: 400 });
        }

        // Check if connection request already exists
        const existingRequest = await prisma.connectionRequest.findUnique({
            where: {
                fromUserId_toUserId: {
                    fromUserId: fromUser.id,
                    toUserId: need.founderId,
                }
            }
        });

        if (existingRequest) {
            return NextResponse.json({ error: "Connection request already sent", status: existingRequest.status }, { status: 409 });
        }

        // CREATE CONNECTION using Layer 0 Logic
        // Source: INSTANT_HELP
        const connectionRequest = await prisma.connectionRequest.create({
            data: {
                fromUserId: fromUser.id,
                toUserId: need.founderId,
                source: "INSTANT_HELP",
                status: "PENDING",
                senderName: fromUser.name || "Anonymous",
                senderRole: fromUser.activeRole || "HELPER", // Backup role
                purpose: `I can help with ${need.category}`,
                message: `I saw your need for ${need.category} (Urgency: ${need.urgency}) and I can help.`,
            },
        });

        // TODO: Trigger Notification (if not handled by DB triggers/hooks)
        // Assuming Notification creation is handled elsewhere or we should add it here strictly.
        // The plan said: "Verify Founder receives notification (existing flow)". 
        // If existing flow is DB triggers, we are good. If it's API based, we might strictly need to add it.
        // For now, let's assume the request creation is the core triggers.

        // Add Notification manually just in case Layer 0 doesn't have DB triggers
        await prisma.notification.create({
            data: {
                userId: need.founderId,
                title: "New Help Offer",
                message: `${fromUser.name} offered to help with your ${need.category} need.`,
                type: "CONNECTION_REQUEST",
            }
        });

        return NextResponse.json({ success: true, connectionRequest });
    } catch (error) {
        console.error("Error responding to need:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
