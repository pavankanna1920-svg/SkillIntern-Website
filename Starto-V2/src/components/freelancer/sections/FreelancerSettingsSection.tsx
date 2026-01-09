"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Bell, CreditCard, Lock, User, Shield, Save, Loader2, Briefcase, Link as LinkIcon } from "lucide-react"
import { useUser } from "@/hooks/useUser"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import { useQueryClient } from "@tanstack/react-query";

import LocationSearchInput from "@/components/common/LocationSearchInput";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MultiSelect from "@/components/ui/MultiSelect"
import { SKILLS, EXPERIENCE_LEVELS, AVAILABILITY_TYPES, WORK_TYPES } from "@/lib/constants"

export function FreelancerSettingsSection() {
    const { data: session } = useSession();
    const { dbUser, isLoading } = useUser();
    const queryClient = useQueryClient();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        title: "",
        bio: "",
        location: "", // Display string
        latitude: 0,
        longitude: 0,
        city: "",
        state: "",
        country: "",
        pincode: "",
        address: "",
        // Professional
        skills: [] as string[],
        experience: "",
        availability: "",
        workType: "",
        hourlyRate: "",
        // Social
        portfolio: "",
        github: "",
        linkedin: ""
    });

    useEffect(() => {
        if (dbUser) {
            const names = (dbUser.name || "").split(" ");
            const fName = names[0] || "";
            const lName = names.slice(1).join(" ") || "";

            setFormData({
                firstName: fName,
                lastName: lName,
                title: dbUser.freelancerProfile?.headline || "",
                bio: dbUser.freelancerProfile?.bio || "",
                location: dbUser.city || "",
                latitude: Number(dbUser.latitude) || 0,
                longitude: Number(dbUser.longitude) || 0,
                city: dbUser.city || "",
                state: "",
                country: "",
                pincode: dbUser.pincode || "",
                address: "",
                skills: dbUser.freelancerProfile?.skills || [],
                experience: dbUser.freelancerProfile?.experience || "",
                availability: dbUser.freelancerProfile?.availability || "",
                workType: dbUser.freelancerProfile?.workType || "",
                hourlyRate: dbUser.freelancerProfile?.hourlyRate?.toString() || "",
                portfolio: dbUser.freelancerProfile?.portfolio || "",
                github: dbUser.freelancerProfile?.github || "",
                linkedin: dbUser.freelancerProfile?.linkedin || ""
            });
        }
    }, [dbUser]);

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

    const handleSave = async () => {
        setSaving(true);
        try {
            // STEP 1: Update User Table (Location, Name)
            const userUpdateRes = await fetch("/api/users/me", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session?.user?.email,
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    city: formData.city,
                    pincode: formData.pincode,
                })
            });

            if (!userUpdateRes.ok) {
                const errorData = await userUpdateRes.json().catch(() => ({}));
                console.error("User Update Failed:", errorData);
                throw new Error(errorData.error || "Failed to update user info");
            }

            // STEP 2: Update Profile
            const profileRes = await fetch("/api/onboarding/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session?.user?.email,
                    role: "freelancer",
                    data: {
                        headline: formData.title,
                        bio: formData.bio,
                        skills: formData.skills,
                        experience: formData.experience,
                        availability: formData.availability,
                        workType: formData.workType,
                        hourlyRate: formData.hourlyRate ? Number(formData.hourlyRate) : null,
                        portfolio: formData.portfolio,
                        github: formData.github,
                        linkedin: formData.linkedin,
                        city: formData.city,
                        address: formData.address || formData.location
                    }
                })
            });
            if (!profileRes.ok) {
                const errorData = await profileRes.json().catch(() => ({}));
                console.error("Profile Save Failed:", errorData);
                throw new Error(errorData.error || "Failed to save profile");
            }

            await queryClient.invalidateQueries({ queryKey: ["user"] });
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account preferences and professional profile.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-6">
                    <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3">General</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    {/* General Settings */}
                    <TabsContent value="general" className="space-y-6">
                        {/* Personal Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal details visible to clients.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <LocationSearchInput
                                        defaultValue={formData.location}
                                        onLocationSelect={handleLocationSelect}
                                        placeholder="e.g. Bangalore, India"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" value={dbUser?.email || session?.user?.email || ""} disabled />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Professional Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" /> Professional Details
                                </CardTitle>
                                <CardDescription>Showcase your expertise and availability.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Professional Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Senior Full Stack Developer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Briefly describe your experience and what you do..."
                                        rows={4}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Experience Level</Label>
                                        <Select
                                            value={formData.experience}
                                            onValueChange={(val) => setFormData({ ...formData, experience: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {EXPERIENCE_LEVELS.map(level => (
                                                    <SelectItem key={level} value={level.toUpperCase()}>{level}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Availability</Label>
                                        <Select
                                            value={formData.availability}
                                            onValueChange={(val) => setFormData({ ...formData, availability: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Availability" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {AVAILABILITY_TYPES.map(type => (
                                                    <SelectItem key={type} value={type.toUpperCase().replace("-", "_")}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Work Preference</Label>
                                        <Select
                                            value={formData.workType}
                                            onValueChange={(val) => setFormData({ ...formData, workType: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Work Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {WORK_TYPES.map(type => (
                                                    <SelectItem key={type} value={type.toUpperCase()}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="hourlyRate">Hourly Rate ($/hr)</Label>
                                        <Input
                                            id="hourlyRate"
                                            type="number"
                                            value={formData.hourlyRate}
                                            onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            placeholder="e.g. 50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Primary Skills</Label>
                                    <MultiSelect
                                        options={SKILLS}
                                        selected={formData.skills}
                                        onChange={(newSkills) => setFormData({ ...formData, skills: newSkills })}
                                        placeholder="Select skills..."
                                        maxSelect={10}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LinkIcon className="w-5 h-5" /> Portfolio & Socials
                                </CardTitle>
                                <CardDescription>Link your external profiles.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="portfolio">Portfolio URL</Label>
                                        <Input
                                            id="portfolio"
                                            value={formData.portfolio}
                                            onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                                            placeholder="https://yourportfolio.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub Profile</Label>
                                        <Input
                                            id="github"
                                            value={formData.github}
                                            onChange={e => setFormData({ ...formData, github: e.target.value })}
                                            placeholder="https://github.com/username"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                        <Input
                                            id="linkedin"
                                            value={formData.linkedin}
                                            onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                            placeholder="https://linkedin.com/in/username"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end border-t px-6 py-4">
                                <Button onClick={handleSave} disabled={saving} size="lg">
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
