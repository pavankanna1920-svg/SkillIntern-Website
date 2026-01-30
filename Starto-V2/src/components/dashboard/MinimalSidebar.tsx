"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
    LayoutGrid,
    Compass,
    Users,
    MapPin,
    BookOpen,
    Settings,
    LogOut,
    HelpCircle
} from "lucide-react"

export function MinimalSidebar({ className, role, onNavigate }: { className?: string, role?: string, onNavigate?: () => void }) {
    const pathname = usePathname()
    const { data: session } = useSession()

    // Priorities: Prop -> Session -> Undefined
    // Normalize to UPPERCASE for consistent checking
    const effectiveRole = (role || (session?.user as any)?.activeRole || "").toUpperCase();

    const navItems = [
        { icon: LayoutGrid, href: "/dashboard", label: "Dashboard" },
        { icon: Compass, href: "/explore", label: "Explore" },
        { icon: Users, href: "/connections", label: "Connections" },
        { icon: MapPin, href: "/nearby", label: "Nearby" },
        // Only show Resources for STARTUP (Founder)
        ...(effectiveRole === "STARTUP" ? [{ icon: BookOpen, href: "/resources", label: "Resources" }] : []),
        { icon: Settings, href: "/dashboard?section=settings", label: "Settings" },
    ]

    return (
        <aside className={cn("w-64 bg-white dark:bg-black h-full flex flex-col border-r border-gray-100 dark:border-white/10 z-20 transition-colors duration-300", className)}>

            {/* Logo Area */}
            <div className="p-6 mb-2">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black font-bold text-lg">
                        S
                    </div>
                    <span className="font-bold text-xl tracking-tight text-black dark:text-white">Starto</span>
                </Link>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-1 px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard")

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-gray-100 dark:bg-white/10 text-black dark:text-white"
                                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                            )}
                            onClick={() => onNavigate?.()}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-black dark:text-white" : "text-gray-400")} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 space-y-1 mt-auto border-t border-gray-100 dark:border-white/10">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-left"
                >
                    <LogOut className="w-5 h-5" />
                    Log out
                </button>
                <a href="mailto:support@starto.com" className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors text-left">
                    <HelpCircle className="w-5 h-5" />
                    Need Help?
                </a>
            </div>
        </aside>
    )
}
