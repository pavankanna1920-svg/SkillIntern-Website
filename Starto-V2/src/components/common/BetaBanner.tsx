"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BetaBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isVisible) return null;

    return (
        <div className="bg-white dark:bg-[#050505] border-b border-gray-100 dark:border-white/5 px-6 py-2 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black font-bold text-[10px]">
                    S
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-black dark:text-white">Starto Beta</span> — v2.0
                </span>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="hover:bg-black/5 dark:hover:bg-white/5 p-1 rounded-md transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
