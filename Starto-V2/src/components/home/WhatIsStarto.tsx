"use client";

import { MapPin, MessageSquare } from "lucide-react";
import Image from "next/image";

export function WhatIsStarto() {
    return (
        <section className="py-24 bg-[#F8F9FB] border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0D12]">
                            What is Starto?
                        </h2>
                        <div className="space-y-6 text-lg md:text-xl text-gray-500 leading-relaxed">
                            <p>
                                Starto is a local startup ecosystem on a map.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2.5 h-2.5 bg-black rounded-full" />
                                    </div>
                                    <span>Founders post what they need.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-1">
                                        <div className="w-2.5 h-2.5 bg-black rounded-full" />
                                    </div>
                                    <span>Helpers nearby respond instantly.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Literal Visual (Map Abstraction) */}
                    <div className="relative h-[400px] w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden rotate-1 hover:rotate-0 transition-transform duration-500">
                        {/* Abstract Map Grid */}
                        <div className="absolute inset-0 bg-[#F5F5F5] opacity-50" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                        {/* Central Node (Founder) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-24 h-24 bg-red-500/10 rounded-full animate-ping absolute inset-0" />
                                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-red-500 relative z-10">
                                    <MessageSquare className="w-8 h-8 text-red-500" />
                                </div>
                                {/* Connecting Lines */}
                                <div className="absolute top-1/2 left-full w-24 h-0.5 bg-gray-300 origin-left animate-pulse" />
                                <div className="absolute top-1/2 right-full w-24 h-0.5 bg-gray-300 origin-right animate-pulse" />
                            </div>
                        </div>

                        {/* Peripheral Nodes (Helpers) */}
                        <div className="absolute top-20 left-20 bg-white p-3 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-xs font-bold text-gray-700">Dev</span>
                        </div>
                        <div className="absolute bottom-20 right-20 bg-white p-3 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-bold text-gray-700">Investor</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
