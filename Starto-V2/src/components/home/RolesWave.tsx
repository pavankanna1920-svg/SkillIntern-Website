"use client";

import {
    Rocket, Briefcase, TrendingUp, Building2, Code2,
    Palette, Mic2, Video, PenTool, Globe, Cpu
} from "lucide-react";
import { useRef } from "react";

const ITEMS = [
    { icon: Rocket, label: "Founders" },
    { icon: Briefcase, label: "Freelancers" },
    { icon: TrendingUp, label: "Investors" },
    { icon: Building2, label: "Spaces" },
    { icon: Code2, label: "Developers" },
    { icon: Palette, label: "Designers" },
    { icon: Mic2, label: "Podcasters" },
    { icon: Video, label: "Creators" },
    { icon: PenTool, label: "Writers" },
    { icon: Globe, label: "Marketers" },
    { icon: Cpu, label: "AI Experts" },
];

export function RolesWave() {
    return (
        <section className="py-24 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-black via-transparent to-white dark:to-black z-10 pointer-events-none" />

            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap px-8 hover:[animation-play-state:paused]">
                {/* Double the list for seamless loop */}
                {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => {
                    // Create a wave effect: every 2nd item is slightly lower
                    const waveOffset = i % 2 === 0 ? "translate-y-0" : "translate-y-8";

                    return (
                        <div
                            key={i}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-transform duration-500 ${waveOffset}`}
                        >
                            <div className="w-20 h-20 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-black dark:group-hover:border-white transition-all duration-300">
                                <item.icon className="w-8 h-8 text-black dark:text-white stroke-[1.5]" />
                            </div>
                            {/* Label only visible on hover or always minimal? Let's keep it minimal */}
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
