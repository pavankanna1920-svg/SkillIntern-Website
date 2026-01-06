"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard, Users, MessageSquare, HelpCircle, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

export function AdminMobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const items = [
        { title: "Users", href: "/admin/users", icon: Users },
        { title: "Connections", href: "/admin/connections", icon: MessageSquare },
        { title: "Support Requests", href: "/admin/support", icon: HelpCircle },
    ];

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:text-foreground/80">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Admin Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-background border-r border-border w-72 flex flex-col text-foreground">
                <SheetTitle className="sr-only">Admin Navigation</SheetTitle>

                <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold text-foreground">Starto Admin</h1>
                    <p className="text-sm text-muted-foreground">Internal Panel</p>
                </div>

                <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Button
                                key={item.href}
                                variant={"ghost"}
                                className={`w-full justify-start ${isActive ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                                asChild
                            >
                                <Link href={item.href}>
                                    <Icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                </Link>
                            </Button>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-border space-y-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        asChild
                    >
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Back to App
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:bg-destructive/10"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
