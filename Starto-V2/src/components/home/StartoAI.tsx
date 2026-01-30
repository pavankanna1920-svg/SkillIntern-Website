"use client";

import { useRef } from "react";
import { Sparkles, Zap, BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function StartoAI() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(".ai-feature-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)"
            }, "-=0.5");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 bg-zinc-950 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.05]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-center">

                    {/* Left: Text Content */}
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <div ref={titleRef} className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-sm font-semibold tracking-wide text-purple-100 uppercase">Powered by Intelligence</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Starto <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
                            </h2>
                            <p className="text-xl text-zinc-400 leading-relaxed max-w-xl mx-auto md:mx-0">
                                Connect with the perfect people instantly. Our AI analyzes location, skills, and availability to surface the highest-quality matches for your startup.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-lg transition-transform hover:scale-105 active:scale-95">
                                Try Smart Match <Zap className="ml-2 w-5 h-5 text-purple-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Right: Feature Cards (Abstract Representation) */}
                    <div className="flex-1 w-full relative h-[500px] flex items-center justify-center">
                        {/* Orbiting Elements Animation could go here, for now using Cards */}
                        <div className="relative w-full max-w-md aspect-square">

                            {/* Card 1: Analysis */}
                            <div className="ai-feature-card absolute top-10 left-0 right-10 bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                                        <BrainCircuit className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Intent Analysis</h4>
                                        <p className="text-sm text-zinc-400 mt-1">Understands "Help me build an MVP" vs "I need a co-founder".</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Location */}
                            <div className="ai-feature-card absolute top-1/2 left-10 -translate-y-1/2 right-0 bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 z-20">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/10 rounded-2xl">
                                        <Zap className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Hyper-Local Ranking</h4>
                                        <p className="text-sm text-zinc-400 mt-1">Prioritizes amazing talent within walking distance of your office.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Match */}
                            <div className="ai-feature-card absolute bottom-10 left-20 right-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 p-6 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-30">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-2xl">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Instant Connection</h4>
                                        <p className="text-sm text-purple-200 mt-1">94% match rate for technical founders.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
