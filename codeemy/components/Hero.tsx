"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Rocket } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[100px]"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                    }}
                />
                <div
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]"
                    style={{
                        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-gray-900 space-y-8 text-center md:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-brand-primary text-sm font-medium">
                        <Rocket className="w-4 h-4 text-brand-primary" />
                        Master Skills That Matter
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900">
                        Join The Top 1% <br />
                        <span className="text-brand-primary">
                            Coding Experts
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
                        Your success story starts here — practical learning for a competitive world.
                        Gain expertise in Full Stack, AI, and more.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <Link
                            href="/courses"
                            className="px-8 py-4 bg-brand-primary text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(67,127,164,0.39)] hover:shadow-[0_6px_20px_rgba(67,127,164,0.23)] hover:scale-105"
                        >
                            Explore Programs <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-full font-bold text-lg text-gray-700 transition-all flex items-center justify-center gap-2 shadow-sm">
                            <Play className="w-5 h-5 fill-gray-700" /> Watch Demo
                        </button>
                    </div>

                    <div className="pt-10 flex items-center justify-center md:justify-start gap-12 border-t border-gray-100 mt-8">
                        <div>
                            <p className="text-3xl font-bold text-brand-secondary">1500+</p>
                            <p className="text-sm text-gray-500 mt-1">Learners</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-brand-secondary">50+</p>
                            <p className="text-sm text-gray-500 mt-1">Courses</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-brand-secondary">4.8</p>
                            <p className="text-sm text-gray-500 mt-1">Rating</p>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden md:block"
                >
                    <div className="relative z-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl shadow-blue-500/10 transform rotate-1 hover:rotate-0 transition-all duration-500 group">
                        {/* IDE Header */}
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Rocket className="w-4 h-4 text-brand-primary" />
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="font-mono text-sm leading-8">
                            <div className="group-hover:translate-x-1 transition-transform duration-300">
                                <span className="text-purple-600">const</span> <span className="text-blue-600">LearnToCode</span> <span className="text-gray-600">=</span> <span className="text-gray-600">()</span> <span className="text-purple-600">{'=>'}</span> <span className="text-gray-600">{'{'}</span>
                            </div>
                            <div className="pl-6 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                                <span className="text-purple-600">const</span> <span className="text-blue-600">expertise</span> <span className="text-gray-600">=</span> <span className="text-green-600">['React', 'Node', 'AI']</span><span className="text-gray-600">;</span>
                            </div>
                            <div className="pl-6 group-hover:translate-x-1 transition-transform duration-300 delay-100">
                                <span className="text-purple-600">return</span> <span className="text-gray-600">(</span>
                            </div>
                            <div className="pl-12 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                                <span className="text-gray-600">&lt;</span><span className="text-brand-primary font-bold">Future</span> <span className="text-blue-600">ready</span><span className="text-gray-600">={'{'}</span><span className="text-blue-600">true</span><span className="text-gray-600">{'}'} /&gt;</span>
                            </div>
                            <div className="pl-6 group-hover:translate-x-1 transition-transform duration-300 delay-200">
                                <span className="text-gray-600">);</span>
                            </div>
                            <div className="group-hover:translate-x-1 transition-transform duration-300 delay-300">
                                <span className="text-gray-600">{'}'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl border border-gray-100 shadow-xl flex items-center gap-3 z-20"
                    >
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Rocket className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Career Growth</p>
                            <p className="text-brand-primary font-bold">Guaranteed</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
