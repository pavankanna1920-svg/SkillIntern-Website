"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOCK_CARDS = [
    { id: 1, type: "FOUNDER", name: "Sarah K.", role: "Founder", text: "Looking for React Dev", x: 15, y: 25 },
    { id: 2, type: "FREELANCER", name: "Amit V.", role: "Developer", text: "React/Node Expert", x: 70, y: 45 },
    { id: 3, type: "INVESTOR", name: "Vertex VC", role: "Investor", text: "Seed Stage Fund", x: 40, y: 75 },
    { id: 4, type: "PROVIDER", name: "WeWork", role: "Space", text: "Hot Desks Available", x: 80, y: 20 },
];

export function LivePreview() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".preview-card", {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        gsap.from(".map-pulse", {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            }
        });

    }, { scope: containerRef });

    return (
        <div className="py-24 bg-white relative overflow-hidden" ref={containerRef}>
            {/* Background Texture Bridge */}
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#F8F9FB] to-white pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                {/* 1. Tightened Header */}
                <div className="text-center mb-12 space-y-3 relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-bold tracking-tight text-[#0B0D12]">Live on the Map</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        See founders, freelancers, investors, and spaces — in real time, around you.
                    </p>
                </div>

                {/* 2. Map Mockup Container */}
                <div className="relative w-full max-w-5xl aspect-[16/10] md:aspect-[16/8] bg-gray-50/50 rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden group">

                    {/* A. Realistic Map Background */}
                    <div className="absolute inset-0 bg-[#F3F4F6] opacity-60">
                        {/* Subtle Grid */}
                        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        {/* Faint Geo-pattern dots */}
                        <div className="absolute inset-0 mix-blend-multiply opacity-20" style={{ backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    </div>

                    {/* B. Central Pulse (The "Live" Element) */}
                    <div className="map-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />

                    {/* C. Floating Cards */}
                    {MOCK_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className="preview-card absolute bg-white p-3.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-3 min-w-[220px] transform -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition-transform cursor-default z-10"
                            style={{ left: `${card.x}%`, top: `${card.y}%` }}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm
                                ${card.type === 'FOUNDER' ? 'bg-red-500' : card.type === 'FREELANCER' ? 'bg-blue-500' : 'bg-INVESTOR' ? 'bg-green-500' : 'bg-purple-500'}`}
                            >
                                {card.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="font-bold text-sm text-gray-900 truncate">{card.name}</h4>
                                    <Badge variant="secondary" className="text-[9px] h-4 px-1.5 bg-gray-50 text-gray-500 font-medium border-0">
                                        {card.role}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{card.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* D. Mobile Note (Optional overlay for clarity on small screens) */}
                    <div className="absolute bottom-4 left-0 w-full text-center md:hidden">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">Interactive Preview</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
