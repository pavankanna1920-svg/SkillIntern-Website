"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GlobalBackground() {
    // Only render on client to avoid hydration mismatch with themes
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Light Mode Orbs */}
            <div className="dark:hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-200/30 rounded-full blur-[120px] animate-float-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[120px] animate-float-delayed" />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-red-100/30 rounded-full blur-[120px] animate-float-reverse" />
            </div>

            {/* Dark Mode Orbs */}
            <div className="hidden dark:block">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px] animate-float-slow" />
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-float-delayed" />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-red-900/05 rounded-full blur-[120px] animate-float-reverse" />
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
}
