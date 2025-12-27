"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function BetaBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 flex items-center justify-between text-yellow-600 dark:text-yellow-500 text-xs md:text-sm font-medium">
            <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>
                    <span className="font-bold">Beta Access:</span> Starto is currently in testing. You may encounter minor issues. Your feedback is appreciated!
                </span>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="hover:bg-yellow-500/20 p-1 rounded-md transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
