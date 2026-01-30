import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { log, error as logError } from "@/lib/logger";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        log("ONBOARDING_PAYLOAD", body);

        // New Payload Structure: { role, location, userDetails, profileData }
        const { role, location, userDetails, profileData } = body;
        const email = session.user.email;

        if (!role || !profileData || !location) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // 1. Transactional Update: User (Base + Location) + Profile
        await prisma.$transaction(async (tx) => {

            // A. Update User Base Data
            await tx.user.update({
                where: { id: user.id },
                data: {
                    name: userDetails?.name || user.name, // Prefer new name if provided
                    phoneNumber: userDetails?.phoneNumber,
                    activeRole: role.toUpperCase(), // Set Active Role
                    onboarded: true, // Mark as Onboarded
                    // Location
                    latitude: location.latitude,
                    longitude: location.longitude,
                    city: location.city,
                    state: location.state,
                    country: location.country,
                    pincode: location.pincode,
                }
            });

            // B. Upsert Specific Profile
            if (role === "startup") {
                await tx.startupProfile.upsert({
                    where: { ownerId: user.id },
                    update: {
                        name: profileData.name,
                        industry: profileData.industry,
                        stage: profileData.stage || undefined,
                        teamSize: profileData.teamSize,
                        fundingRound: profileData.fundingRound || undefined,
                        fundingNeeded: profileData.fundingNeeded,
                        minHiringBudget: profileData.minHiringBudget,
                        maxHiringBudget: profileData.maxHiringBudget,
                        oneLiner: profileData.oneLiner,
                        description: profileData.description,
                        website: profileData.website,
                        isActive: true,
                        // Update Location fields specifically in Profile too
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address // Persist full address string
                    },
                    create: {
                        ownerId: user.id,
                        name: profileData.name || "My Startup",
                        industry: profileData.industry,
                        stage: profileData.stage || undefined,
                        teamSize: profileData.teamSize,
                        fundingRound: profileData.fundingRound || undefined,
                        fundingNeeded: profileData.fundingNeeded,
                        minHiringBudget: profileData.minHiringBudget,
                        maxHiringBudget: profileData.maxHiringBudget,
                        oneLiner: profileData.oneLiner,
                        description: profileData.description,
                        website: profileData.website,
                        isActive: true,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    }
                });
            } else if (role === "freelancer") {
                await tx.freelancerProfile.upsert({
                    where: { userId: user.id },
                    update: {
                        headline: profileData.headline,
                        skills: profileData.skills,
                        experience: profileData.experience || undefined,
                        availability: profileData.availability || undefined,
                        workType: profileData.workType || undefined,
                        portfolio: profileData.portfolio,
                        github: profileData.github,
                        linkedin: profileData.linkedin,
                        isActive: true,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    },
                    create: {
                        userId: user.id,
                        headline: profileData.headline,
                        skills: profileData.skills,
                        experience: profileData.experience || undefined,
                        availability: profileData.availability || undefined,
                        workType: profileData.workType || undefined,
                        portfolio: profileData.portfolio,
                        github: profileData.github,
                        linkedin: profileData.linkedin,
                        isActive: true,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    }
                });
            } else if (role === "investor") {
                await tx.investorProfile.upsert({
                    where: { userId: user.id },
                    update: {
                        investorType: profileData.investorType || undefined,
                        minTicketSize: profileData.minTicketSize ? Number(profileData.minTicketSize) : undefined,
                        maxTicketSize: profileData.maxTicketSize ? Number(profileData.maxTicketSize) : undefined,
                        sectors: profileData.sectors,
                        stages: profileData.stages,
                        isPublic: true,
                        isActive: true,
                        thesisNote: profileData.thesisNote,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    },
                    create: {
                        userId: user.id,
                        investorType: profileData.investorType || undefined,
                        minTicketSize: profileData.minTicketSize ? Number(profileData.minTicketSize) : undefined,
                        maxTicketSize: profileData.maxTicketSize ? Number(profileData.maxTicketSize) : undefined,
                        sectors: profileData.sectors,
                        stages: profileData.stages,
                        isPublic: true,
                        isActive: true,
                        thesisNote: profileData.thesisNote,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    }
                });
            } else if (role === "provider") {
                await tx.providerProfile.upsert({
                    where: { userId: user.id },
                    update: {
                        companyName: profileData.companyName,
                        providerType: profileData.providerType || undefined,
                        capacity: profileData.capacity ? Number(profileData.capacity) : undefined,
                        minPrice: profileData.minPrice ? Number(profileData.minPrice) : undefined,
                        maxPrice: profileData.maxPrice ? Number(profileData.maxPrice) : undefined,
                        priceUnit: profileData.priceUnit,
                        description: profileData.description,
                        isActive: true,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    },
                    create: {
                        userId: user.id,
                        companyName: profileData.companyName,
                        providerType: profileData.providerType || undefined,
                        capacity: profileData.capacity ? Number(profileData.capacity) : undefined,
                        minPrice: profileData.minPrice ? Number(profileData.minPrice) : undefined,
                        maxPrice: profileData.maxPrice ? Number(profileData.maxPrice) : undefined,
                        priceUnit: profileData.priceUnit,
                        description: profileData.description,
                        isActive: true,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        city: location.city,
                        state: location.state,
                        country: location.country,
                        pincode: location.pincode,
                        address: location.address
                    }
                });
            }
        });

        // 2. Handle Referral Attribution (Non-blocking)
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const inviteCode = cookieStore.get("starto_invite_code")?.value;

            if (inviteCode && !user.referredById) {
                const invite = await prisma.invite.findUnique({ where: { code: inviteCode } });
                if (invite && invite.inviterId !== user.id) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { referredById: invite.inviterId }
                    });
                }
            }
        } catch (refError) {
            console.error("Referral Attribution Failed", refError);
        }

        return NextResponse.json({ success: true, role });

    } catch (error: any) {
        logError("ONBOARDING_ERROR", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
