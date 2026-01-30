"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Rocket, Briefcase, TrendingUp, Building2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const roles = [
    {
        id: "startup",
        title: "Help for my business",
        icon: Rocket,
        color: "text-primary",
        bg: "bg-primary/5",
        features: ["Shop", "Hotel", "Startup"],
    },
    {
        id: "freelancer",
        title: "I want work",
        icon: Briefcase,
        color: "text-primary",
        bg: "bg-primary/5",
        features: ["Electrician", "Designer", "Worker"],
    },
    {
        id: "investor",
        title: "I want to invest",
        icon: TrendingUp,
        color: "text-primary",
        bg: "bg-primary/5",
        features: ["Money", "Support"],
    },
    {
        id: "provider",
        title: "I have space",
        icon: Building2,
        color: "text-primary",
        bg: "bg-primary/5",
        features: ["Shop", "Office", "Land"],
    }
];

export default function RoleSelectionPage() {
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && (session?.user as any)?.onboarded) {
            router.replace("/dashboard");
        }
    }, [status, session, router]);

    const handleRoleSelect = (role: string) => {
        // Strict Onboarding: No DB write here. Pass intent to next step.
        router.push(`/onboarding/location?role=${role}`);
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 md:mb-12 space-y-3"
            >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">What do you want?</h1>
                <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
                    Simple language for local businesses
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
                {roles.map((role, index) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card
                            className={`h-full cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-xl group relative overflow-hidden ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => !loading && handleRoleSelect(role.id)}
                        >
                            <CardContent className="p-5 md:p-8">
                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                    <div className={`p-3 md:p-4 rounded-2xl ${role.bg} group-hover:scale-110 transition-transform`}>
                                        <role.icon className={`w-6 h-6 md:w-8 md:h-8 ${role.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl md:text-2xl group-hover:text-primary transition-colors">{role.title}</h3>
                                    </div>
                                </div>

                                <ul className="flex flex-wrap gap-2 mb-4 md:mb-6">
                                    {role.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-xs md:text-sm font-medium bg-secondary/50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-foreground/80">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center text-primary font-semibold text-sm">
                                    Continue <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
