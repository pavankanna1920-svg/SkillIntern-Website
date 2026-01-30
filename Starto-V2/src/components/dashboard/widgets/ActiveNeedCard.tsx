"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Megaphone, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Need = {
    id: string;
    category: string;
    urgency: string;
    description: string;
    isActive: boolean;
};

export function ActiveNeedCard() {
    const [need, setNeed] = useState<Need | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [category, setCategory] = useState("");
    const [urgency, setUrgency] = useState("MEDIUM");
    const [description, setDescription] = useState("");

    const fetchNeed = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/needs/active");
            const data = await res.json();
            setNeed(data.need || null);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNeed();
    }, []);

    const handlePostNeed = async () => {
        if (!category || !description) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch("/api/needs/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, urgency, description })
            });

            if (res.ok) {
                toast.success("Need Posted! It is now visible on the map.");
                setIsCreating(false);
                fetchNeed();
            } else {
                toast.error("Failed to post need.");
            }
        } catch (e) {
            toast.error("Error posting need");
        }
    };

    const handleSolveNeed = async () => {
        if (!need) return;
        try {
            await fetch(`/api/needs/active?id=${need.id}`, { method: "DELETE" });
            toast.success("Marked as solved!");
            setNeed(null);
        } catch (e) {
            toast.error("Error updating need");
        }
    };

    if (loading) return <Card className="animate-pulse h-48 bg-white/5 border-white/10" />;

    return (
        <Card className="border-white/10 bg-[#0A0A0A] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />

            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-red-500" />
                    Active Request
                </CardTitle>
            </CardHeader>

            <CardContent>
                {need ? (
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="border-red-500/30 text-red-400 bg-red-500/10">
                                    {need.urgency} Priority
                                </Badge>
                                <span className="text-xs text-gray-500">Visible on Map</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{need.category}</h3>
                            <p className="text-sm text-gray-400">{need.description}</p>
                        </div>
                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleSolveNeed}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark as Solved
                        </Button>
                    </div>
                ) : isCreating ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                        <Input
                            placeholder="What do you need? (e.g. Co-founder, UI Design)"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="bg-white/5 border-white/10"
                        />
                        <Select value={urgency} onValueChange={setUrgency}>
                            <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Urgency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LOW">Low</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea
                            placeholder="Briefly describe what you're looking for..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="bg-white/5 border-white/10 h-20"
                        />
                        <div className="flex gap-2">
                            <Button variant="ghost" className="flex-1" onClick={() => setIsCreating(false)}>Cancel</Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handlePostNeed}>Post to Map</Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6 space-y-3">
                        <p className="text-gray-400 text-sm">You have no active requests visible to the network.</p>
                        <Button onClick={() => setIsCreating(true)} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                            Post a Need
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
