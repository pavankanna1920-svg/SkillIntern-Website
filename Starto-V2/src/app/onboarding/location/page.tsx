"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin } from "lucide-react";
import LocationSelector from "@/components/location/LocationSelector";
import { toast } from "sonner";

function LocationContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    // Get Role from URL safely
    const searchParams = useSearchParams();
    const role = searchParams.get("role");

    useEffect(() => {
        // Wait for auth to settle
        if (status === "loading") return;

        if (!role && status === "authenticated") {
            // Fallback: If no role in URL, kick back
            // Using setTimeout to allow hydration to complete potentially
            console.warn("No role found in URL, redirecting to role selection.");
            router.replace("/onboarding/role");
        }
    }, [role, status, router]);

    const handleContinue = () => {
        if (!selectedLocation?.city || !selectedLocation?.latitude) {
            toast.error("Please select a valid location to continue.");
            return;
        }

        if (!role) {
            toast.error("Role missing. Please restart onboarding.");
            router.push("/onboarding/role");
            return;
        }

        setLoading(true);
        // Pass everything to Profile Step
        // URL Encode the location data
        const params = new URLSearchParams();
        params.set("role", role);
        params.set("lat", selectedLocation.latitude.toString());
        params.set("lng", selectedLocation.longitude.toString());
        params.set("city", selectedLocation.city || "");
        params.set("state", selectedLocation.state || "");
        params.set("country", selectedLocation.country || "");
        params.set("pincode", selectedLocation.pincode || "");

        router.push(`/onboarding/profile?${params.toString()}`);
    };

    if (status === "loading") return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Where are you based?</h2>
                    <p className="mt-2 text-muted-foreground">
                        Your location helps us connect you with nearby opportunities.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm text-left">
                    <label className="block text-sm font-medium mb-3">Search your city or area</label>
                    <LocationSelector onSelect={(loc) => setSelectedLocation(loc)} />

                    <div className="mt-6">
                        <button
                            onClick={handleContinue}
                            disabled={loading}
                            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Enter Dashboard"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OnboardingLocationPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <LocationContent />
        </Suspense>
    );
}
