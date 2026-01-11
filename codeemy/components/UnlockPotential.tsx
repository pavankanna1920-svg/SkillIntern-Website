import { ArrowRight, Brain, Award, Users } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Brain,
        title: "AI-Powered Learning",
        description: "Personalized curriculum that adapts to your learning style",
        tag: "95% Faster",
        link: "#"
    },
    {
        icon: Award,
        title: "Placement Assistance",
        description: "200+ Students placement in top companies with our placement Assistance program",
        tag: "10K+ Placed",
        link: "#"
    },
    {
        icon: Users,
        title: "Expert Mentorship",
        description: "Learn from industry veterans with 10+ years experience",
        tag: "500+ Mentors",
        link: "#"
    }
];

export default function UnlockPotential() {
    return (
        <section className="py-20 bg-gray-50 text-gray-900 relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 opacity-60"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 opacity-60"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-brand-primary mb-6">
                        ✨ Why 50,000+ Students Choose Us
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                        Unlock Your Potential with <span className="text-brand-primary">SkillIntern.</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Experience a transformative learning journey with cutting-edge AI, expert mentorship, and guaranteed career success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-3xl border border-gray-200 bg-white hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:border-brand-primary/50 group relative overflow-hidden ${index === 1 ? "shadow-lg border-brand-primary/30 ring-1 ring-brand-primary/10" : ""
                                }`}
                        >
                            {/* Card Content */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-full bg-blue-50 text-brand-primary">
                                        <feature.icon className="w-8 h-8" />
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs border border-gray-100 bg-gray-50 text-gray-500">
                                        {feature.tag}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 mb-6 leading-relaxed">
                                    {feature.description}
                                </p>

                                <Link
                                    href={feature.link}
                                    className="inline-flex items-center text-brand-primary font-medium hover:gap-2 transition-all gap-1"
                                >
                                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
