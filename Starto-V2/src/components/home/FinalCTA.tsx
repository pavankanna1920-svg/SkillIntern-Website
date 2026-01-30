"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [exploreText, setExploreText] = useState("Explore Nearby");

    // Canvas Animation - "Local Momentum" (Radial Pulse)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let width = canvas.width;
        let height = canvas.height;

        const resize = () => {
            if (!sectionRef.current) return;
            canvas.width = sectionRef.current.clientWidth;
            canvas.height = sectionRef.current.clientHeight;
            width = canvas.width;
            height = canvas.height;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            angle: number;
            distance: number;
            speed: number;
            opacity: number;
            pulseSpeed: number;

            constructor() {
                this.x = width / 2;
                this.y = height / 2;
                this.angle = Math.random() * Math.PI * 2;
                this.distance = Math.random() * (Math.min(width, height) / 2); // Start random distance
                this.speed = Math.random() * 0.2 + 0.05; // Very slow expansion
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
            }

            update() {
                // Radial Movement
                this.distance += this.speed;

                // Reset if out of bounds
                if (this.distance > Math.max(width, height) / 1.5) {
                    this.distance = 0;
                    this.opacity = 0;
                }

                // Update position
                this.x = width / 2 + Math.cos(this.angle) * this.distance;
                this.y = height / 2 + Math.sin(this.angle) * this.distance;

                // Pulse Opacity
                this.opacity += Math.sin(Date.now() * this.pulseSpeed) * 0.005;
                if (this.opacity < 0) this.opacity = 0.1;
                if (this.opacity > 0.4) this.opacity = 0.4;
            }

            draw() {
                if (!ctx) return;
                const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');
                const color = isDark ? "255, 255, 255" : "0, 0, 0";

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${this.opacity * 0.2})`; // Very subtle 5-10% effective opacity
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = 80;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
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

    // Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Headline Fade
            gsap.from(textRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Image Slide In
            gsap.from(imageRef.current, {
                x: -50,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Right Content Slide In
            gsap.from(contentRef.current, {
                x: 50,
                opacity: 0,
                duration: 1.2,
                delay: 0.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-0 md:pt-0 pb-12 md:pb-16 bg-white dark:bg-black border-t border-transparent overflow-hidden">

            {/* Background Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent z-0 pointer-events-none opacity-50" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* Headline */}
                <div ref={textRef} className="text-center mb-8 md:mb-12">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-black dark:text-white">
                        Start where you are.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-5xl mx-auto">

                    {/* Left: Founder Image */}
                    <div ref={imageRef} className="relative flex justify-center md:justify-end">
                        <div className="relative w-80 md:w-96 lg:w-[480px] aspect-[4/5] object-contain">
                            <Image
                                src="/antigravity/starto-founder.png"
                                alt="Founder"
                                fill
                                className="hidden md:block object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                            <Image
                                src="/antigravity/hero-mobile-duo.png"
                                alt="Founders"
                                fill
                                className="block md:hidden object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Right: Content & Buttons */}
                    <div ref={contentRef} className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
                        <h3 className="text-3xl md:text-5xl font-bold text-gray-400 dark:text-zinc-600 leading-tight">
                            Build with people <br />
                            <span className="text-black dark:text-white">already moving.</span>
                        </h3>

                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md">
                            Join founders, freelancers, and investors active in your area right now.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button
                                className="h-14 px-8 text-lg rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-transform shadow-xl hover:shadow-2xl shadow-black/10 duration-300"
                                onClick={() => router.push('/onboarding')}
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                className="h-14 px-8 text-lg rounded-full border-2 border-gray-200 dark:border-zinc-800 hover:border-black dark:hover:border-white text-black dark:text-white hover:bg-transparent transition-all duration-300 group"
                                onClick={() => router.push('/map')}
                                onMouseEnter={() => setExploreText("See activity")}
                                onMouseLeave={() => setExploreText("Explore Nearby")}
                            >
                                <span className="flex items-center gap-2">
                                    {exploreText === "Explore Nearby" ? <MapPin className="w-5 h-5" /> : <Activity className="w-5 h-5 animate-pulse" />}
                                    {exploreText}
                                </span>
                            </Button>
                        </div>

                        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium animate-pulse pl-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 mb-0.5" />
                            Live activity near you
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
