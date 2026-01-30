"use client";

import { Rocket, Briefcase, TrendingUp, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ROLES = [
    {
        id: "founder",
        title: "Founder",
        desc: "I need help",
        icon: Rocket,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "hover:border-red-200"
    },
    {
        id: "freelancer",
        title: "Freelancer",
        desc: "I offer skills",
        icon: Briefcase,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "hover:border-blue-200"
    },
    {
        id: "investor",
        title: "Investor",
        desc: "I invest in startups",
        icon: TrendingUp,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "hover:border-green-200"
    },
    {
        id: "provider",
        title: "Space Provider",
        desc: "I offer workspace",
        icon: Building2,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "hover:border-purple-200"
    }
];

export function RoleShowcase() {
    return (
        <section className="py-24 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ROLES.map((role) => (
                        <Card key={role.id} className={`group cursor-pointer border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ${role.border}`}>
                            <CardContent className="p-8 flex flex-col items-center text-center">
                                <div className={`w-16 h-16 rounded-2xl ${role.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <role.icon className={`w-8 h-8 ${role.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0B0D12] mb-2">{role.title}</h3>
                                <p className="text-gray-500">{role.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
