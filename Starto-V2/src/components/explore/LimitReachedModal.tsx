import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

interface LimitReachedModalProps {
    open: boolean;
}

export function LimitReachedModal({ open }: LimitReachedModalProps) {
    return (
        <Dialog open={open} onOpenChange={() => { }}>
            {/* Prevent closing by passing empty handler or controlling open strictly */}
            <DialogContent className="max-w-md bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:outline-none pointer-events-auto" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader className="items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-xl font-bold">Free Limit Reached</DialogTitle>
                    <DialogDescription>
                        You've used your 3 free market searches today.
                        <br /><br />
                        Create a <b>free account</b> to continue exploring unlimited market insights and access advanced features.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2 sm:gap-2 mt-4 sm:flex-col">
                    <Link href="/onboarding" className="w-full">
                        <Button className="w-full font-bold" size="lg">
                            Create Free Account
                        </Button>
                    </Link>
                    <Link href="/login" className="w-full">
                        <Button variant="ghost" className="w-full text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            Already have an account? Login
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
