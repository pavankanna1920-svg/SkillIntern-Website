"use client";

import { Users, IndianRupee, Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsMarquee() {
    const stats = [
        {
            icon: <Users className="w-4 h-4 text-purple-600" />,
            text: "1500+ users",
        },
        {
            icon: <IndianRupee className="w-4 h-4 text-green-600" />,
            text: "4 Lakhs + salaries",
        },
        {
            icon: <Star className="w-4 h-4 text-yellow-500 fill-current" />,
            text: "500+ reviews",
        },
        {
            icon: <MessageSquare className="w-4 h-4 text-blue-600" />,
            text: "1000+ Interviews",
        },
    ];

    const marqueeCards = [
        {
            color: "text-green-600",
            bg: "bg-green-100",
            value: "95%",
            label: "Placement Rate",
            icon: "📈",
        },
        {
            color: "text-blue-600",
            bg: "bg-blue-100",
            value: "₹12L",
            label: "Average Salary",
            icon: "🎖️",
        },
        {
            color: "text-purple-600",
            bg: "bg-purple-100",
            value: "500+",
            label: "Hiring Partners",
            icon: "🌐",
        },
        {
            color: "text-pink-600",
            bg: "bg-pink-100",
            value: "50K+",
            label: "Students Transformed",
            icon: "👥",
        },
        // Duplicate for variety
        {
            color: "text-blue-600",
            bg: "bg-blue-100",
            value: "₹12L",
            label: "Average Salary",
            icon: "🎖️",
        },
        {
            color: "text-purple-600",
            bg: "bg-purple-100",
            value: "500+",
            label: "Hiring Partners",
            icon: "🌐",
        },
    ];

    return (
        <section className="py-12 bg-purple-50 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-10">
                <h2 className="text-gray-800 font-bold uppercase tracking-wide text-sm mb-2">
                    India&apos;s No. 1 Platform For
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
                    Online Learning || Skill Up Your Future
                </h3>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700 font-medium">
                            {stat.icon}
                            <span>{stat.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee Rows */}
            <div className="relative flex flex-col gap-6">
                {/* Row 1 - Left to Right */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 min-w-full"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: "linear"
                        }}
                    >
                        {[...marqueeCards, ...marqueeCards, ...marqueeCards].map((card, idx) => (
                            <MarqueeCard key={`row1-${idx}`} card={card} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Right to Left (Optional, or just duplicate row 1 style if strictly following image which seems to have multiple similar rows) 
             Image shows uniform cards, let's just stick to one nice scrolling flow or two for density.
         */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 min-w-full"
                        animate={{ x: [-1000, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 35,
                            ease: "linear"
                        }}
                    >
                        {[...marqueeCards, ...marqueeCards, ...marqueeCards].map((card, idx) => (
                            <MarqueeCard key={`row2-${idx}`} card={card} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

interface MarqueeCardProps {
    card: {
        bg: string;
        icon: string;
        value: string;
        label: string;
    }
}

function MarqueeCard({ card }: MarqueeCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-w-[200px] md:min-w-[240px]">
            <div className={`w-12 h-12 rounded-full ${card.bg} flex items-center justify-center text-2xl mb-3`}>
                {card.icon}
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{card.value}</h4>
            <p className="text-gray-500 text-sm">{card.label}</p>
        </div>
    )
}
