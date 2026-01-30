"use client";

import * as React from "react";
import { formatDistanceToNow } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RefreshCw, Send, Phone, Mail, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type HelpRequest = {
    id: string;
    type: "NEED" | "OFFER";
    category: string;
    description: string;
    voiceUrl: string | null;
    status: "ACTIVE" | "RESOLVED" | "EXPIRED";
    createdAt: string;
    expiresAt: string;
    user: {
        name: string | null;
        email: string | null;
        phoneNumber: string | null;
        role: string;
    };
    responses?: {
        id: string;
        status: string;
        helper: {
            name: string | null;
            email: string | null;
            phoneNumber: string | null;
            role: string;
        };
    }[];
};

export function InstantHelpTable() {
    const [requests, setRequests] = React.useState<HelpRequest[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [playingId, setPlayingId] = React.useState<string | null>(null);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/help-requests");
            const data = await res.json();
            if (Array.isArray(data)) {
                setRequests(data);
            }
        } catch (error) {
            console.error("Failed to fetch help requests", error);
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 10000); // Poll every 10s for "Real Time" feel
        return () => clearInterval(interval);
    }, []);

    const toggleAudio = (url: string, id: string) => {
        if (playingId === id) {
            audioRef.current?.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) audioRef.current.pause();
            audioRef.current = new Audio(url);
            audioRef.current.onended = () => setPlayingId(null);
            audioRef.current.play();
            setPlayingId(id);
        }
    };

    const handleResolve = async (id: string) => {
        try {
            const res = await fetch("/api/admin/help-requests", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: "RESOLVED" }),
            });
            if (res.ok) {
                toast.success("Request marked as resolved");
                fetchRequests();
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    const getStatusColor = (status: string, expiresAt: string) => {
        if (status === "RESOLVED") return "bg-gray-100 text-gray-800 border-gray-200";
        if (new Date(expiresAt) < new Date()) return "bg-red-50 text-red-600 border-red-200";
        return "bg-emerald-50 text-emerald-600 border-emerald-200 animate-pulse";
    };

    return (
        <Card className="w-full shadow-sm border-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle className="text-xl font-bold">Live Help Tracking</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Real-time monitoring of all SOS signals and responses.</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchRequests} disabled={loading} className="gap-2">
                    <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
                    Refresh Data
                </Button>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border border-zinc-200 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-zinc-50/50">
                            <TableRow>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-[80px]">Type</TableHead>
                                <TableHead className="min-w-[200px]">Requester (User)</TableHead>
                                <TableHead className="min-w-[250px]">Request Details</TableHead>
                                <TableHead className="min-w-[200px]">Responses / Helpers</TableHead>
                                <TableHead className="w-[120px]">Time</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                        No active help requests found in the system.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                requests.map((req) => (
                                    <TableRow key={req.id} className="group hover:bg-zinc-50/50">
                                        <TableCell>
                                            <Badge variant="outline" className={cn("rounded-md px-2 py-0.5 border font-mono text-[10px] uppercase tracking-wider", getStatusColor(req.status, req.expiresAt))}>
                                                {new Date(req.expiresAt) < new Date() && req.status !== "RESOLVED" ? "EXPIRED" : req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={req.type === "NEED" ? "destructive" : "default"} className="rounded-md font-bold text-[10px]">
                                                {req.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="font-semibold text-sm flex items-center gap-2">
                                                    {req.user.name || "Anonymous User"}
                                                </div>
                                                <div className="flex flex-col text-xs text-muted-foreground gap-0.5">
                                                    <span className="flex items-center gap-1.5">
                                                        <Mail className="w-3 h-3" /> {req.user.email}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Phone className="w-3 h-3" /> {req.user.phoneNumber || "No Phone"}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-zinc-100 text-zinc-600 border-zinc-200">
                                                        {req.category}
                                                    </Badge>
                                                    {req.voiceUrl && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className={cn("h-6 w-6 rounded-full p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors", playingId === req.id && "bg-blue-50 text-blue-600")}
                                                            onClick={() => toggleAudio(req.voiceUrl!, req.id)}
                                                        >
                                                            {playingId === req.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-sm text-zinc-600 line-clamp-2 leading-relaxed" title={req.description}>
                                                    {req.description}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {req.responses && req.responses.length > 0 ? (
                                                <div className="flex flex-col gap-2">
                                                    {req.responses.map((res: any) => (
                                                        <div key={res.id} className="flex items-start gap-2 text-xs bg-zinc-50 p-2 rounded border border-zinc-100">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                                                            <div>
                                                                <span className="font-semibold text-zinc-700">{res.helper.name}</span>
                                                                <div className="text-zinc-500 flex gap-1 mt-0.5">
                                                                    <span>{res.helper.email}</span>
                                                                    <span>•</span>
                                                                    <span>{res.status}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className="text-zinc-400 font-normal border-zinc-200 bg-transparent">
                                                    No responses yet
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                                                {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {req.status !== "RESOLVED" && (
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full"
                                                    onClick={() => handleResolve(req.id)}
                                                    title="Mark Resolved"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
