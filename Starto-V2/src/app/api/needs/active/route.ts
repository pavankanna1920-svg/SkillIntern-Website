import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const activeNeed = await prisma.needHelp.findFirst({
            where: {
                founderId: user.id,
                isActive: true,
            },
            orderBy: { createdAt: 'desc' }, // Latest one
        });

        return NextResponse.json({ need: activeNeed });
    } catch (error) {
        console.error("Fetch Active Need Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    // To mark as "Solved" / Deactivate
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await prisma.needHelp.update({
            where: { id },
            data: { isActive: false }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: "Error deactivating need" }, { status: 500 });
    }
}
