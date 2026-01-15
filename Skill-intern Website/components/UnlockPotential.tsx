"use client";

import { Brain, Sparkles, Trophy, Users, Zap, Globe, ArrowRight } from "lucide-react";

export default function UnlockPotential() {
    const features = [
        {
            icon: <Brain className="w-8 h-8 text-white" />,
            title: "AI-Powered Learning",
            description: "Personalized curriculum that adapts to your learning style",
            badge: "95% Faster",
            bg: "bg-purple-600",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", // Abstract Tech
        },
        {
            icon: <Trophy className="w-8 h-8 text-white" />,
            title: "Placement Assistance",
            description: "200+ Students placement in top companies with our placement Assistance program",
            badge: "10K+ Placed",
            bg: "bg-emerald-500",
            image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=1000&auto=format&fit=crop", // Success/Trophy
        },
        {
            icon: <Users className="w-8 h-8 text-white" />,
            title: "Expert Mentorship",
            description: "Learn from industry veterans with 10+ years experience",
            badge: "500+ Mentors",
            bg: "bg-blue-500",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop", // Meeting/Mentorship
        },
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "Hands-on Projects",
            description: "Build real-world applications to showcase in your portfolio",
            badge: "1000+ Projects",
            bg: "bg-purple-500",
            image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop", // Coding
        },
        {
            icon: <Globe className="w-8 h-8 text-white" />,
            title: "Global Certification",
            description: "Get recognized worldwide with our accredited certificates",
            badge: "50+ Countries",
            bg: "bg-teal-500",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop", // Laptop/Global
        },
        {
            icon: <Sparkles className="w-8 h-8 text-white" />,
            title: "24/7 Support",
            description: "Get doubts resolved instantly with our dedicated support team",
            badge: "24/7 Available",
            bg: "bg-blue-400",
            image: "https://images.unsplash.com/photo-1534575180408-f7e5ba72909d?q=80&w=1000&auto=format&fit=crop", // Support
        }
    ];

    return (
        <section className="py-24 bg-[#0f1025] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
                        ✨ Why 50,000+ Students Choose Us
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Skill Intern.</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Experience a transformative learning journey with cutting-edge AI, expert mentorship, and guaranteed career success.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                {/* We use a dark gradient overlay on top of an image if we had one, for now just dark gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#0f1025]/90 to-[#0f1025] z-10"></div>

                                {/* Subtle background pattern/image effect */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
                            </div>

                            <div className="relative z-20 p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                                        {feature.icon}
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
                                        {feature.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 mb-8 flex-grow">
                                    {feature.description}
                                </p>

                                <a href="#" className="inline-flex items-center text-purple-400 font-medium hover:text-purple-300 transition-colors group/link mt-auto">
                                    Learn More <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
