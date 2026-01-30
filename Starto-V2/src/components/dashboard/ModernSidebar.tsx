"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutGrid,
    Compass,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    PlusCircle
} from "lucide-react"

export function ModernSidebar({ className }: { className?: string }) {
    const pathname = usePathname()

    // Simplified Navigation Items for the "Black Bar" look
    const navItems = [
        { icon: LayoutGrid, href: "/dashboard", label: "Dashboard" },
        { icon: Compass, href: "/explore", label: "Explore" },
        { icon: Users, href: "/connections", label: "Network" },
        { icon: MessageSquare, href: "/messages", label: "Messages" },
        { icon: Settings, href: "/dashboard?section=settings", label: "Settings" },
    ]

    return (
        <aside className={cn("w-20 md:w-24 bg-black h-screen flex flex-col items-center py-8 rounded-r-3xl md:rounded-3xl my-0 md:my-4 md:ml-4 shadow-2xl z-20 transition-all duration-300", className)}>

            {/* Logo */}
            <Link href="/" className="mb-12 hover:scale-110 transition-transform">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-bold text-xl">
                    F.
                </div>
            </Link>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-8 w-full px-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 group relative p-3 rounded-2xl transition-all duration-300",
                                isActive ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6 transition-transform group-hover:-translate-y-1", isActive && "text-white")} />
                            {/* Active Dot */}
                            {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full opacity-0" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-6 w-full px-4 items-center">
                <button className="p-3 text-gray-500 hover:text-red-400 transition-colors">
                    <LogOut className="w-6 h-6" />
                </button>
            </div>
        </aside>
    )
}
