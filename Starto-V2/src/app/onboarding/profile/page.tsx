"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import MultiSelect from "@/components/ui/MultiSelect";
import {
    EXPERIENCE_LEVELS,
    AVAILABILITY_TYPES,
    WORK_TYPES,
    INDUSTRIES,
    STARTUP_STAGES,
    TEAM_SIZES,
    FUNDING_ROUNDS,
    INVESTOR_TYPES,
    SECTORS,
    PROVIDER_TYPES
} from "@/lib/constants";

// Helper to map UI labels to Schema Enums
const mapToEnum = (val: string) => {
    if (!val) return undefined;
    if (val === "Co-working") return "COWORKING";
    return val.replace(/\+/g, "_PLUS").replace(/[-\s]/g, "_").toUpperCase();
};

function ProfileContent() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Get Data from URL Params (Strict Flow State)
    const searchParams = useSearchParams();
    const activeRole = searchParams.get("role")?.toLowerCase();

    // Location Data for Submission
    const locationData = {
        latitude: parseFloat(searchParams.get("lat") || "0"),
        longitude: parseFloat(searchParams.get("lng") || "0"),
        city: searchParams.get("city") || "",
        state: searchParams.get("state") || "",
        country: searchParams.get("country") || "",
        pincode: searchParams.get("pincode") || "",
    };

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && !activeRole) {
            // Strict check: No role? Go back to start.
            console.warn("Missing role param, redirecting to role selection");
            router.push("/onboarding/role");
        }
    }, [status, activeRole, router]);

    if (status === "loading" || !activeRole) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    const handleSubmit = async (formData: any) => {
        setLoading(true);
        try {
            // VALIDATION: Strict checks before sending anything
            if (activeRole === "freelancer" && (!formData.skills || formData.skills.length === 0)) {
                alert("Please select at least one skill.");
                setLoading(false);
                return;
            }
            // ... other validations ...

            // FINAL SUBMISSION: One Transaction
            const payload = {
                role: activeRole,
                location: locationData,
                userDetails: {
                    name: formData.name, // Only present in some forms
                    phoneNumber: formData.phoneNumber
                },
                profileData: formData
            };

            const profileRes = await fetch("/api/onboarding/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!profileRes.ok) {
                const err = await profileRes.json();
                throw new Error(err.error || "Failed to complete onboarding");
            }

            // Sync Session (Important to pass Middleware Guard)
            await update({
                onboarded: true,
                activeRole: activeRole.toUpperCase(),
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                city: locationData.city
            });

            // Redirect to Dashboard (Flow Complete)
            // Use hard navigation to ensure clean state and middleware pass
            window.location.href = "/dashboard";
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Error saving profile. Please try again.");
            setLoading(false);
        }
    };

    // STEP 2: Role Specific Details
    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {activeRole === 'freelancer' ? "Tell us about your work" : "Complete Your Profile"}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {activeRole === 'freelancer' ? "Simple language is used" : `Tell us more about your ${activeRole} journey.`}
                    </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    {activeRole === "freelancer" && <FreelancerForm onSubmit={handleSubmit} loading={loading} />}
                    {activeRole === "startup" && <StartupForm onSubmit={handleSubmit} loading={loading} />}
                    {activeRole === "investor" && <InvestorForm onSubmit={handleSubmit} loading={loading} />}
                    {activeRole === "provider" && <ProviderForm onSubmit={handleSubmit} loading={loading} />}
                </div>
            </div>
        </div>
    );
}

export default function OnboardingProfilePage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <ProfileContent />
        </Suspense>
    );
}

// --- Sub-components (Forms) ---

const FREELANCER_UI = {
    experience: {
        "Junior": "New to this work",
        "Mid": "Some experience",
        "Senior": "Very experienced",
        "Expert": "Expert level"
    },
    availability: {
        "Full-time": "Full-time (daily work)",
        "Part-time": "Part-time",
        "Hourly": "Only when needed"
    },
    workType: {
        "Remote": "Work from home",
        "Onsite": "Go to work place",
        "Hybrid": "Both"
    }
};

const UNIVERSAL_SKILLS = [
    // Local Work Skills (Primary)
    "Electrician", "Plumber", "Carpenter", "Painter", "Mechanic",
    "Driver", "Cleaner", "Security Guard", "Construction Worker", "Technician",

    // Tech & Office
    "Web Developer", "Mobile App Developer", "Software Developer", "Designer",
    "Data Entry", "Computer Operator", "Excel Expert",

    // Creative & Digital
    "Graphic Designer", "Video Editor", "Photographer",
    "Content Writer", "Social Media Manager",

    // Business & Services
    "Accountant", "Sales Executive", "Marketing Professional",
    "Customer Support", "Office Assistant", "Consultant",

    // Valid Fallback
    "Other"
];

