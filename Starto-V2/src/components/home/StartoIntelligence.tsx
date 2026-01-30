"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export function StartoIntelligence() {
    return (
        <section className="relative w-full h-[600px] md:h-[800px] bg-white dark:bg-black overflow-hidden flex items-center justify-center">

            {/* Left Visual: Robot Hand - Anchored to Left Edge */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[400px] md:h-[600px] z-0 pointer-events-none select-none hidden md:block">
                <div className="relative w-full h-full">
                    <Image
                        src="/antigravity/robot-hand-v2.png"
                        alt="AI Robot Hand"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </div>

            {/* Right Visual: Laptop Held - Anchored to Right Edge */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] z-0 pointer-events-none select-none hidden md:block">
                <div className="relative w-full h-full">
                    <Image
                        src="/antigravity/founder-pointing.png"
                        alt="Starto Dashboard on Laptop"
                        fill
                        className="object-contain object-right"
                    />
                </div>
            </div>

            {/* Center Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white leading-[1.1] drop-shadow-sm">
                        More than connections. <br />
                        <span className="text-gray-400">Starto is local startup intelligence.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mx-auto max-w-2xl">
                        Starto uses AI to read real-world startup signals <br></br>market demand, competition, and risk based on what’s actually happening around you.
                    </p>

                    {/* Centered Bullets */}
                    <div className="flex flex-col items-center gap-4 pt-4">
                        {[
                            "Live local demand signals",
                            "Nearby competition & saturation insights",
                            "Early risk indicators before you invest time or money"
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                <span className="text-base text-gray-700 dark:text-gray-200 font-medium">{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
