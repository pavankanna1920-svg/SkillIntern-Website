import { ResourcesSection } from "@/components/dashboard/sections/ResourcesSection";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Resources | Starto",
    description: "Curated tools and funding for startups",
};

export default async function ResourcesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");

    const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { activeRole: true }
    });

    const activeRole = dbUser?.activeRole || (session.user as any).activeRole;

    // Strict Access Control: Only for Founders (STARTUP)
    if (activeRole !== "STARTUP") {
        redirect("/dashboard");
    }

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
            <ResourcesSection />
        </div>
    )
}
