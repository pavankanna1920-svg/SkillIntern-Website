"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, HandHeart, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostNeedModal } from "@/components/nearby/PostNeedModal";
import { useUser } from "@/hooks/useUser";

interface ActiveRequest {
    id: string;
    type: "NEED" | "OFFER";
    category: string;
    expiresAt: string;
    description: string;
}

export function InstantHelpWidget() {
    const queryClient = useQueryClient();
    const [timer, setTimer] = useState<string>("30:00");
    const [showPostModal, setShowPostModal] = useState(false);
    const [postMode, setPostMode] = useState<"NEED" | "OFFER">("NEED");

    // Fetch My Active Request
    const { data: myStatus, isLoading } = useQuery({
        queryKey: ["my-help-status"],
        queryFn: async () => {
            const res = await fetch("/api/help-requests/status");
            if (!res.ok) return null;
            const data = await res.json();
            return data;
        },
        refetchInterval: 10000
    });

    const resolveMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/help-requests", { method: "PATCH" });
            if (!res.ok) throw new Error("Failed");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-help-status"] });
            queryClient.invalidateQueries({ queryKey: ["pulse"] });
        }
    });

    // Countdown Logic
    useEffect(() => {
        if (!myStatus?.expiresAt) return;
        const interval = setInterval(() => {
            const expiry = new Date(myStatus.expiresAt).getTime();
            const now = Date.now();
            const diff = expiry - now;

            if (diff <= 0) {
                setTimer("Expired");
                queryClient.invalidateQueries({ queryKey: ["my-help-status"] });
                return;
            }

            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setTimer(`${m}:${s < 10 ? '0' + s : s}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [myStatus]);

    const handlePost = (type: "NEED" | "OFFER") => {
        setPostMode(type);
        setShowPostModal(true);
    };

    if (isLoading) return <div className="animate-pulse h-[380px] bg-gray-50 dark:bg-zinc-900 rounded-2xl"></div>;

    // A. ACTIVE STATE (Black & White Theme)
    if (myStatus) {
        const isNeed = myStatus.type === "NEED";
        return (
            <div className="bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-8 rounded-2xl shadow-sm min-h-[380px] flex flex-col relative overflow-hidden">

                {/* Active Indicator Pulse */}
                <div className="absolute top-0 left-0 w-full h-1 bg-black dark:bg-white animate-pulse"></div>

                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center border
                            ${isNeed
                                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                                : 'bg-white text-black border-black/10 dark:bg-black dark:text-white dark:border-white/20'}
                        `}>
                            {isNeed ? <Zap className="w-5 h-5 fill-current" /> : <HandHeart className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-medium text-black dark:text-white">
                                {isNeed ? "Requesting Help" : "Offering Help"}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">
                                    Active • {myStatus.category}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="flex items-center gap-2 text-black dark:text-white">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-2xl font-mono font-bold tracking-tight">{timer}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-gray-50 dark:bg-zinc-900/50 rounded-lg border border-gray-100 dark:border-white/5">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{myStatus.description}"</p>
                </div>

                {/* RESPONSES SECTION */}
                {myStatus.responses && myStatus.responses.length > 0 ? (
                    <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                Responses ({myStatus.responses.length})
                            </h4>
                        </div>

                        <div className="space-y-3">
                            {myStatus.responses.map((res: any) => (
                                <div key={res.id} className="group bg-white dark:bg-black border border-gray-200 dark:border-white/10 p-4 rounded-xl flex items-center justify-between transition-all hover:border-black/20 dark:hover:border-white/30 hover:shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden border border-gray-200 dark:border-white/10">
                                            {res.helper.image ? (
                                                <img src={res.helper.image} alt={res.helper.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">{res.helper.name?.[0]}</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-black dark:text-white">{res.helper.name}</span>
                                                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5">
                                                    {res.helper.activeRole || "HELPER"}
                                                </span>
                                            </div>
                                            {res.message && <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">"{res.message}"</p>}
                                        </div>
                                    </div>

                                    {res.status === "ACCEPTED" ? (
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-900/30">
                                            <CheckCircle2 className="w-3 h-3" /> Connected
                                        </div>
                                    ) : (
                                        <Button
                                            size="sm"
                                            className="h-8 text-[10px] font-bold tracking-wider uppercase bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
                                            onClick={async () => {
                                                try {
                                                    const response = await fetch("/api/help-requests/accept", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ responseId: res.id })
                                                    });
                                                    const result = await response.json();
                                                    if (result.success && result.whatsappLink) {
                                                        window.open(result.whatsappLink, '_blank');
                                                    } else {
                                                        alert("Helper has no phone number connected.");
                                                    }
                                                    queryClient.invalidateQueries({ queryKey: ["my-help-status"] });
                                                } catch (e) {
                                                    console.error(e);
                                                }
                                            }}
                                        >
                                            Accept
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-xl mb-6">
                        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20 mb-2 animate-ping"></div>
                        <p className="text-xs text-gray-400 font-medium">Waiting for community response...</p>
                    </div>
                )}

                <Button
                    onClick={() => resolveMutation.mutate()}
                    disabled={resolveMutation.isPending}
                    variant="outline"
                    className="w-full h-12 text-xs font-bold uppercase tracking-widest border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/30 transition-all"
                >
                    {resolveMutation.isPending ? "Ending..." : "End Request & Mark Resolved"}
                </Button>
            </div>
        )
    }

    // B. INACTIVE STATE (Black & White Theme)
    return (
        <div className="bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 p-8 rounded-2xl shadow-sm min-h-[380px] flex flex-col justify-between group hover:border-black/20 dark:hover:border-white/20 transition-colors">
            <div>
                <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-black/5 dark:shadow-white/5">
                    <Zap className="w-6 h-6 text-white dark:text-black fill-current" />
                </div>
                <h2 className="text-3xl font-serif font-medium mb-3 text-black dark:text-white">Instant Help</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-sm">
                    Connect instantly with the network. Request urgent assistance or offer your availability to others nearby.
                </p>
            </div>

            <div className="space-y-3">
                <Button
                    onClick={() => handlePost("NEED")}
                    className="w-full h-14 bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white hover:shadow-md transition-all rounded-xl flex items-center justify-between px-6 group/btn"
                >
                    <span className="flex items-center gap-3 font-bold tracking-wider uppercase text-xs">
                        <span className="w-2 h-2 rounded-full bg-red-500 group-hover/btn:animate-pulse"></span>
                        I Need Help
                    </span>
                    <Zap className="w-4 h-4 text-gray-400 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors" />
                </Button>

                <Button
                    onClick={() => handlePost("OFFER")}
                    className="w-full h-14 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-all rounded-xl flex items-center justify-between px-6 group/btn"
                >
                    <span className="flex items-center gap-3 font-bold tracking-wider uppercase text-xs">
                        <span className="w-2 h-2 rounded-full bg-green-400 group-hover/btn:animate-pulse"></span>
                        I Can Help
                    </span>
                    <HandHeart className="w-4 h-4 text-white/50 dark:text-black/50 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors" />
                </Button>
            </div>

            <PostNeedModal
                isOpen={showPostModal}
                onClose={() => {
                    setShowPostModal(false);
                    queryClient.invalidateQueries({ queryKey: ["my-help-status"] });
                }}
                mapCenter={{ lat: 0, lng: 0 }}
                initialType={postMode}
            />
        </div>
    );
}
