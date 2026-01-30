"use client";

import Image from "next/image";

export function HowItWorks() {
    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/antigravity/people-grid-bg.png"
                    alt="Stand out from the crowd"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 animate-enter">

                <h2 className="text-5xl md:text-8xl font-bold tracking-tight leading-[0.95] drop-shadow-2xl">
                    <span className="text-white block">Don’t search</span>
                    <span className="text-white block">for help.</span>
                    <span className="text-amber-500 block mt-2">Let it find you.</span>
                </h2>

                <p className="text-xl md:text-3xl text-neutral-300 leading-relaxed font-light max-w-2xl mx-auto drop-shadow-lg">
                    Starto shows what you need to the right people nearby founders, freelancers, and supporters who can actually help.
                </p>

            </div>
        </section>
    );
}
