import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Fetch 'My Network' (Accepted Connections) and 'Inbox' (Pending Requests)
export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    try {
        // 1. My Network: Status = ACCEPTED (Either sender or receiver)
        // complex OR query
        const acceptedConnections = await prisma.connectionRequest.findMany({
            where: {
                status: "ACCEPTED",
                OR: [
                    { fromUserId: user.id },
                    { toUserId: user.id }
                ]
            },
            include: {
                fromUser: { select: { id: true, name: true, image: true, city: true, role: true, phoneNumber: true, startupProfile: { select: { name: true } }, freelancerProfile: { select: { headline: true } } } },
                toUser: { select: { id: true, name: true, image: true, city: true, role: true, phoneNumber: true, startupProfile: { select: { name: true } }, freelancerProfile: { select: { headline: true } } } }
            }
        });

        // Transform for UI
        const network = acceptedConnections.map(conn => {
            const isMeSender = conn.fromUserId === user.id;
            const otherUser = isMeSender ? conn.toUser : conn.fromUser;
            return {
                id: otherUser.id,
                name: otherUser.name,
                image: otherUser.image,
                role: otherUser.role,
                city: otherUser.city,
                // Try to get company or headline
                company: otherUser.startupProfile?.name || otherUser.freelancerProfile?.headline || "Starto User",
                connectedAt: conn.updatedAt,
                phoneNumber: otherUser.phoneNumber // Add phone number
            };
        });

        // 2. Inbox: Pending Requests RECEIVED by me
        const pendingRequests = await prisma.connectionRequest.findMany({
            where: {
                toUserId: user.id,
                status: "PENDING"
            },
            include: {
                fromUser: { select: { id: true, name: true, image: true, city: true, role: true, startupProfile: { select: { name: true } } } }
            }
        });

        const inbox = pendingRequests.map(req => ({
            id: req.id, // Request ID
            sender: {
                id: req.fromUser.id,
                name: req.fromUser.name,
                image: req.fromUser.image,
                role: req.fromUser.role,
                company: req.fromUser.startupProfile?.name,
                city: req.fromUser.city
            },
            message: req.message,
            purpose: req.purpose,
            sentAt: req.createdAt
        }));

        return NextResponse.json({ network, inbox });

    } catch (error) {
        console.error("Connections API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    try {
        const body = await req.json();
        const { requestId, action } = body; // action: "ACCEPT" | "REJECT"

        if (!requestId || !["ACCEPT", "REJECT"].includes(action)) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Verify request belongs to user (as receiver)
        const connectionRequest = await prisma.connectionRequest.findUnique({
            where: { id: requestId }
        });

        if (!connectionRequest || connectionRequest.toUserId !== user.id) {
            return NextResponse.json({ error: "Request not found or unauthorized" }, { status: 404 });
        }

        if (action === "REJECT") {
            // Option A: Delete it
            await prisma.connectionRequest.delete({ where: { id: requestId } });
            return NextResponse.json({ success: true, status: "REJECTED" });
        } else {
            // Option B: Accept it
            await prisma.connectionRequest.update({
                where: { id: requestId },
                data: { status: "ACCEPTED" }
            });
            return NextResponse.json({ success: true, status: "ACCEPTED" });
        }

    } catch (error) {
        console.error("Connection Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
