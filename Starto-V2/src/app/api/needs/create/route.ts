import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assuming prisma is exported from here
import { getServerSession } from "next-auth"; // Adjust import based on your auth setup
import { authOptions } from "@/lib/auth"; // Adjust import

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { category, urgency, description } = await req.json();

        if (!category || !urgency || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check for existing active need
        const existingNeed = await prisma.needHelp.findFirst({
            where: {
                founderId: user.id,
                isActive: true,
            },
        });

        if (existingNeed) {
            // Deactivate old need automatically or return error?
            // User rule: "One active 'Need Help' post per founder"
            // Let's deactivate the old one to be user-friendly (or returns error if strict)
            // Plan says: "Validates one active need per founder rule."
            // I will deactivate the old one to allow "Posting new need replaces old one" style, 
            // OR returns error. Zomato style usually allows replacing.
            // Let's Update the existing one to be inactive.
            await prisma.needHelp.update({
                where: { id: existingNeed.id },
                data: { isActive: false },
            });
        }

        const need = await prisma.needHelp.create({
            data: {
                founderId: user.id,
                category,
                urgency,
                description,
                isActive: true,
            },
        });

        return NextResponse.json({ success: true, need });
    } catch (error) {
        console.error("Error creating need:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
