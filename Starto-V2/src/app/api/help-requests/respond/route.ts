
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

        const body = await req.json();
        const { requestId, message } = body;

        if (!requestId) {
            return NextResponse.json({ error: "Request ID required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Check if request exists and is active
        const helpRequest = await prisma.helpRequest.findUnique({
            where: { id: requestId }
        });

        if (!helpRequest || helpRequest.status !== "ACTIVE") {
            return NextResponse.json({ error: "Request not available" }, { status: 404 });
        }

        if (helpRequest.userId === user.id) {
            return NextResponse.json({ error: "Cannot respond to own request" }, { status: 400 });
        }

        // Check if already responded
        const existingResponse = await prisma.helpResponse.findUnique({
            where: {
                helpRequestId_helperId: {
                    helpRequestId: requestId,
                    helperId: user.id
                }
            }
        });

        if (existingResponse) {
            return NextResponse.json({ error: "You have already responded to this request" }, { status: 409 });
        }

        // Create Response
        const response = await prisma.helpResponse.create({
            data: {
                helpRequestId: requestId,
                helperId: user.id,
                status: "PENDING",
                message: message || null
            }
        });

        // Increment count
        await prisma.helpRequest.update({
            where: { id: requestId },
            data: { responseCount: { increment: 1 } }
        });

        return NextResponse.json({ success: true, data: response });

    } catch (error: any) {
        console.error("HELP_RESPONSE_ERROR", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "You have already responded to this request" }, { status: 409 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
