import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) { // TODO: Add strict Admin Check here
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const requests = await prisma.helpRequest.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        phoneNumber: true,
                        image: true,
                        role: true,
                        activeRole: true
                    }
                },
                responses: {
                    include: {
                        helper: {
                            select: {
                                name: true,
                                email: true,
                                phoneNumber: true,
                                role: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(requests);

    } catch (error: any) {
        console.error("ADMIN_HELP_REQUESTS_ERROR", error);
        return NextResponse.json({ error: "Failed to fetch help requests" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, status } = body;

        const updated = await prisma.helpRequest.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
