"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import MapContainer from "@/components/map/MapContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Briefcase, Building, Users, Search, MoreHorizontal, Settings2, SlidersHorizontal, MousePointer2, Zap, HandHeart } from "lucide-react";
import { ConnectionRequestModal } from "@/components/connections/ConnectionRequestModal";
import { useJsApiLoader, Marker, OverlayView, Autocomplete, Circle } from "@react-google-maps/api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { vectorSilverStyle } from "@/components/map/vectorSilverStyle";
import { InstantHelpResponseModal } from "@/components/nearby/InstantHelpResponseModal"; // [NEW IMPORT]

// ... (existing imports)

const LIBRARIES: ("places")[] = ["places"];

interface NearbyProfile {
    profileId: string;
    userId: string;
    name: string | null;
    image: string | null;
    role: string | null;
    city: string | null;
    distance_km: number | null;
    latitude: number;
    longitude: number;
    headline?: string | null;
    skills?: string[];
    firmName?: string | null;
    description?: string | null; // Existing, ensure it's populated for requests
    website?: string | null;
    // New fields for Instant Help Popup
    requestCategory?: string | null;
    requestDescription?: string | null;
    requestType?: "NEED" | "OFFER" | null;
    voiceUrl?: string | null;
}

export default function NearbyPage() {
    const { isLoaded } = useJsApiLoader({
        id: "starto-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: LIBRARIES
    });

    const { data: session } = useSession();

    // -- STATE --
    const [mode, setMode] = useState<"nearby" | "pulse">("nearby");
    const [role, setRole] = useState("freelancer");
    const [city, setCity] = useState("YADGIRI, IN");
    const [radius, setRadius] = useState(20);
    const [zoom, setZoom] = useState(13);
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 16.7679, lng: 77.1351 });

    const [baseLocation, setBaseLocation] = useState<{ lat: number; lng: number; city: string } | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // Mobile Toggle

    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                let cityName = "";
                place.address_components?.forEach(component => {
                    if (component.types.includes("locality")) {
                        cityName = component.long_name;
                    }
                });

                if (!cityName) cityName = place.name || "Unknown";

                setMapCenter({ lat, lng });
                // Do NOT update baseLocation here. It must remain as the user's DB location.
                // setBaseLocation({ lat, lng, city: cityName }); 
                setCity(cityName.toUpperCase());
                setIsSearching(false);
            }
        }
    };

    // Pulse Mode State
    const [showPostNeedModal, setShowPostNeedModal] = useState(false);

    // Zoom Logic
    useEffect(() => {
        if (radius <= 5) setZoom(13);
        else if (radius <= 20) setZoom(11);
        else if (radius <= 50) setZoom(10);
        else setZoom(9);
    }, [radius]);

    useEffect(() => {
        if (session?.user?.latitude && session.user?.longitude) {
            const userLoc = {
                lat: Number(session.user.latitude),
                lng: Number(session.user.longitude),
                city: session?.user?.city || "Unknown"
            };
            setBaseLocation(userLoc);
            if (!isSearching) {
                setMapCenter({ lat: userLoc.lat, lng: userLoc.lng });
                setCity(userLoc.city.toUpperCase());
            }
        }
    }, [session]);

    const [selectedProfileForConnect, setSelectedProfileForConnect] = useState<NearbyProfile | null>(null);
    const [selectedInstantHelp, setSelectedInstantHelp] = useState<NearbyProfile | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<NearbyProfile | null>(null);
    const [hoveredMarker, setHoveredMarker] = useState<NearbyProfile | null>(null);

    // Fetch Pulse Data
    const { data: pulseData, refetch: refetchPulse } = useQuery({
        queryKey: ["pulse", radius, mapCenter.lat, mapCenter.lng],
        queryFn: async () => {
            // Only fetch if mapCenter is defined
            const res = await fetch(`/api/help-requests?lat=${mapCenter.lat}&lng=${mapCenter.lng}&radius=${radius}`);
            if (!res.ok) throw new Error("Failed to fetch pulse");
            return res.json();
        },
        enabled: mode === "pulse",
        refetchInterval: mode === "pulse" ? 30000 : false
    });

    const activeNeeds = pulseData?.data || [];

    // Fetch Nearby Data
    const { data: nearbyData, isFetching } = useQuery({
        queryKey: ["nearby", role, city, radius, mapCenter.lat, mapCenter.lng],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.set("role", role);
            if (city) params.set("city", city);
            params.set("radius", radius.toString());
            params.set("lat", mapCenter.lat.toString());
            params.set("lng", mapCenter.lng.toString());
            const res = await fetch(`/api/nearby?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch nearby users");
            return res.json() as Promise<{ data: NearbyProfile[] }>;
        },
        enabled: mode === "nearby"
    });

    const profiles = nearbyData?.data || [];
    const hasResults = (mode === 'nearby' && profiles.length > 0) || (mode === 'pulse' && activeNeeds.length > 0);

    // -- Jitter --
    const processedProfiles: NearbyProfile[] = profiles.map((p, i, arr) => {
        const isDuplicate = arr.filter(o => Math.abs(Number(o.latitude) - Number(p.latitude)) < 0.0001 && Math.abs(Number(o.longitude) - Number(p.longitude)) < 0.0001).length > 1;
        if (!isDuplicate) return p;
        const angle = (i * (360 / arr.length)) * (Math.PI / 180);
        const radius = 0.0002 + (i % 2) * 0.0001;
        return {
            ...p,
            latitude: Number(p.latitude) + Math.sin(angle) * radius,
            longitude: Number(p.longitude) + Math.cos(angle) * radius
        };
    });

    const getRoleColor = (r: string) => {
        switch (r) {
            case 'freelancer': return '#ffffff';      // White
            case 'investor': return '#93c5fd';        // Blue-300
            case 'startup': return '#c4b5fd';         // Purple-300
            case 'space': return '#fdba74';           // Orange-300
            default: return '#e5e7eb';
        }
    }

    return (
        <div className={`flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden relative font-sans ${mode === 'pulse' ? 'bg-[#1a0505]' : 'bg-[#050505]'} selection:bg-white selection:text-black transition-colors duration-500`}>

            {/* --- TOP HUD (Mobile Refactored) --- */}
            <div className="absolute top-4 md:top-8 left-0 right-0 z-20 flex flex-col items-center pointer-events-none px-4">

                {/* Main Filter Bar */}
                <div className="pointer-events-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch md:items-center w-full md:w-auto transition-all">

                    {/* Mobile Header Row: Location + Toggle */}
                    <div className="flex md:hidden items-center justify-between p-3 border-b border-white/10">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">{mode} MODE</span>
                        <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="h-8 w-8 p-0 text-white">
                            <SlidersHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Collapsible Content */}
                    <div className={`flex flex-col md:flex-row ${mobileFiltersOpen ? 'flex' : 'hidden md:flex'}`}>
                        {/* MODE SWITCHER */}
                        <div className="flex border-b md:border-b-0 md:border-r border-white/10">
                            <button
                                onClick={() => { setMode("nearby"); setMobileFiltersOpen(false); }}
                                className={`flex-1 md:flex-none px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${mode === "nearby" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
                            >
                                Nearby
                            </button>
                            <button
                                onClick={() => { setMode("pulse"); setMobileFiltersOpen(false); }}
                                className={`flex-1 md:flex-none relative px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 ${mode === "pulse" ? "bg-red-600 text-white" : "text-gray-500 hover:text-red-500"}`}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Instant Help
                            </button>
                        </div>

                        {/* Location Segment */}
                        <div className="flex flex-col px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 min-w-[200px]">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Base Location</span>
                            <div className="flex items-center gap-2 group">
                                {isLoaded && (
                                    <Autocomplete
                                        onLoad={(auto) => setAutocomplete(auto)}
                                        onPlaceChanged={onPlaceChanged}
                                        className="w-full"
                                    >
                                        <Input
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="h-6 bg-transparent border-none text-sm font-mono text-white p-0 focus-visible:ring-0 uppercase tracking-widest placeholder:text-gray-700 w-full"
                                            placeholder="SEARCH CITY..."
                                        />
                                    </Autocomplete>
                                )}
                            </div>
                        </div>

                        {/* Radius Segment */}
                        <div className="flex flex-col px-6 py-3 border-b md:border-b-0 md:border-r border-white/10 min-w-[200px]">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2">Radius</span>
                            <div className="flex items-center gap-1">
                                {[5, 20, 50, 100].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRadius(r)}
                                        className={`
                                            flex-1 h-8 rounded text-[10px] font-bold border transition-colors
                                            ${radius === r
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"}
                                        `}
                                    >
                                        {r}KM
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Role Toggles (Scrollable) */}
                    {mode === "nearby" && (
                        <div className={`p-2 gap-1 bg-black/50 overflow-x-auto max-w-full md:max-w-none scrollbar-hide ${mobileFiltersOpen ? 'flex' : 'hidden md:flex'}`}>
                            {[
                                { id: 'freelancer', label: 'FREELANCER' },
                                { id: 'investor', label: 'INVESTOR' },
                                { id: 'startup', label: 'FOUNDER' },
                                { id: 'space', label: 'SPACE' }
                            ].map((rItem) => (
                                <button
                                    key={rItem.id}
                                    onClick={() => setRole(rItem.id)}
                                    className={`
                                        px-4 py-3 text-[10px] uppercase tracking-[0.15em] font-bold border transition-all whitespace-nowrap rounded
                                        ${role === rItem.id
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300"}
                                    `}
                                >
                                    {rItem.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- MAP LEGEND / STATUS --- */}
            <div className="absolute bottom-10 right-10 z-20 pointer-events-none hidden md:block">
                <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-6 min-w-[240px] pointer-events-auto">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">Map Legend // V1.0</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full border border-white bg-transparent"></div>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-white">Current Node</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 border border-white/40 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-white/60">{role.toUpperCase()} Pulse</span>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between text-[9px] font-mono text-white/20">
                        <span>LAT: {mapCenter.lat.toFixed(4)}</span>
                        <span>LON: {mapCenter.lng.toFixed(4)}</span>
                    </div>
                </div>
            </div>

            {/* --- MAP AREA --- */}
            <div className="flex-1 w-full h-full relative bg-[#050505] grid-bg">
                {/* CSS Grid Overlay for aesthetics */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                </div>

                <MapContainer
                    isLoaded={isLoaded}
                    userLocation={mapCenter}
                    zoom={zoom}
                    options={{ styles: vectorSilverStyle, disableDefaultUI: true, backgroundColor: "#0b0b0b" }}
                >
                    {/* BASE LOCATION MARKER (Persisted DB Location) */}
                    {baseLocation && isLoaded && window.google && (
                        <Marker
                            position={{ lat: baseLocation.lat, lng: baseLocation.lng }}
                            title="My Base Location"
                            label={{
                                text: "HOME",
                                color: "white",
                                fontSize: "10px",
                                fontWeight: "bold",
                                className: "bg-black px-1 rounded"
                            }}
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 6,
                                fillColor: "#000000",
                                fillOpacity: 1,
                                strokeColor: "#ffffff",
                                strokeWeight: 2,
                            }}
                            zIndex={999}
                        />
                    )}

                    {/* SEARCH RADIUS CIRCLE */}
                    {isLoaded && window.google && (
                        <Circle
                            center={mapCenter}
                            radius={radius * 1000} // Convert km to meters
                            options={{
                                strokeColor: "#FFFFFF",
                                strokeOpacity: 0.1,
                                strokeWeight: 1,
                                fillColor: "#FFFFFF",
                                fillOpacity: 0.05,
                                clickable: false,
                            }}
                        />
                    )}

                    {/* PROFILES MARKER (Only in Nearby Mode) */}
                    {isLoaded && window.google && mode === "nearby" && processedProfiles.map((profile) => (
                        <Marker
                            key={profile.profileId}
                            position={{
                                lat: Number(profile.latitude) || 12.9716,
                                lng: Number(profile.longitude) || 77.5946
                            }}
                            onClick={() => setSelectedMarker(profile)}
                            onMouseOver={() => setHoveredMarker(profile)}
                            onMouseOut={() => setHoveredMarker(null)}
                            title={profile.name || "User"}
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 5,
                                fillColor: getRoleColor(role),
                                fillOpacity: 1,
                                strokeColor: "#000000",
                                strokeWeight: 1,
                            }}
                        />
                    ))}

                    {/* PULSE MODE: ACTIVE NEEDS OVERLAYS (Red/Green Dots) */}
                    {mode === "pulse" && activeNeeds.map((need: any) => {
                        const isOffer = need.type === "OFFER";
                        const colorClass = isOffer ? "bg-green-500" : "bg-red-500";
                        const ringClass = isOffer ? "bg-green-500/50" : "bg-red-500/50";
                        const borderClass = isOffer ? "border-green-500/50" : "border-red-500/50";

                        return (
                            <OverlayView
                                key={need.id}
                                position={{ lat: need.latitude, lng: need.longitude }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <div
                                    className="relative group cursor-pointer"
                                    onClick={() => {
                                        setSelectedMarker({
                                            profileId: need.id,
                                            userId: need.userId,
                                            name: need.user?.name || "Member",
                                            role: isOffer ? "OFFERING HELP" : "NEEDS HELP",
                                            city: "Nearby",
                                            latitude: need.latitude,
                                            longitude: need.longitude,
                                            distance_km: need.distance_km,
                                            headline: need.category,
                                            description: need.description,
                                            image: need.user?.image,
                                            // Explicit mappings for the enhanced popup
                                            requestType: need.type,
                                            requestCategory: need.category,
                                            requestDescription: need.description,
                                            voiceUrl: need.voiceUrl
                                        } as any);
                                    }}
                                    onMouseEnter={() => setHoveredMarker({ name: need.category, role: isOffer ? "OFFER" : "NEED", ...need } as any)}
                                    onMouseLeave={() => setHoveredMarker(null)}
                                >
                                    {/* Pulsing Ring */}
                                    <div className={`absolute -top-3 -left-3 w-6 h-6 rounded-full animate-ping ${ringClass}`}></div>
                                    <div className={`relative w-3 h-3 rounded-full border border-white shadow-lg ${isOffer ? 'bg-green-500' : 'bg-red-600'}`}></div>

                                    {/* Category Label on Hover */}
                                    <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-black border text-white text-[8px] font-bold px-1.5 py-0.5 whitespace-nowrap rounded uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity ${borderClass}`}>
                                        {need.category}
                                        <div className="text-[6px] text-gray-400 font-mono mt-0.5">{isOffer ? "OFFER" : "NEED"}</div>
                                    </div>
                                </div>
                            </OverlayView>
                        );
                    })}
                </MapContainer>

                {/* --- HOVER TOOLTIP --- */}
                {hoveredMarker && !selectedMarker && (
                    <div className="absolute z-50 pointer-events-none bg-black border border-white text-white px-3 py-2 text-[10px] uppercase tracking-widest shadow-xl transform -translate-x-1/2 -translate-y-full"
                        style={{ top: '50%', left: '50%' }}>
                        {/* Note: Positioning this perfectly on the marker requires overlay view, but strict center might be misleading. 
                             Ideally we use InfoWindow or correct pixel conversion. 
                             For simplicity, let's float it top-right or just rely on click. 
                             Actually, Google Maps Marker 'title' prop is simplest for pure hover text. 
                             But user wanted "details". 
                             Let's revert to title prop for system tooltip if custom is too hard without OverlayView.
                             BUT, I can use a fixed overlay if I track mouse x/y, but I don't have that easily from Marker.
                             
                             Better approach: Use the standard `title` prop for now for accessibility, 
                             and maybe a bottom-left status bar update?
                             
                             Let's try a "Cursor Tracking" tooltip if possible? No.
                             Let's just use the `title` prop for now for robustness.
                         */}
                    </div>
                )}


                {/* --- EMPTY STATE OVERLAY --- */}
                {isLoaded && !hasResults && !isFetching && (
                    <div className="absolute bottom-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-20">
                        <div className="bg-black/90 backdrop-blur border border-white/20 p-6 md:p-12 text-center w-full md:max-w-sm shadow-[0_0_30px_rgba(255,255,255,0.05)] rounded-2xl">
                            <h2 className="text-xl md:text-3xl font-serif text-white mb-2 md:mb-4">Empty Void.</h2>
                            <p className="text-[10px] uppercase tracking-[0.1em] text-gray-500 mb-6 leading-relaxed">
                                No spaces found nearby. Try increasing the radius.
                            </p>
                            <Button
                                onClick={() => setRadius(50)}
                                className="bg-white text-black hover:bg-gray-200 rounded-lg h-10 px-6 text-[10px] font-bold tracking-[0.2em] uppercase w-full"
                            >
                                Calibrate Search
                            </Button>
                        </div>
                    </div>
                )}

                {/* --- INFO CARD OVERLAY --- */}
                {selectedMarker && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-sm p-4">
                        <div className="bg-black border border-white/20 text-white shadow-2xl relative rounded-xl overflow-hidden">
                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 z-10">
                                {selectedMarker.requestType === 'NEED' || selectedMarker.role === 'NEEDS HELP' ? (
                                    <span className="bg-red-600/20 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full border border-red-600/30 flex items-center gap-1 shadow-lg backdrop-blur-md">
                                        <Zap className="w-3 h-3 fill-current" /> NEEDS HELP
                                    </span>
                                ) : selectedMarker.requestType === 'OFFER' || selectedMarker.role === 'OFFERING HELP' ? (
                                    <span className="bg-green-600/20 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full border border-green-600/30 flex items-center gap-1 shadow-lg backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> OFFERS HELP
                                    </span>
                                ) : null}
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedMarker(null)}
                                className="absolute top-4 left-4 w-8 h-8 bg-black/50 text-white flex items-center justify-center rounded-full hover:bg-white/20 transition-all z-10 backdrop-blur-md"
                            >
                                <span className="text-lg leading-none pb-1">×</span>
                            </button>

                            <div className="pt-12 pb-6 px-6 text-center bg-gradient-to-b from-zinc-900 to-black">
                                <div className="w-24 h-24 mx-auto rounded-full p-1 border-2 border-white/10 mb-4 shadow-xl bg-black">
                                    <img
                                        src={selectedMarker.image || "/placeholder-user.jpg"}
                                        alt={selectedMarker.name || "User"}
                                        className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif tracking-tight text-white mb-1">
                                    {selectedMarker.name}
                                </h3>
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                                    {selectedMarker.city || "Nearby"} // {selectedMarker.distance_km?.toFixed(1)} KM
                                </p>
                            </div>

                            <div className="px-6 pb-6 space-y-5 bg-black">
                                {/* Request Details Box */}
                                {(selectedMarker.requestDescription || selectedMarker.description) && (
                                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-white/10 text-center">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-center gap-2">
                                            <span>{selectedMarker.requestCategory || selectedMarker.headline || "Request"}</span>
                                        </div>
                                        <p className="text-sm text-zinc-300 italic leading-relaxed line-clamp-4">
                                            "{selectedMarker.requestDescription || selectedMarker.description}"
                                        </p>
                                    </div>
                                )}

                                {/* Voice Message Player for Popup */}
                                {selectedMarker.voiceUrl && (
                                    <div className="bg-zinc-900/50 rounded-lg p-2 border border-white/10 mb-2">
                                        <div className="text-[8px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">Voice Note</div>
                                        <audio src={selectedMarker.voiceUrl} controls className="w-full h-6" />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3 text-center border-t border-white/10 pt-4">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-zinc-600">Status</div>
                                        <div className="text-green-500 font-mono text-xs mt-1 font-bold">● ONLINE</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-zinc-600">Expires In</div>
                                        <div className="text-white font-mono text-xs mt-1">29:00</div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        if (mode === "pulse") {
                                            setSelectedInstantHelp(selectedMarker);
                                        } else {
                                            setSelectedProfileForConnect(selectedMarker);
                                        }
                                    }}
                                    className={`w-full py-6 text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-all
                                        ${(selectedMarker.requestType === 'NEED' || selectedMarker.role === 'NEEDS HELP')
                                            ? 'bg-white text-black hover:bg-red-600 hover:text-white shadow-[0_0_20px_rgba(255,0,0,0.1)]'
                                            : 'bg-white text-black hover:bg-green-600 hover:text-white shadow-[0_0_20px_rgba(0,255,0,0.1)]'}
                                    `}
                                >
                                    Initiate Link
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- FOOTER STATUS --- */}
                <div className="absolute bottom-6 left-10 z-20 pointer-events-none hidden md:flex gap-8 text-[9px] font-mono text-white/20 uppercase tracking-widest">
                    <span>System_Status: Nominal</span>
                    <span>Version: AG-01-BETA</span>
                    <span>Render_Engine: Vector_Silver</span>
                </div>

            </div>

            {
                selectedProfileForConnect && (
                    <ConnectionRequestModal
                        isOpen={!!selectedProfileForConnect}
                        onClose={() => setSelectedProfileForConnect(null)}
                        receiverId={selectedProfileForConnect.userId}
                        receiverName={selectedProfileForConnect.name || "User"}
                    />
                )
            }

            {/* NEW INSTANT HELP RESPONSE MODAL */}
            {selectedInstantHelp && (
                <InstantHelpResponseModal
                    isOpen={!!selectedInstantHelp}
                    onClose={() => setSelectedInstantHelp(null)}
                    request={{
                        id: selectedInstantHelp.profileId, // We mapped ID to profileId in click handler
                        category: selectedInstantHelp.headline || "General",
                        type: selectedInstantHelp.role === "OFFERING HELP" ? "OFFER" : "NEED",
                        userName: selectedInstantHelp.name || "User"
                    }}
                />
            )}
        </div >
    );
}
