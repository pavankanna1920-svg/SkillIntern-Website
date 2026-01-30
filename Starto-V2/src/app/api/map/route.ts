import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        // filters...

        // 1. Fetch Active Needs (Founders who WANT HELP) -> Red Pins / Feed Items
        const needs = await prisma.needHelp.findMany({
            where: {
                isActive: true,
                category: category ? { contains: category, mode: 'insensitive' } : undefined,
            },
            include: {
                founder: {
                    select: {
                        id: true,
                        name: true,
                        latitude: true,
                        longitude: true,
                        city: true,
                        image: true,
                    }
                }
            }
        });

        // 2. Fetch Helpers (Users who CAN HELP) -> Blue/Green/Purple Pins
        // Roles: FREELANCER, INVESTOR, SPACE_PROVIDER
        // Note: We need to filter users who have these roles.
        const helpers = await prisma.user.findMany({
            where: {
                OR: [
                    { role: "FREELANCER" },
                    { role: "INVESTOR" },
                    { role: "PROVIDER" }, // Mapping SPACE_PROVIDER if enum was updated, or PROVIDER if old enum
                    // Note: The user approved "Strict Role System" update, but I might have kept "PROVIDER" in prisma if I didn't do a full enum migration.
                    // In my schema update, I didn't change the enum values in the `replace_file_content` call I made earlier?
                    // Wait, I updated `User` model relations but did I update `enum UserRole`?
                    // I checked `schema.prisma` content in step 10. It had `PROVIDER`.
                    // In Step 25 (Plan update), I proposed changing it to `SPACE_PROVIDER`.
                    // But in Step 38 (Schema update), I only added `NeedHelp`... I did NOT refactor UserRole enum in the code I executed.
                    // The `multi_replace_file_content` in Step 38 targeted "Phase 1: Safe Backend Additions" which was ADDITIVE only.
                    // So the Enum is still `PROVIDER`.
                ]
            },
            select: {
                id: true,
                name: true,
                role: true, // "FREELANCER", "INVESTOR", "PROVIDER"
                latitude: true,
                longitude: true,
                city: true,
                image: true,
                freelancerProfile: { select: { headline: true, skills: true } }, // Corrected: title -> headlin
                investorProfile: { select: { investorType: true } },
                providerProfile: { select: { providerType: true } }
            }
        });

        return NextResponse.json({
            needs,
            helpers
        });

    } catch (error) {
        console.error("Map API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
