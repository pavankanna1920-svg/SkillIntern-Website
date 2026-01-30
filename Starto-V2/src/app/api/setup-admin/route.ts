
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Not logged in" }, { status: 401 });
        }

        const user = await prisma.user.update({
            where: { email: session.user.email },
            data: { role: "ADMIN" }
        });

        return NextResponse.json({
            success: true,
            message: `User ${user.email} promoted to ADMIN.`,
            nextStep: "Please refresh the page and go to /admin"
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
