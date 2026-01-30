import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET: Fetch ACTIVE requests (NEED & OFFER)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    const radiusKm = parseFloat(searchParams.get("radius") || "20");

    if (!lat || !lng) {
        return NextResponse.json({ error: "Location required" }, { status: 400 });
    }

    try {
        const now = new Date();

        // Fetch ALL Active Requests (Simple In-Memory filtering for Prototype)
        // In production, use PostGIS or filtered query
        const activeRequests = await prisma.helpRequest.findMany({
            where: {
                status: "ACTIVE",
                expiresAt: { gt: now }
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                        role: true, // Display role
                        phoneNumber: true
                    }
                }
            }
        });

        const nearbyRequests = activeRequests.filter(req => {
            const distance = calculateDistance(lat, lng, req.latitude, req.longitude);
            return distance <= radiusKm;
        }).map(req => ({
            ...req,
            distance_km: calculateDistance(lat, lng, req.latitude, req.longitude),
            // @ts-ignore
            voiceUrl: req.voiceUrl // Include Voice URL
        }));

        return NextResponse.json({ data: nearbyRequests });

    } catch (error: any) {
        console.error("GET_HELP_REQUESTS_ERROR", error);
        return NextResponse.json({ error: "Failed to fetch help requests" }, { status: 500 });
    }
}

// POST: Create Request (Enforcing Single Active Rule)
export async function POST(req: Request) {
    console.log("--- POST /api/help-requests STARTED ---");
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            console.log("--- UNAUTHORIZED ---");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("--- FETCHING BODY ---");
        const rawBody = await req.text();
        console.log("--- RAW BODY SIZE (BYTES):", rawBody.length);
        const body = JSON.parse(rawBody);
        console.log("--- BODY PARSED ---");
        const { category, description, latitude, longitude, type, voiceUrl } = body;

        // Validation: Description shouldn't be mandatory if Voice is present
        if (!category || latitude === undefined || longitude === undefined || !type) {
            console.error("Missing required fields:", { category, type, latitude, longitude });
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!description && !voiceUrl) {
            console.error("Description or Voice missing");
            return NextResponse.json({ error: "Description or Voice Message is required" }, { status: 400 });
        }

        console.log("--- FINDING USER ---");
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        console.log("Creating Request for User:", user.id, "Voice:", !!voiceUrl, "Len:", voiceUrl?.length);

        // 1. Check for EXISTING ACTIVE request
        console.log("--- CHECKING EXISTING ---");
        const existingRequest = await prisma.helpRequest.findFirst({
            where: {
                userId: user.id,
                status: "ACTIVE",
                expiresAt: { gt: new Date() }
            }
        });

        if (existingRequest) {
            console.log("User already has active request:", existingRequest.id);
            return NextResponse.json({
                error: "You already have an active request. Please resolve it first.",
                activeRequest: existingRequest
            }, { status: 409 });
        }

        // 2. Create New Request
        console.log("--- PREPARING DATA ---");

        // Explicit Data Mapping (Safe & Clean)
        const data = {
            userId: user.id,
            category: category,    // Ensure this matches Enum if using strict Enums, here it is String based on schema
            description: description || "Voice Message",
            type: type,            // NEED | OFFER
            latitude: latitude,
            longitude: longitude,
            status: "ACTIVE" as const, // Force Literal
            expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 mins
            voiceUrl: voiceUrl ?? null, // Explicit null
        };

        console.log("--- CREATING DB RECORD ---", data);

        const newRequest = await prisma.helpRequest.create({
            data: data
        });

        console.log("--- SUCCESS! Created Request:", newRequest.id);
        return NextResponse.json({ success: true, data: newRequest });

    } catch (error: any) {
        console.error("HELP REQUEST CREATE FAILED ❌");
        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("Meta:", error.meta);
        console.error("Stack:", error.stack);

        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message || "Unknown error",
            code: error.code
        }, { status: 500 });
    }
}

// PATCH: Resolve/End Current User's Active Request
export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Find active request
        const request = await prisma.helpRequest.findFirst({
            where: {
                userId: user.id,
                status: "ACTIVE"
            }
        });

        if (!request) return NextResponse.json({ error: "No active request found" }, { status: 404 });

        // Mark Resolved
        const updated = await prisma.helpRequest.update({
            where: { id: request.id },
            data: { status: "RESOLVED" }
        });

        return NextResponse.json({ success: true, data: updated });

    } catch (error: any) {
        console.error("RESOLVE_HELP_REQUEST_ERROR", error);
        return NextResponse.json({ error: "Failed to resolve request" }, { status: 500 });
    }
}

// Helpers
function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
