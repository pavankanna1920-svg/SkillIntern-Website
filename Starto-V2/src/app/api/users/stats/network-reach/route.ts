
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Verify path
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { latitude: true, longitude: true }
        });

        if (!user || user.latitude === null || user.longitude === null) {
            return NextResponse.json({ count: 0 });
        }

        // Calculate users within 5km radius explicitly
        // Haversine formula query or simple boundary check
        // For simplicity and speed in Prisma/SQL:
        // 1 deg lat ~ 111km. 5km ~ 0.045 deg.
        const R = 6371; // Earth radius in km
        const radius = 5;

        // Fetch all users with basic lat/long filtering first (box search)
        // Lat +/- 0.05, Lng +/- 0.05
        const lat = user.latitude;
        const lng = user.longitude;
        const range = 0.05;

        const users = await prisma.user.findMany({
            where: {
                latitude: {
                    gte: lat - range,
                    lte: lat + range
                },
                longitude: {
                    gte: lng - range,
                    lte: lng + range
                },
                email: { not: session.user.email } // Exclude self
            },
            select: { latitude: true, longitude: true }
        });

        // Refine with exact distance
        const nearbyCount = users.filter(u => {
            if (!u.latitude || !u.longitude) return false;
            const dLat = (u.latitude - lat) * Math.PI / 180;
            const dLon = (u.longitude - lng) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat * Math.PI / 180) * Math.cos(u.latitude * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in km
            return d <= radius;
        }).length;

        return NextResponse.json({ count: nearbyCount });

    } catch (error) {
        console.error("NETWORK_REACH_ERROR", error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
