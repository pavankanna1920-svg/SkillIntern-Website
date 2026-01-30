"use client"
import React, { useRef, useLayoutEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, Network, Zap, Plus, MoveRight, Briefcase } from "lucide-react"
import { useUser } from "@/hooks/useUser"
import gsap from "gsap"

// Components
import { InviteCard } from "@/components/invite/InviteCard"
import { FreelancerSettingsSection } from "@/components/freelancer/sections/FreelancerSettingsSection"
import { ResourcesSection } from "@/components/dashboard/sections/ResourcesSection"
import { InstantHelpWidget } from "@/components/dashboard/InstantHelpWidget";

interface FreelancerDashboardProps {
    section?: string;
}

export default function FreelancerDashboard({ section }: FreelancerDashboardProps) {
    if (section === "settings" || section === "profile") {
        return <FreelancerSettingsSection />;
    }
    // Resources View Removed for Freelancers

    const { dbUser } = useUser();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const name = dbUser?.name?.split(' ')[0] || "Freelancer";
    const city = (dbUser?.city || "Location Not Set").toUpperCase();

    // GSAP Animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".anim-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "all"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Ecosystem Cards Data
    const ecosystemCards = [
        { title: "Find Work", label: "Explore" },
        { title: "My Bids", label: "Track" },
        { title: "What work you do", label: "Update" },
        { title: "Portfolio", label: "Edit", isAdd: true },
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-[#050505] font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-20">

            {/* Header / Top Nav - CENTERED LOCATION */}
            <div className="flex flex-col md:flex-row justify-between items-center py-6 px-8 md:px-12 anim-item gap-4">
                <div className="hidden md:block w-24"></div>

                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5">
                    <MapPin className="w-3 h-3" />
                    {city}
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto">
                    {/* Profile Avatar */}
                    <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden relative border border-gray-200 dark:border-white/10">
                        {dbUser?.image ? (
                            <img src={dbUser.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">{name[0]}</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 pt-4">

                {/* 1. Welcome Section */}
                <div className="text-center space-y-6 mb-12 anim-item">
                    <div className="inline-block px-3 py-1 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                        Status: Open to Work
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-black dark:text-white tracking-tight leading-tiight">
                        Hello, {name}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        Ready to find your next challenge? The ecosystem is looking for your skills.
                    </p>
                </div>

                {/* 2. Instant Help / Live Pulse Section */}
                <div className="mb-16 anim-item">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Instant Help Widget - Spans 2 cols */}
                        <div className="md:col-span-2">
                            <InstantHelpWidget />
                        </div>

                        {/* Network Reach Stats */}
                        <NetworkReachCard />
                    </div>
                </div>



                {/* 4. Bottom Section (Ecosystem) */}
                <div className="anim-item mb-20">
                    <div className="flex justify-between items-end mb-8 border-b border-gray-100 dark:border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-black dark:text-white fill-current" />
                            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-black dark:text-white">
                                Growth Tools
                            </h3>
                        </div>
                        {/* Resources Link Removed for Freelancers */}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {ecosystemCards.map((card, i) => (
                            <div
                                key={i}
                                className={`
                                    h-32 flex flex-col items-center justify-center gap-2 rounded-2xl transition-all cursor-pointer border
                                    ${card.isAdd
                                        ? "border-dashed border-gray-200 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 text-gray-400 bg-transparent"
                                        : "bg-gray-50 dark:bg-white/5 border-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"}
                                `}
                            >
                                {card.isAdd ? <Plus className="w-6 h-6" /> : <span className="text-[10px] font-bold tracking-widest uppercase">{card.title}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Invite */}
                <div className="anim-item">
                    <InviteCard className="border-none shadow-none bg-transparent p-0" />
                </div>

            </div >
        </div >
    )
}

function NetworkReachCard() {
    const [count, setCount] = React.useState<number | null>(null);

    React.useEffect(() => {
        fetch("/api/users/stats/network-reach")
            .then(res => res.json())
            .then(data => setCount(data.count))
            .catch(() => setCount(0));
    }, []);

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl flex flex-col justify-center items-center text-center h-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Network Reach</h3>
            <div className="text-4xl font-serif mb-1">
                {count === null ? (
                    <span className="animate-pulse">...</span>
                ) : (
                    count
                )}
            </div>
            <p className="text-xs text-zinc-400">Active Members Nearby</p>
        </div>
    );
}
