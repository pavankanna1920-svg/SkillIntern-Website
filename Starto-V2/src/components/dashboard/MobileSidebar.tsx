"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MinimalSidebar } from "./MinimalSidebar"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden fixed top-24 left-4 z-40 bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-md rounded-full w-10 h-10 flex items-center justify-center">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 border-r border-gray-100 dark:border-white/10 bg-white dark:bg-black">
                {/* Reuse MinimalSidebar but force expanded width style if needed, or just let it be. 
                     MinimalSidebar is built to handle className. */}
                <MinimalSidebar className="w-full h-full border-none" />
            </SheetContent>
        </Sheet>
    )
}
