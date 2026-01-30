"use client";

import { BarChart3, Target, ShieldAlert } from "lucide-react";

export function MarketClarity() {
    return (
        <section className="relative py-24 bg-gray-50 dark:bg-black border-t border-gray-100 dark:border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-16">
                    Understand the market <br className="hidden md:block" />
                    <span className="text-gray-400">before you build.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">

                    {/* 1. Demand Signals */}
                    <div className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-3">Demand Signals</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                            See what people nearby are asking for and building. Validate your idea with real local data.
                        </p>
                    </div>

                    {/* 2. Competition Awareness */}
                    <div className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-3">Competition Awareness</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                            Know who’s already working in the same space around you. Find gaps instead of crowding the market.
                        </p>
                    </div>

                    {/* 3. Risk Indicators */}
                    <div className="group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-3">Risk Indicators</h3>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                            Identify gaps, saturation, and early warning signs. Save months of time by building right.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
