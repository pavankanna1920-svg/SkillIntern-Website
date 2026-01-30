"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Zap, HandHeart } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or useToast

interface InstantHelpResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: {
        id: string;
        category: string;
        type: "NEED" | "OFFER";
        userName: string;
    };
}

export function InstantHelpResponseModal({ isOpen, onClose, request }: InstantHelpResponseModalProps) {
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const isOffer = request.type === "OFFER";

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/help-requests/respond", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requestId: request.id,
                    message: message // API needs to be updated to accept message if not already
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to respond");
            }

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setIsSuccess(false);
                setMessage("");
            }, 2000);

        } catch (error: any) {
            console.error(error);
            // alert(error.message); // basic fallback
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 animate-in zoom-in duration-300">
                            <Zap className="w-8 h-8 fill-current" />
                        </div>
                        <h3 className="text-xl font-serif">Response Sent!</h3>
                        <p className="text-sm text-zinc-400 text-center">
                            {request.userName} has been notified directly on their dashboard.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${isOffer ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                            {isOffer ? <HandHeart className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                        </div>
                        <DialogTitle className="font-serif text-xl">
                            {isOffer ? "Accept Help Offer" : "Offer Help"}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-zinc-400">
                        {isOffer
                            ? `Connect with ${request.userName} for ${request.category}.`
                            : `Let ${request.userName} know you can help with ${request.category}.`
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <Textarea
                        placeholder={isOffer ? "I'm interested in your offer..." : "I can help with this..."}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-zinc-900 border-zinc-800 min-h-[100px] text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700"
                    />
                </div>

                <DialogFooter className="sm:justify-between gap-2">
                    <Button variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-zinc-900">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !message.trim()}
                        className={`font-bold tracking-wide ${isOffer ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Instant Response"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
