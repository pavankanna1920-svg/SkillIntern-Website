"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMyStartup, useUpdateStartup } from "@/hooks/useStartup"
import { useUser } from "@/hooks/useUser" // Use the hook for Source of Truth
import { useSession, signOut } from "next-auth/react"
import { Loader2, Save, LogOut } from "lucide-react"
import LocationSearchInput from "@/components/common/LocationSearchInput";
import { useQueryClient } from "@tanstack/react-query"
import { ROLE_LABELS, BUSINESS_TYPES, BUSINESS_STAGES } from "@/lib/ui-mapping";


export function SettingsSection() {
    const { data: session } = useSession();
    const { dbUser, isLoading: userLoading } = useUser();
    const { data: startupData, isLoading: startupLoading } = useMyStartup(session?.user?.email);
    const update = useUpdateStartup();
    const queryClient = useQueryClient();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        website: "",
        phoneNumber: "",
        oneLiner: "",
        description: "",
        stage: "",
        valuation: "",
        industry: "",
        location: "",
        latitude: 0,
        longitude: 0,
        city: "",
        state: "",
        country: "",
        pincode: "",
        address: ""
    });

    useEffect(() => {
        if (dbUser && startupData?.startup) {
            setFormData({
                name: dbUser.name || startupData.startup.name || "",
                website: startupData.startup.website || "",
                phoneNumber: dbUser.phoneNumber || "",
                oneLiner: startupData.startup.oneLiner || "",
                description: startupData.startup.description || "",
                stage: startupData.startup.stage || "",
                valuation: startupData.startup.valuation ? String(startupData.startup.valuation) : "",
                industry: startupData.startup.industry || "",
                location: dbUser.city || startupData.startup.address || "",
                latitude: Number(dbUser.latitude) || 0,
                longitude: Number(dbUser.longitude) || 0,
                city: dbUser.city || "",
                state: "",
                country: "",
                pincode: dbUser.pincode || "",
                address: ""
            })
        }
    }, [dbUser, startupData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleLocationSelect = (loc: any) => {
        setFormData(prev => ({
            ...prev,
            location: loc.address,
            latitude: loc.latitude,
            longitude: loc.longitude,
            city: loc.city,
            state: loc.state,
            country: loc.country,
            pincode: loc.pincode,
            address: loc.address
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.email) return;
        setSaving(true);

        try {
            const userRes = await fetch("/api/users/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session.user.email,
                    name: formData.name,
                    phoneNumber: formData.phoneNumber,
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    city: formData.city,
                    pincode: formData.pincode,
                })
            });

            if (!userRes.ok) {
                const errorData = await userRes.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to update user info");
            }

            await update.mutateAsync({
                email: session.user.email,
                data: {
                    name: formData.name,
                    website: formData.website,
                    oneLiner: formData.oneLiner,
                    description: formData.description,
                    stage: formData.stage,
                    valuation: formData.valuation ? Number(formData.valuation) : undefined,
                    industry: formData.industry,
                    city: formData.city,
                    address: formData.address || formData.location
                }
            });

            await queryClient.invalidateQueries({ queryKey: ["user"] });
            await queryClient.invalidateQueries({ queryKey: ["startup"] });
            await queryClient.refetchQueries({ queryKey: ["user"] });

        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    }

    if (userLoading || startupLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>

    if (!startupData?.startup && !userLoading && !startupLoading) return (
        <div className="p-8 text-center">
            <h3 className="text-lg font-semibold">Profile Loading or Not Found</h3>
            <p className="text-muted-foreground">Please refresh or contact support.</p>
        </div>
    )

    // Derived Label for Role
    const activeRole = ((dbUser as any)?.activeRole || "STARTUP").toUpperCase();
    const roleLabel = ROLE_LABELS[activeRole] || activeRole;

    return (
        <div className="max-w-3xl">
            <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account and business profile.</p>
            </div>

            {/* User Account Card */}
            <Card className="mb-8 border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-lg">Account & Session</CardTitle>
                    <CardDescription>Manage your sign-in details.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                            {dbUser?.name?.[0] || session?.user?.email?.[0] || "U"}
                        </div>
                        <div className="overflow-hidden w-full">
                            <p className="font-semibold text-lg">{dbUser?.name || "User"}</p>
                            <p className="text-muted-foreground text-sm truncate">{session?.user?.email}</p>
                            <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                                {roleLabel}
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Button>
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Business Details</CardTitle>
                        <CardDescription>This information is visible to the network.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Business Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" name="website" placeholder="https://" value={formData.website} onChange={handleChange} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Location</Label>
                                <LocationSearchInput
                                    defaultValue={formData.location}
                                    onLocationSelect={handleLocationSelect}
                                    placeholder="e.g. San Francisco, CA"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">WhatsApp Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber || ""}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="oneLiner">What does your business do?</Label>
                            <Input id="oneLiner" name="oneLiner" placeholder="e.g. We sell organic vegetables" value={formData.oneLiner} onChange={handleChange} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">About</Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="min-h-[100px]"
                                placeholder="Tell us more about your business..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="industry">Business Type</Label>
                                <Select
                                    name="industry"
                                    value={formData.industry}
                                    onValueChange={(v) => handleSelectChange("industry", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Business Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BUSINESS_TYPES.map((type) => (
                                            <SelectItem key={type.label} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="stage">Business Status</Label>
                                <Select
                                    name="stage"
                                    value={formData.stage}
                                    onValueChange={(v) => handleSelectChange("stage", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {BUSINESS_STAGES.map((stage) => (
                                            <SelectItem key={stage.label} value={stage.value}>
                                                {stage.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost" type="button" onClick={() => window.location.reload()}>Reset</Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
