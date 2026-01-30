import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const activeRequest = await prisma.helpRequest.findFirst({
            where: {
                userId: user.id,
                status: "ACTIVE",
                expiresAt: { gt: new Date() }
            },
            select: {
                id: true,
                type: true,
                category: true,
                description: true,
                expiresAt: true,
                responseCount: true,
                responses: {
                    select: {
                        id: true,
                        status: true,
                        message: true,
                        helper: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                activeRole: true
                            }
                        }
                    }
                }
            }
        });

        if (!activeRequest) return NextResponse.json(null); // Return 200 with null body

        return NextResponse.json(activeRequest);

    } catch (error: any) {
        console.error("GET_STATUS_ERROR", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
