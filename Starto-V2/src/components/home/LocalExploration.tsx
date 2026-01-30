"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { User, MapPin, Briefcase, TrendingUp, Handshake, Search, MessageSquare, Building2, Rocket, Lightbulb, Users, Target, Zap, Globe, HeartHandshake } from "lucide-react";

const ICONS = [
    { icon: <User className="w-6 h-6" />, id: "founder" },
    { icon: <MapPin className="w-6 h-6" />, id: "location" },
    { icon: <Briefcase className="w-6 h-6" />, id: "work" },
    { icon: <TrendingUp className="w-6 h-6" />, id: "investor" },
    { icon: <Handshake className="w-6 h-6" />, id: "connect" },
    { icon: <Building2 className="w-6 h-6" />, id: "space" },
    { icon: <Rocket className="w-6 h-6" />, id: "startup" },
    { icon: <Lightbulb className="w-6 h-6" />, id: "idea" },
    { icon: <Users className="w-6 h-6" />, id: "community" },
    { icon: <Target className="w-6 h-6" />, id: "goal" },
    { icon: <Search className="w-6 h-6" />, id: "search" },
    { icon: <MessageSquare className="w-6 h-6" />, id: "chat" },
    { icon: <Zap className="w-6 h-6" />, id: "energy" },
    { icon: <Globe className="w-6 h-6" />, id: "network" },
    { icon: <HeartHandshake className="w-6 h-6" />, id: "help" },
];

export function LocalExploration() {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement[]>([]);

    // Duplicate icons for seamless loop
    const displayIcons = [...ICONS, ...ICONS, ...ICONS];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const totalWidth = container.scrollWidth / 3; // Approx width of one set

        // 1. Horizontal Loop
        gsap.to(container, {
            x: `-=${totalWidth}`,
            duration: 20,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
            }
        });

        // 2. Sine Wave Vertical Animation
        iconsRef.current.forEach((icon, i) => {
            if (!icon) return;

            // Staggered sine wave
            gsap.to(icon, {
                y: 30, // Amplitude
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.1 // Stagger depends on index to create wave shape
            });
        });

    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !iconsRef.current.includes(el)) {
            iconsRef.current.push(el);
        }
    };

    return (
        <section className="relative py-24 bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-zinc-900 flex flex-col items-center justify-center">

            {/* Icon Wave Animation */}
            <div className="w-full relative py-8 overflow-hidden mb-6 md:mb-12">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-20 pointer-events-none" />

                <div
                    ref={containerRef}
                    className="flex gap-8 pl-10 w-max items-center"
                >
                    {displayIcons.map((item, i) => (
                        <div
                            key={`${item.id}-${i}`}
                            ref={addToRefs}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors duration-300"
                        >
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>

            {/* Split Content: Text Left, Tea Stall Right */}
            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-20 pb-12">

                {/* Left: Text */}
                <div className="text-center md:text-left space-y-6">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black dark:text-white leading-[0.9]">
                        Local help for <span className="text-gray-400 dark:text-gray-600 block md:inline">big dreams</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-lg mx-auto md:mx-0">
                        For local founders, we’ve enabled instant connections to find co-founders, freelancers, and investors - right next door.
                    </p>
                </div>

                {/* Right: Tea Stall Image */}
                <div className="hidden md:flex justify-center md:justify-end relative">
                    <FloatingImage
                        src="/antigravity/tea-stall-illustration.png"
                        alt="Local Tea Stall"
                        className="w-[280px] md:w-[450px] lg:w-[550px] object-contain drop-shadow-2xl animate-float-primary grayscale"
                        delay="0s"
                    />
                </div>
            </div>

            {/* Optional Label */}
            <p className="mt-0 text-sm text-gray-400 font-medium tracking-widest uppercase">
                Powering Local Innovation
            </p>

        </section>
    );
}

function FloatingImage({ src, alt, className, delay }: { src: string, alt: string, className: string, delay: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
        <div
            className={`select-none animate-enter filter drop-shadow-lg ${className}`}
            style={{
                animationDelay: delay,
            }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-auto object-contain"
            />
        </div>
    );
}
