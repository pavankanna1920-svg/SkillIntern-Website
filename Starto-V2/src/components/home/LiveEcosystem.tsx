"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Zap, Users, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LiveEcosystem() {
    const sectionRef = useRef(null);
    const mapRef = useRef(null);
    const contentRef = useRef(null);
    const pinsRef = useRef<HTMLDivElement[]>([]);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Map Fade In
            gsap.from(mapRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Pins pop in
            pinsRef.current.forEach((pin, i) => {
                gsap.from(pin, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.2 + (i * 0.1),
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                });

                // Continuous pulse
                gsap.to(pin, {
                    scale: 1.2,
                    opacity: 0.8,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.5
                });
            });

            // Cards slide up
            cardsRef.current.forEach((card, i) => {
                gsap.from(card, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.5 + (i * 0.2),
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                });

                // Generic floating animation
                gsap.to(card, {
                    y: "-=10",
                    duration: 3 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 1 + i // offset start
                });
            });

            // Text content fade
            gsap.from(contentRef.current, {
                x: 30,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToPins = (el: HTMLDivElement | null) => {
        if (el && !pinsRef.current.includes(el)) {
            pinsRef.current.push(el);
        }
    };

    const addToCards = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* LEFT: MAP PREVIEW */}
                <div ref={mapRef} className="relative h-[500px] w-full bg-gray-50 dark:bg-zinc-900/50 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-inner group">

                    {/* Background Map Image - Blurred */}
                    <div className="absolute inset-0 opacity-40 dark:opacity-20 blur-[2px] scale-105 group-hover:scale-110 transition-transform duration-[20s] ease-linear">
                        <Image
                            src="/antigravity/map-illustration.png"
                            alt="Map Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Overlay Gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-black/80 dark:to-transparent" />

                    {/* Interactive Elements Container */}
                    <div className="absolute inset-0">
                        {/* Pin 1 */}
                        <div ref={addToPins} className="absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-white dark:border-black z-10" />

                        {/* Pin 2 */}
                        <div ref={addToPins} className="absolute top-[60%] left-[50%] w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-white dark:border-black z-10" />

                        {/* Pin 3 */}
                        <div ref={addToPins} className="absolute top-[40%] right-[25%] w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-white dark:border-black z-10" />

                        {/* Card 1: CTO */}
                        <div ref={addToCards} className="absolute top-[35%] left-[22%] z-20">
                            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 p-3 rounded-xl shadow-lg flex items-center gap-3 max-w-[220px]">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Looking for CTO</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Indiranagar • 2m ago</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Designer */}
                        <div ref={addToCards} className="absolute top-[65%] left-[52%] z-20">
                            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 p-3 rounded-xl shadow-lg flex items-center gap-3 max-w-[220px]">
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Designer needed</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Gachibowli • 12m ago</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Investor */}
                        <div ref={addToCards} className="absolute top-[25%] right-[10%] z-20 hidden md:block">
                            <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 p-3 rounded-xl shadow-lg flex items-center gap-3 max-w-[220px]">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white">Angel investor nearby</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Koramangala • Just now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: CONTENT */}
                <div ref={contentRef} className="space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 font-bold text-xs uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            Live Ecosystem
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
                            What’s happening <br /> near you?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            Starto surfaces real startup signals from your area — needs, opportunities, and people actively building.
                        </p>
                    </div>

                    <div className="space-y-4 border-l-2 border-gray-100 dark:border-zinc-800 pl-6">
                        <BulletItem text="Needs posted minutes ago" />
                        <BulletItem text="Freelancers available nearby" />
                        <BulletItem text="Early-stage founders exploring ideas" />
                        <BulletItem text="Investors tracking local momentum" />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <Button className="h-12 px-8 text-base bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 shadow-xl shadow-black/5">
                            See activity near me <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <span className="text-sm text-gray-400 flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Location-based. Private by default.
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
}

function BulletItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600" />
            <span className="text-base text-gray-700 dark:text-gray-200 font-medium">{text}</span>
        </div>
    )
}
