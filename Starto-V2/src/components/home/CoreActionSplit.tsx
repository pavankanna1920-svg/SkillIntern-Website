"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, User, Briefcase, Zap, Search, Users, Code, PenTool, Lightbulb, Wallet, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CoreActionSplit() {
    const router = useRouter();
    const sectionRef = useRef(null);
    const leftCardRef = useRef(null);
    const rightCardRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title fade in
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Left card slide in
            gsap.from(leftCardRef.current, {
                x: -50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // Right card slide in
            gsap.from(rightCardRef.current, {
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
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
        <section ref={sectionRef} className="relative py-16 md:py-20 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div ref={titleRef} className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-tight">
                        Two intentions. One platform.
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
                        Built for both sides of the journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* Left Card: I WANT HELP */}
                    <div
                        ref={leftCardRef}
                        className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 hover:-translate-y-1"
                    >
                        <div className="flex flex-col h-full items-start">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">I want help</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 font-light">
                                Stuck or starting out? Post what you need and let the right people nearby find you.
                            </p>

                            <div className="w-full space-y-4 mb-10 flex-grow">
                                <ExampleItem icon={<Users className="w-4 h-4" />} text="Need a co-founder" />
                                <ExampleItem icon={<PenTool className="w-4 h-4" />} text="Looking for a designer" />
                                <ExampleItem icon={<Lightbulb className="w-4 h-4" />} text="Validating an idea" />
                                <ExampleItem icon={<Users className="w-4 h-4" />} text="Finding early users" />
                                <ExampleItem icon={<Search className="w-4 h-4" />} text="Understanding market demand" />
                            </div>

                            <Button
                                onClick={() => router.push("/onboarding/role?type=founder")}
                                className="w-full h-14 text-lg bg-black dark:bg-white text-white dark:text-black rounded-xl group-hover:bg-gray-800 dark:group-hover:bg-gray-200 transition-colors"
                            >
                                Post a Need <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Card: I CAN HELP */}
                    <div
                        ref={rightCardRef}
                        className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 hover:-translate-y-1"
                    >
                        <div className="flex flex-col h-full items-start">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">I can help</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 font-light">
                                Have skills, experience, or resources? Discover real needs happening around you.
                            </p>

                            <div className="w-full space-y-4 mb-10 flex-grow">
                                <ExampleItem icon={<Briefcase className="w-4 h-4" />} text="Freelancers" />
                                <ExampleItem icon={<Code className="w-4 h-4" />} text="Developers" />
                                <ExampleItem icon={<PenTool className="w-4 h-4" />} text="Designers" />
                                <ExampleItem icon={<Zap className="w-4 h-4" />} text="Marketers" />
                                <ExampleItem icon={<Wallet className="w-4 h-4" />} text="Investors" />
                                <ExampleItem icon={<Building2 className="w-4 h-4" />} text="Space providers" />
                            </div>

                            <Button
                                onClick={() => router.push("/onboarding/role?type=helper")}
                                variant="outline"
                                className="w-full h-14 text-lg border-2 border-gray-200 dark:border-zinc-700 text-black dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-black dark:hover:border-white transition-all"
                            >
                                Explore Opportunities <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ExampleItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800/50 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 transition-colors">
            <span className="text-gray-400 dark:text-gray-500">{icon}</span>
            <span className="font-medium text-sm md:text-base">{text}</span>
        </div>
    )
}
