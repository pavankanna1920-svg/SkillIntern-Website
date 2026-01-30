"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MinimalSidebar } from "./MinimalSidebar";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function DashboardHeaderMobile() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    return (
        <header className="md:hidden h-16 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-black flex items-center justify-between px-4 sticky top-0 z-40">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-lg">
                    S
                </div>
                <span className="font-bold text-lg text-black dark:text-white">Starto</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <button className="p-2 -mr-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                        <Menu className="w-6 h-6" />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72 border-r-0">
                    <MinimalSidebar className="w-full border-none" onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
        </header>
    );
}
