"use client"
import React, { useRef, useLayoutEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Warehouse, Zap, Plus, MoveRight, Key } from "lucide-react"
import { useUser } from "@/hooks/useUser"
import gsap from "gsap"

// Components
import { InviteCard } from "@/components/invite/InviteCard"
import { ProviderSettingsSection } from "@/components/provider/sections/ProviderSettingsSection"
import { ResourcesSection } from "@/components/dashboard/sections/ResourcesSection"
import { InstantHelpWidget } from "@/components/dashboard/InstantHelpWidget";

interface ProviderDashboardProps {
    section?: string;
}

export default function ProviderDashboard({ section }: ProviderDashboardProps) {
    if (section === "settings" || section === "profile") {
        return <ProviderSettingsSection />;
    }
    // Resources View Removed for Providers

    const { dbUser } = useUser();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const name = dbUser?.name?.split(' ')[0] || "Provider";
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
        { title: "Listings", label: "View" },
        { title: "Requests", label: "Manage" },
        { title: "Tenants", label: "Message" },
        { title: "Add Space", label: "Create", isAdd: true },
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
                        Status: Active Provider
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-medium text-black dark:text-white tracking-tight leading-tiight">
                        Welcome, {name}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        Space is the new currency. Connect with startups needing your infrastructure.
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

                {/* 3. Main Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 anim-item">

                    {/* BLACK CARD (Listings) */}
                    <div className="bg-black dark:bg-white text-white dark:text-black p-8 md:p-10 rounded-2xl relative overflow-hidden group shadow-2xl min-h-[380px] flex flex-col justify-between transition-transform hover:scale-[1.01]">
                        <div className="absolute top-0 right-0 p-40 bg-zinc-900 dark:bg-zinc-200 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>

                        {/* Icon Top Left */}
                        <div className="w-12 h-12 bg-white/10 dark:bg-black/5 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10 dark:border-black/5">
                            <Warehouse className="w-5 h-5 text-white dark:text-black" />
                        </div>

                        <div className="absolute top-10 right-10 text-[10px] font-bold tracking-widest text-white/40 dark:text-black/40 uppercase">
                            Listing Status
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h2 className="text-3xl font-serif mb-4">My Listings</h2>
                            <p className="text-white/60 dark:text-black/60 mb-8 max-w-xs text-sm leading-relaxed">
                                You have 0 active listings visible to the network.
                            </p>

                            <Button
                                onClick={() => router.push("/dashboard?section=settings")}
                                className="bg-white text-black dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 w-full md:w-auto px-8 h-12 text-xs font-bold tracking-widest uppercase transition-transform active:scale-95 border-none"
                            >
                                Add Space <MoveRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* WHITE CARD (Current Focus) */}
                    <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/10 p-8 md:p-10 rounded-2xl shadow-sm min-h-[380px] flex flex-col justify-between hover:shadow-lg transition-all hover:border-gray-200 dark:hover:border-white/20">

                        <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center mb-8 border border-gray-100 dark:border-white/5">
                            <Key className="w-5 h-5 text-black dark:text-white" />
                        </div>



                        <div className="mt-auto w-full">
                            <h2 className="text-3xl font-serif mb-8 text-black dark:text-white">Quick Tasks</h2>

                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Add a maintenance task..."
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg py-4 pl-4 pr-12 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600 text-black dark:text-white"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-[10px] text-gray-400 italic mt-6">
                                Keep your spaces ready for immediate booking.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Bottom Section (Ecosystem) */}
                <div className="anim-item mb-20">
                    <div className="flex justify-between items-end mb-8 border-b border-gray-100 dark:border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-black dark:text-white fill-current" />
                            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-black dark:text-white">
                                Growth & Support
                            </h3>
                        </div>
                        {/* Resources Link Removed for Providers */}
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
