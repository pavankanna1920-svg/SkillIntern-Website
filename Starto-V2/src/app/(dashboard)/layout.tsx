import { MinimalSidebar } from "@/components/dashboard/MinimalSidebar"
import { DashboardHeaderMobile } from "@/components/dashboard/DashboardHeaderMobile"
import { Suspense } from "react"
import BetaBanner from "@/components/common/BetaBanner"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import LocationManager from "@/components/common/LocationManager"


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Failsafe: Prevent orphaned users (not onboarded) from accessing dashboard
    const session = await getServerSession(authOptions);

    if (session?.user && !(session.user as any).onboarded) {
        redirect("/onboarding");
    }

    return (
        <div className="flex h-screen bg-white dark:bg-[#050505] overflow-hidden flex-col">
            {/* Beta Banner - Global for Dashboard */}
            <div className="z-50 shrink-0"><BetaBanner /></div>
            <LocationManager />

            <DashboardHeaderMobile />
            <div className="flex flex-1 overflow-hidden relative">
                {/* NEW: Minimal Sidebar (White Theme) */}
                <div className="hidden md:block h-full shadow-[1px_0_20px_rgba(0,0,0,0.05)] z-20">
                    <MinimalSidebar role={(session?.user as any)?.activeRole} />
                </div>

                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    <main className="flex-1 overflow-y-auto custom-scrollbar">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
