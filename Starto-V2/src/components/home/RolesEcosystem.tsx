"use client";

import { User, Briefcase, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(Draggable);

const ROLES = [
    {
        id: "founder",
        title: "Founder",
        line: "Turning ideas into reality",
        signals: ["Posting needs", "Finding co-founders", "Validating ideas locally"],
        cta: "Start building",
        icon: <User className="w-6 h-6" />,
        color: "text-black dark:text-white",
        bg: "bg-gray-100 dark:bg-zinc-800",
        border: "group-hover:border-black dark:group-hover:border-white"
    },
    {
        id: "freelancer",
        title: "Freelancer",
        line: "Skills that find real work",
        signals: ["Discover nearby projects", "Work with early startups", "No cold outreach"],
        cta: "Find opportunities",
        icon: <Briefcase className="w-6 h-6" />,
        color: "text-black dark:text-white",
        bg: "bg-gray-100 dark:bg-zinc-800",
        border: "group-hover:border-black dark:group-hover:border-white"
    },
    {
        id: "investor",
        title: "Investor",
        line: "Discover before the noise",
        signals: ["Early-stage founders nearby", "Market signals, not pitches", "Real-world traction"],
        cta: "Explore signals",
        icon: <TrendingUp className="w-6 h-6" />,
        color: "text-black dark:text-white",
        bg: "bg-gray-100 dark:bg-zinc-800",
        border: "group-hover:border-black dark:group-hover:border-white"
    },
    {
        id: "space",
        title: "Space Provider",
        line: "Where work actually happens",
        signals: ["Offices, desks, studios", "Used by active founders", "Local demand insights"],
        cta: "List your space",
        icon: <MapPin className="w-6 h-6" />,
        color: "text-black dark:text-white",
        bg: "bg-gray-100 dark:bg-zinc-800",
        border: "group-hover:border-black dark:group-hover:border-white"
    }
];

export function RolesEcosystem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    // We duplicate the array to create a seamless loop illusion
    const extendedRoles = [...ROLES, ...ROLES, ...ROLES];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // CARD WIDTH + GAP
        // Approx width of card (320px) + gap (24px) = 344px
        // We'll calculate accurately based on DOM
        const cardWidth = 344;
        const totalWidth = cardWidth * ROLES.length;

        // Initial setup
        gsap.set(container, { x: -totalWidth }); // Start from the middle set

        // Continuous Loop Animation
        const loopAnim = gsap.to(container, {
            x: `-=${totalWidth}`,
            duration: 20,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth - totalWidth) // Keep looping seamlessly
            }
        });

        // Draggable Logic
        Draggable.create(container, {
            type: "x",
            trigger: container,
            inertia: true,
            onDragStart: () => {
                loopAnim.pause();
            },
            onDragEnd: function () {
                // Resume loop smoothly or snap? 
                // Creating a seamless resume is tricky, simpler to let it hang or snap.
                // For this request "Auto-moving", we'll resume slowly.
                gsap.to(loopAnim, { timeScale: 1, duration: 1 });
                loopAnim.play();
            },
            onDrag: function () {
                // Wrap logic for seamless drag
                if (this.x > 0) {
                    this.x -= totalWidth;
                    gsap.set(this.target, { x: this.x });
                } else if (this.x < -totalWidth * 2) {
                    this.x += totalWidth;
                    gsap.set(this.target, { x: this.x });
                }
            }
        });

        // Scale Effect Logic (Center Focus)
        // We use a ticker to constantly update scale based on position
        const updateScale = () => {
            const centerX = window.innerWidth / 2;
            cardsRef.current.forEach((card) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const dist = Math.abs(centerX - cardCenter);
                const scale = 1 - Math.min(dist / 1000, 0.1); // subtle scale based on distance
                const alpha = 1 - Math.min(dist / 800, 0.4); // fade sides independently

                gsap.set(card, {
                    scale: scale,
                    opacity: alpha,
                    zIndex: dist < 150 ? 10 : 1
                });
            });
        };

        gsap.ticker.add(updateScale);

        return () => {
            loopAnim.kill();
            gsap.ticker.remove(updateScale);
        };
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section className="relative py-12 md:py-16 bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-zinc-900">
            <div className="text-center mb-16 space-y-4 px-6">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-tight">
                    Built for everyone building
                </h2>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
                    Founders, freelancers, investors, and space providers — <br className="hidden md:block" />
                    all moving together, locally.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="w-full relative py-10">
                {/* Gradient Masks for fading edges */}
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-20 pointer-events-none" />

                <div
                    ref={containerRef}
                    className="flex gap-6 pl-[50vw] w-fit cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                >
                    {extendedRoles.map((role, i) => (
                        <div
                            key={`${role.id}-${i}`}
                            ref={addToRefs}
                            className={`
                                relative w-[300px] md:w-[320px] flex-shrink-0 
                                bg-white dark:bg-zinc-900 rounded-3xl p-8 
                                shadow-sm border border-gray-100 dark:border-zinc-800 
                                ${role.border} transition-colors duration-300
                                group select-none
                            `}
                        >
                            {/* Soft glow behind card */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-gray-50 to-transparent dark:from-zinc-800 dark:to-transparent rounded-3xl -z-10 transition-opacity duration-300" />

                            <div className="flex flex-col h-full items-start">
                                {/* Header */}
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${role.bg} ${role.color}`}>
                                    {role.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{role.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium mb-6 text-sm">{role.line}</p>

                                {/* Signals */}
                                <div className="space-y-3 mb-8 w-full">
                                    {role.signals.map((signal, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-600" />
                                            {signal}
                                        </div>
                                    ))}
                                </div>

                                {/* Micro CTA */}
                                <div className={`mt-auto flex items-center gap-2 text-sm font-bold ${role.color} group-hover:gap-3 transition-all`}>
                                    {role.cta} <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