function FreelancerForm({ onSubmit, loading }: { onSubmit: (data: any) => void, loading: boolean }) {
    const [formData, setFormData] = useState({
        headline: "",
        phoneNumber: "",
        skills: [] as string[],
        experience: "",
        availability: "",
        workType: "",
        portfolio: "",
        github: "",
        linkedin: "",
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
                ...formData,
                experience: mapToEnum(formData.experience),
                availability: mapToEnum(formData.availability),
                workType: mapToEnum(formData.workType),
            });
        }} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">What work do you do?</label>
                <input
                    type="text"
                    placeholder="e.g. Electrician / Designer / Developer"
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.headline}
                    onChange={e => setFormData({ ...formData, headline: e.target.value })}
                    required
                />
            </div>

            <div>
                <MultiSelect
                    label="Your work skills"
                    placeholder="Choose or type your work"
                    options={UNIVERSAL_SKILLS}
                    selected={formData.skills}
                    onChange={vals => setFormData({ ...formData, skills: vals })}
                    allowCustom={true}
                />
                <p className="text-xs text-muted-foreground mt-1">You can select more than one</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Experience</label>
                    <select
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.experience}
                        onChange={e => setFormData({ ...formData, experience: e.target.value })}
                    >
                        {EXPERIENCE_LEVELS.map(lvl => (
                            <option key={lvl} value={lvl}>
                                {FREELANCER_UI.experience[lvl as keyof typeof FREELANCER_UI.experience] || lvl}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <select
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.availability}
                        onChange={e => setFormData({ ...formData, availability: e.target.value })}
                    >
                        {AVAILABILITY_TYPES.map(type => (
                            <option key={type} value={type}>
                                {FREELANCER_UI.availability[type as keyof typeof FREELANCER_UI.availability] || type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Work Preference</label>
                    <select
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.workType}
                        onChange={e => setFormData({ ...formData, workType: e.target.value })}
                    >
                        {WORK_TYPES.map(type => (
                            <option key={type} value={type}>
                                {FREELANCER_UI.workType[type as keyof typeof FREELANCER_UI.workType] || type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <input
                        type="url"
                        placeholder="Work photos or website (optional)"
                        className="w-full p-3 bg-background border border-input rounded-xl outline-none focus:ring-2 focus:ring-primary"
                        value={formData.portfolio}
                        onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty if not available</p>
                </div>
                <div>
                    <input
                        type="url"
                        placeholder="Any online work link (optional)"
                        className="w-full p-3 bg-background border border-input rounded-xl outline-none focus:ring-2 focus:ring-primary"
                        value={formData.github}
                        onChange={e => setFormData({ ...formData, github: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty if not available</p>
                </div>
                <div>
                    <input
                        type="url"
                        placeholder="Social profile (optional)"
                        className="w-full p-3 bg-background border border-input rounded-xl outline-none focus:ring-2 focus:ring-primary"
                        value={formData.linkedin}
                        onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Leave empty if not available</p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full p-3 bg-background border border-input rounded-xl outline-none focus:ring-2 focus:ring-primary"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                />
                <p className="text-xs text-muted-foreground mt-1">We will contact you here</p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save & Continue"}
            </button>
        </form>
    );
}

const BUSINESS_TYPES = [
    { label: "Shop / Store Business", value: "ECOMMERCE" },
    { label: "Service Business", value: "SERVICES" },
    { label: "Food / Restaurant / Hotel", value: "ECOMMERCE" },
    { label: "Education / Training", value: "EDTECH" },
    { label: "Hospital / Medical", value: "HEALTHTECH" },
    { label: "Transport / Delivery", value: "LOGISTICS" },
    { label: "Land / Building / Office", value: "REAL_ESTATE" },
    { label: "Factory / Farming", value: "AGRITECH" },
    { label: "Online / App / Software", value: "SAAS" },
    { label: "Other", value: "OTHER" },
];

const BUSINESS_STAGES = [
    { label: "Just planning / Starting", value: "IDEA" },
    { label: "Started small work", value: "MVP" },
    { label: "Running normally", value: "GROWTH" },
    { label: "Big business", value: "SCALE" },
];

function StartupForm({ onSubmit, loading }: { onSubmit: (data: any) => void, loading: boolean }) {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        oneLiner: "",
        industry: "",
        stage: "",
        website: "",
    });
    const [step, setStep] = useState(1);

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (form.checkValidity()) {
            setStep(2);
        } else {
            form.reportValidity();
        }
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Backend expects specific enums. The simplified dropdowns map directly to them.
        onSubmit(formData);
    };

    return (
        <form onSubmit={step === 1 ? handleStep1Submit : handleFinalSubmit} className="space-y-6 md:space-y-8">
            {step === 1 && (
                <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div>
                            <label className="block text-base md:text-sm font-medium mb-2 md:mb-3">Business Name</label>
                            <input
                                type="text"
                                placeholder="e.g. My Local Shop"
                                className="w-full p-4 md:p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg md:text-base placeholder:text-muted-foreground/60 transition-all shadow-sm focus:shadow-md"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-base md:text-sm font-medium mb-2 md:mb-3">WhatsApp Number</label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="w-full p-4 md:p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg md:text-base placeholder:text-muted-foreground/60 transition-all shadow-sm focus:shadow-md"
                                value={formData.phoneNumber}
                                onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-base md:text-sm font-medium mb-2 md:mb-3">What does your business do?</label>
                        <input
                            type="text"
                            placeholder="e.g. We sell organic vegetables directly from farmers."
                            className="w-full p-4 md:p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg md:text-base placeholder:text-muted-foreground/60 transition-all shadow-sm focus:shadow-md"
                            value={formData.oneLiner}
                            onChange={e => setFormData({ ...formData, oneLiner: e.target.value })}
                            required
                            maxLength={140}
                        />
                        <p className="text-xs md:text-sm text-muted-foreground mt-2 text-right">{formData.oneLiner.length}/140</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 md:py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] mt-4"
                    >
                        Next Step
                    </button>
                    <p className="text-center text-xs md:text-sm text-muted-foreground">step 1 of 2</p>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <div>
                            <label className="block text-base md:text-sm font-medium mb-1">Business Type</label>
                            <p className="text-sm md:text-xs text-muted-foreground mb-3">Choose what best matches your work</p>
                            <div className="relative">
                                <select
                                    className="w-full p-4 md:p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none text-lg md:text-base transition-all shadow-sm focus:shadow-md"
                                    value={formData.industry}
                                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                                    required
                                >
                                    <option value="">Select Business Type</option>
                                    {BUSINESS_TYPES.map(type => <option key={type.label} value={type.value}>{type.label}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-base md:text-sm font-medium mb-1">Business Status</label>
                            <p className="text-sm md:text-xs text-muted-foreground mb-3">No problem if you are not sure</p>
                            <div className="relative">
                                <select
                                    className="w-full p-4 md:p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none text-lg md:text-base transition-all shadow-sm focus:shadow-md"
                                    value={formData.stage}
                                    onChange={e => setFormData({ ...formData, stage: e.target.value })}
                                    required
                                >
                                    <option value="">Select Status</option>
                                    {BUSINESS_STAGES.map(s => <option key={s.label} value={s.value}>{s.label}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-base md:text-sm font-medium mb-2 md:mb-3">Website (Optional)</label>
                        <input
                            type="url"
                            className="w-full p-4 md:p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg md:text-base placeholder:text-muted-foreground/60 transition-all shadow-sm focus:shadow-md"
                            value={formData.website}
                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-1/3 py-4 bg-secondary text-secondary-foreground font-bold text-lg rounded-xl hover:bg-secondary/80 transition-all active:scale-[0.98]"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-2/3 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? "Launching..." : "Enter Starto"}
                        </button>
                    </div>
                    <p className="text-center text-xs md:text-sm text-muted-foreground">step 2 of 2</p>
                </div>
            )}
        </form>
    );
}

function InvestorForm({ onSubmit, loading }: { onSubmit: (data: any) => void, loading: boolean }) {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        investorType: "",
        sectors: [] as string[],
        stages: [] as string[],
        thesisNote: "",
        isPublic: true,
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
                ...formData,
                investorType: mapToEnum(formData.investorType),
                stages: formData.stages.map(s => mapToEnum(s)),
            });
        }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                    <input
                        type="tel"
                        required
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.phoneNumber}
                        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Investment Thesis</label>
                <textarea
                    placeholder="What kinds of startups do you invest in?"
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.thesisNote}
                    onChange={e => setFormData({ ...formData, thesisNote: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Investor Type</label>
                <select
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.investorType}
                    onChange={e => setFormData({ ...formData, investorType: e.target.value })}
                >
                    {INVESTOR_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>

            <div>
                <MultiSelect
                    label="Preferred Stages"
                    options={STARTUP_STAGES as unknown as string[]}
                    selected={formData.stages}
                    onChange={vals => setFormData({ ...formData, stages: vals })}
                />
            </div>

            <div>
                <MultiSelect
                    label="Sectors of Interest"
                    options={SECTORS}
                    selected={formData.sectors}
                    onChange={vals => setFormData({ ...formData, sectors: vals })}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50"
            >
                {loading ? "Processing..." : "Next Step"}
            </button>
        </form>
    );
}

function ProviderForm({ onSubmit, loading }: { onSubmit: (data: any) => void, loading: boolean }) {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        companyName: "",
        providerType: "",
        description: "",
        capacity: 10,
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
                ...formData,
                providerType: mapToEnum(formData.providerType),
            });
        }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                        type="text"
                        required
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                    <input
                        type="tel"
                        required
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.phoneNumber}
                        onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <input
                    type="text"
                    required
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Space Type</label>
                    <select
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.providerType}
                        onChange={e => setFormData({ ...formData, providerType: e.target.value })}
                    >
                        {PROVIDER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Capacity</label>
                    <input
                        type="number"
                        className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                        value={formData.capacity}
                        onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                    className="w-full p-3 bg-background border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50"
            >
                {loading ? "Listing..." : "Register as Provider"}
            </button>
        </form>
    );
}
