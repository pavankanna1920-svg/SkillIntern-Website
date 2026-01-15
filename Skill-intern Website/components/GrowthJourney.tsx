"use client";

import { motion } from "framer-motion";
import { Target, Code2, Star, Trophy } from "lucide-react";

export default function GrowthJourney() {
    const steps = [
        {
            id: 1,
            title: "Assessment & Planning",
            description: "AI analyzes your skills and creates personalized learning path",
            icon: <Target className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Assessment/Data
            align: "left",
            color: "border-purple-500 text-purple-500",
            gradient: "from-purple-500 to-indigo-500"
        },
        {
            id: 2,
            title: "Skill Building",
            description: "Learn through hands-on projects with expert mentorship",
            icon: <Code2 className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop", // Collab/Learning
            align: "right",
            color: "border-cyan-500 text-cyan-500",
            gradient: "from-cyan-500 to-teal-500"
        },
        {
            id: 3,
            title: "Portfolio Creation",
            description: "Build impressive portfolio with real industry projects",
            icon: <Star className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop", // Code/Design
            align: "left",
            color: "border-blue-500 text-blue-500",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            id: 4,
            title: "Job Placement",
            description: "200+ Students placement in top companies with our placement Assistance program",
            icon: <Trophy className="w-8 h-8 text-white" />,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop", // Success/Office
            align: "right",
            color: "border-purple-500 text-purple-500",
            gradient: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <section className="py-24 bg-[#0f1025] relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Growth Journey</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 transform -translate-x-1/2 hidden md:block"></div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col md:flex-row items-center cursor-pointer group ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 flex ${step.align === 'right' ? 'justify-start md:pl-16' : 'justify-end md:pr-16'}`}>
                                    <div className="bg-[#1a1b3a]/80 backdrop-blur-sm border border-gray-800 p-1 rounded-2xl w-full max-w-md hover:border-purple-500/50 transition-colors duration-300">
                                        <div className="bg-[#1a1b3a] rounded-xl overflow-hidden shadow-2xl">
                                            <div className="relative h-48 overflow-hidden">
                                                <img src={step.image} alt={step.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b3a] to-transparent"></div>
                                                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} p-0.5 shadow-lg`}>
                                                        <div className="w-full h-full bg-[#1a1b3a] rounded-full flex items-center justify-center">
                                                            {step.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-8 text-center">
                                                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="relative z-10 flex items-center justify-center w-12 h-12 my-4 md:my-0">
                                    <div className={`w-12 h-12 rounded-full border-4 bg-[#0f1025] ${step.color} flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(168,85,247,0.5)]`}>
                                        {step.id}
                                    </div>
                                </div>

                                {/* Empty Space for Grid alignment */}
                                <div className="w-full md:w-1/2 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
