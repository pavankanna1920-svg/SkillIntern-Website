"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ArrowRight, UserPlus, HandMetal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function SearchHero() {
    const router = useRouter();
    const containerRef = useRef(null);
    const [need, setNeed] = useState("");
    const [location, setLocation] = useState("");

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Staggered text reveal
        tl.from(".hero-line-1", { y: 20, opacity: 0, duration: 0.8 })
            .from(".hero-line-2", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
            .from(".hero-desc", { y: 15, opacity: 0, duration: 0.8 }, "-=0.6")
            .from(".search-card", { scale: 0.98, opacity: 0, duration: 0.8, ease: "back.out(1.1)" }, "-=0.5")
            .from(".action-cards", { y: 15, opacity: 0, duration: 0.6 }, "-=0.4");
    }, { scope: containerRef });

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (need) params.set("q", need);
        if (location) params.set("loc", location);
        router.push(`/map?${params.toString()}`);
    };

    return (
        <div ref={containerRef} className="relative w-full min-h-[85vh] md:h-[90vh] flex flex-col items-center justify-center text-center px-4 bg-white text-[#0A0A0A] overflow-hidden pt-12 pb-16 md:py-0">

            {/* Background: Subtle Noise + Gradient */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white pointer-events-none" />

            {/* Ambient Glows (Behind Content) */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] opacity-60 mix-blend-multiply" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-50/40 rounded-full blur-[120px] opacity-60 mix-blend-multiply" />
            </div>

            {/* Main Content (Z-Index 10 - ABOVE gradients) */}
            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center pt-8 md:pt-0">

                {/* 1. Refined Headline (No Filters, Sharp Contrast) */}
                <h1 className="flex flex-col items-center text-center text-5xl md:text-7xl tracking-tighter leading-[1.1] mb-8">
                    {/* Primary Part */}
                    <span className="hero-line-1 font-extrabold text-[#0B0D12] dark:text-[#FAFAFA]">
                        Build faster,
                    </span>
                    {/* Secondary Part */}
                    <span className="hero-line-2 font-semibold text-[#6B7280] dark:text-[#A1A1AA]">
                        together.
                    </span>
                </h1>

                {/* 2. Optimized Subtext */}
                <p className="hero-desc text-lg md:text-xl text-gray-500 font-normal max-w-[90%] md:max-w-2xl mx-auto leading-relaxed mb-12">
                    Starto is a map-first platform that connects founders with nearby freelancers, investors, and spaces — exactly when they need help.
                </p>

                {/* 3. Redesigned Search Card */}
                <div className="search-card w-full max-w-[92%] md:max-w-3xl bg-white border border-gray-200/80 rounded-2xl p-2 shadow-xl shadow-gray-200/40 transition-all hover:shadow-2xl hover:shadow-gray-200/50 flex flex-col md:flex-row gap-2">

                    {/* Location Field (Secondary Visuals) */}
                    <div className="relative w-full md:w-[35%] h-12 md:h-14 bg-gray-50/50 md:bg-transparent rounded-xl flex items-center border border-transparent focus-within:bg-white focus-within:border-gray-200 transition-colors">
                        <MapPin className="absolute left-3 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Location"
                            className="pl-9 h-full bg-transparent border-none text-base text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 rounded-none shadow-none truncate"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-6 bg-gray-200" />
                    </div>

                    {/* Need Field (Primary Visuals) */}
                    <div className="relative w-full md:w-[65%] h-12 md:h-14 bg-gray-50/50 md:bg-transparent rounded-xl flex items-center border border-transparent focus-within:bg-white focus-within:border-gray-200 transition-colors">
                        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="What do you need?"
                            className="pl-9 h-full bg-transparent border-none text-base text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 rounded-none shadow-none"
                            value={need}
                            onChange={(e) => setNeed(e.target.value)}
                        />
                        {/* Desktop Search Button (Internal) */}
                        <Button
                            size="icon"
                            className="hidden md:flex absolute right-1 top-1 bottom-1 w-12 bg-black hover:bg-gray-800 text-white rounded-lg shadow-md transition-transform active:scale-95"
                            onClick={handleSearch}
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Mobile Search Button (Full Width) */}
                    <Button
                        className="md:hidden w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-xl shadow-md active:scale-[0.98] transition-all"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>

                {/* 4. Action Cards (Replacing Links) */}
                <div className="action-cards mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[92%] md:max-w-xl">

                    {/* Founder Action */}
                    <button
                        onClick={() => router.push("/onboarding/role?type=founder")}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-r-gray-200 transition-all text-left active:scale-[0.99]"
                    >
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <UserPlus className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm md:text-base">I Want Help</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Post a need & connect nearby</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </button>

                    {/* Helper Action */}
                    <button
                        onClick={() => router.push("/onboarding/role?type=helper")}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-r-gray-200 transition-all text-left active:scale-[0.99]"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <HandMetal className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm md:text-base">I Can Help</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Find founders who need you</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </button>

                </div>
            </div>
        </div>
    );
}
