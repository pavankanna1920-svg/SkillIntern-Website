"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Zap } from "lucide-react";
import { useSession } from "next-auth/react";

const CATEGORIES = [
    { id: "tech", label: "Tech Support" },
    { id: "design", label: "Design & Creative" },
    { id: "founder", label: "Founder Advice" },
    { id: "logistics", label: "Logistics & Delivery" },
    { id: "emergency", label: "Emergency" },
    { id: "plumbing", label: "Plumbing & Repairs" },
    { id: "food", label: "Food & Catering" },
    { id: "hospitality", label: "Hotel & Stay" },
    { id: "local_business", label: "Local Shop / Retail" },
    { id: "labour", label: "General Labour" }
];

interface PostNeedModalProps {
    isOpen: boolean;
    onClose: () => void;
    mapCenter: { lat: number; lng: number };
    initialType?: "NEED" | "OFFER";
}

export function PostNeedModal({ isOpen, onClose, mapCenter, initialType = "NEED" }: PostNeedModalProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"NEED" | "OFFER">(initialType);

    // Voice Recording State
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [audioBase64, setAudioBase64] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        if (isOpen) setType(initialType);
    }, [isOpen, initialType]);

    const isNeed = type === "NEED";

    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);

                // Convert to Base64
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    // Client-side Size Check (Stricter 1.2MB limit for Vercel/Next.js body limits)
                    if (base64String.length > 1.2 * 1024 * 1024) {
                        alert("Voice message is too long. Please keep it under 20 seconds.");
                        setAudioUrl(null);
                        setAudioBase64(null);
                        return;
                    }
                    setAudioBase64(base64String);
                };
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            // Start Timer & Auto-stop at 30s
            timerRef.current = setInterval(() => {
                setRecordingTime((prev: number) => {
                    if (prev >= 30) {
                        stopRecording();
                        return 30;
                    }
                    return prev + 1;
                });
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone", err);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handleSubmit = async () => {
        // Allow submission if description OR audio is present.
        if (!category || (!description && !audioBase64)) return;
        setLoading(true);

        try {
            let lat = mapCenter.lat;
            let lng = mapCenter.lng;

            if (lat === 0 && lng === 0 && "geolocation" in navigator) {
                try {
                    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    lat = pos.coords.latitude;
                    lng = pos.coords.longitude;
                } catch (e) {
                    console.warn("Could not get location, falling back to 0,0");
                }
            }

            console.log("Submitting Payload. Audio Size:", audioBase64?.length); // DEBUG

            const res = await fetch("/api/help-requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category,
                    description,
                    type,
                    latitude: lat,
                    longitude: lng,
                    voiceUrl: audioBase64 // Sending Audio
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to post need");
            }

            onClose();
        } catch (error: any) {
            console.error(error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white sm:max-w-md ${isNeed ? 'selection:bg-red-500' : 'selection:bg-green-500'}`}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
                        {isNeed ? <Zap className="w-5 h-5 text-red-600 dark:text-red-500 fill-current" /> : <Loader2 className="w-5 h-5 text-green-600 dark:text-green-500 fill-current" />}
                        {isNeed ? "Broadcast Need" : "Offer Availability"}
                    </DialogTitle>
                </DialogHeader>

                {/* Toggle Logic */}
                <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-lg mb-4">
                    <button
                        onClick={() => setType("NEED")}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${isNeed
                            ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow ring-1 ring-black/5 dark:ring-red-900'
                            : 'text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300'
                            }`}
                    >
                        <span className={isNeed ? "text-red-600 dark:text-red-500" : ""}>I Need Help</span>
                    </button>
                    <button
                        onClick={() => setType("OFFER")}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${!isNeed
                            ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow ring-1 ring-black/5 dark:ring-green-900'
                            : 'text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-300'
                            }`}
                    >
                        <span className={!isNeed ? "text-green-600 dark:text-green-500" : ""}>I Can Help</span>
                    </button>
                </div>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label className="text-black dark:text-white">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-black dark:text-white max-h-[200px]">
                                {CATEGORIES.map((cat) => (
                                    <SelectItem
                                        key={cat.id}
                                        value={cat.label}
                                        className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 focus:bg-gray-100 dark:focus:bg-zinc-800 cursor-pointer"
                                    >
                                        {cat.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-black dark:text-white">{isNeed ? "Description of Need" : "What can you offer?"}</Label>
                        <div className="relative">
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={isNeed ? "Briefly describe your need..." : "Describe your expertise..."}
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 min-h-[100px] pr-12 resize-none focus-visible:ring-black dark:focus-visible:ring-zinc-700 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                                style={{ borderColor: isNeed ? '' : 'rgba(34, 197, 94, 0.2)' }}
                            />
                            {/* Mic Button */}
                            <button
                                onClick={handleMicClick}
                                className={`absolute bottom-3 right-3 p-3 rounded-full transition-all flex items-center justify-center z-10 ${isRecording
                                    ? "bg-red-600 text-white animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.7)]"
                                    : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-black dark:hover:text-white border border-gray-200 dark:border-zinc-700"
                                    }`}
                                title={isRecording ? "Stop Recording" : "Record Voice Message"}
                                type="button"
                            >
                                {isRecording ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-sm bg-white animate-pulse" />
                                        <span className="text-[10px] font-mono font-bold">00:{recordingTime.toString().padStart(2, '0')}</span>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                                )}
                            </button>
                        </div>

                        {/* Audio Preview */}
                        {audioUrl && (
                            <div className="bg-gray-50 dark:bg-zinc-900/50 p-2 rounded-lg border border-gray-200 dark:border-white/5 flex flex-col gap-2">
                                <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-zinc-500 font-bold ml-1">Voice Message Preview</span>
                                <audio src={audioUrl} controls className="w-full h-8" />
                                <button onClick={() => { setAudioUrl(null); setAudioBase64(null); }} className="text-[10px] text-red-500 hover:underline self-end">Delete Recording</button>
                            </div>
                        )}

                        <p className="text-[10px] text-gray-500 dark:text-zinc-500">
                            *Active for 30 minutes. Only visible to nearby members.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-500 dark:text-zinc-400">Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || (!category || (!description && !audioBase64))}
                        className={`font-bold tracking-wider uppercase text-white ${isNeed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isNeed ? "Broadcast Need" : "Post Offer"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
