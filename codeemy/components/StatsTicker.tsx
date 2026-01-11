"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Award, TrendingUp, BadgeIndianRupee, Globe } from "lucide-react";

const stats = [
    {
        icon: BadgeIndianRupee,
        value: "12L",
        label: "Average Salary",
    },
    {
        icon: Globe,
        value: "500+",
        label: "Hiring Partners",
    },
    {
        icon: Users,
        value: "50K+",
        label: "Students Transformed",
    },
    {
        icon: TrendingUp,
        value: "95%",
        label: "Placement Rate",
    },
    {
        icon: BadgeIndianRupee,
        value: "12L",
        label: "Average Salary",
    },
    {
        icon: Globe,
        value: "500+",
        label: "Hiring Partners",
    },
    {
        icon: Users,
        value: "50K+",
        label: "Students Transformed",
    },
    {
        icon: TrendingUp,
        value: "95%",
        label: "Placement Rate",
    },
    {
        icon: BadgeIndianRupee,
        value: "12L",
        label: "Average Salary",
    },
    {
        icon: Globe,
        value: "500+",
        label: "Hiring Partners",
    },
];

export default function StatsTicker() {
    return (
        <section className="py-8 bg-blue-50/50 border-y border-blue-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-500 uppercase tracking-wider">
                    India's No. 1 Platform For
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-primary mt-2">
                    Online Learning || Skill Up Your Future
                </h3>
            </div>

            <div className="flex relative w-full overflow-hidden py-4">
                <motion.div
                    className="flex gap-6 min-w-full"
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {[...stats, ...stats].map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[250px] p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-brand-primary/30 transition-all hover:shadow-md group"
                        >
                            <div className="p-3 bg-blue-50 rounded-full mb-3 text-brand-primary group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
