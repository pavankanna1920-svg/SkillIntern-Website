"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Need = {
    id: string;
    category: string;
    urgency: string;
    description: string;
    founder: {
        name: string;
        image: string | null;
        city: string;
    }
};

export function NewOpportunitiesWidget() {
    const router = useRouter();
    const [needs, setNeeds] = useState<Need[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNeeds() {
            try {
                // Reusing map API for now (returns all active needs)
                // In production, create a dedicated /api/needs/recent endpoint with limit=5
                const res = await fetch("/api/map");
                const data = await res.json();
                if (data.needs) {
                    setNeeds(data.needs.slice(0, 5)); // Take top 5
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchNeeds();
    }, []);

    return (
        <Card className="border-primary/20 bg-[#0A0A0A] overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    New Opportunities Nearby
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-white" onClick={() => router.push("/map")}>
                    View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <div className="flex justify-center py-6">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                    </div>
                ) : needs.length > 0 ? (
                    <div className="space-y-3">
                        {needs.map(need => (
                            <div key={need.id} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group" onClick={() => router.push(`/map?q=${need.category}`)}>
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="secondary" className="bg-white/10 text-gray-300 hover:bg-white/20 text-[10px]">
                                        {need.category}
                                    </Badge>
                                    <span className="text-[10px] text-red-400 font-mono">{need.urgency}</span>
                                </div>
                                <p className="text-sm text-gray-300 line-clamp-1 mb-2 group-hover:text-white transition-colors">{need.description}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-4 h-4 rounded-full bg-gray-700 overflow-hidden relative">
                                        {need.founder.image && <Image src={need.founder.image} alt={need.founder.name} fill className="object-cover" />}
                                    </div>
                                    <span>{need.founder.name}</span>
                                    {need.founder.city && (
                                        <>
                                            <span>•</span>
                                            <span>{need.founder.city}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        No active needs found nearby.
                    </div>
                )}

                <Button className="w-full bg-primary text-black hover:bg-white" onClick={() => router.push("/map")}>
                    Open Live Map
                </Button>
            </CardContent>
        </Card>
    );
}
