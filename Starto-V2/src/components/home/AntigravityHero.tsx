"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function AntigravityHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        router.push(`/explore?search=${encodeURIComponent(searchQuery)}`);
    };

    // Particle Animation Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = canvas.width;
        let height = canvas.height;

        const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
        const particleColor = isDark ? "rgba(255, 255, 255, " : "rgba(0, 0, 0, "; // Base color

        // Resize Handler
        const resize = () => {
            if (!containerRef.current) return;
            canvas.width = containerRef.current.clientWidth;
            canvas.height = containerRef.current.clientHeight;
            width = canvas.width;
            height = canvas.height;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1; // 1-3px
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `${particleColor}${this.alpha})`;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(width * 0.1, 150); // density
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div ref={containerRef} className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500">

            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60 z-0" />

            {/* Content Layer (The "Hero Center" - Source of Truth) */}
            <div className="relative z-20 text-center px-4 max-w-[720px] w-full flex flex-col items-center gap-6 md:gap-12 mt-6 md:mt-40">
                <div className="relative z-20 flex flex-col items-center gap-4 md:gap-8">
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] md:leading-[0.9]">
                        <span className="text-black dark:text-white font-[900]">Get instant help</span> <br />
                        <span className="text-gray-400 dark:text-gray-600 font-bold">from people near you</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl font-light px-2">
                        Connect instantly with local workers, freelancers, founders, and service providers - for urgent work and everyday needs.
                    </p>
                </div>

                {/* Minimalist Search (Capsule) */}
                <div className="w-full max-w-lg relative group z-30">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full h-14 md:h-16 flex items-center px-2 shadow-xl">
                        <div className="pl-4 md:pl-6 pr-2 md:pr-4 text-gray-400">
                            <Search className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <Input
                            className="flex-1 border-none bg-transparent h-full text-base md:text-lg placeholder:text-gray-400 focus-visible:ring-0 px-2 min-w-0"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <Button
                            onClick={handleSearch}
                            className="rounded-full h-10 md:h-12 px-4 md:px-8 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-bold text-sm md:text-base transition-transform active:scale-95 shrink-0"
                        >
                            <span className="hidden md:inline">Explore Now</span>
                            <span className="md:hidden">Explore</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Only: Extra CTAs */}
                <div className="flex flex-col gap-3 w-full max-w-sm md:hidden animate-enter pb-8">
                    <Button
                        size="lg"
                        className="w-full rounded-full h-12 font-bold text-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-transform active:scale-95"
                        onClick={() => router.push("/onboarding")}
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full rounded-full h-12 font-bold text-lg border-2 border-gray-200 dark:border-white/20 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-transform active:scale-95"
                        onClick={() => router.push("/nearby")}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <ArrowRight className="w-5 h-5 rotate-[-45deg]" /> Explore Nearby
                        </span>
                    </Button>
                </div>

            </div>
        </div>
    );
}
