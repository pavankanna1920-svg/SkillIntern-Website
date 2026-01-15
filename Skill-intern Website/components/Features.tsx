"use client";

import { Cpu, Rocket, Globe, Briefcase, Zap, Award, LifeBuoy, Users } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: <Cpu className="w-8 h-8 text-purple-600" />,
            title: "AI-Powered Learning",
            description: "Personalized learning paths adapted to your pace and goals.",
            bg: "bg-purple-50",
        },
        {
            icon: <Rocket className="w-8 h-8 text-blue-600" />,
            title: "Career Acceleration",
            description: "Get placement assistance and career guidance from industry experts.",
            bg: "bg-blue-50",
        },
        {
            icon: <Globe className="w-8 h-8 text-green-600" />,
            title: "Global Community",
            description: "Connect with learners and mentors from around the world.",
            bg: "bg-green-50",
        },
        {
            icon: <Briefcase className="w-8 h-8 text-orange-600" />,
            title: "Real Projects",
            description: "Build a portfolio with real-world projects that employers value.",
            bg: "bg-orange-50",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Skill Intern?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide a comprehensive learning experience that helps you master skills and launch your career.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white text-center group">
                            <div className={`w-16 h-16 rounded-full ${feature.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <BenefitCard
                        title="Industry Projects"
                        description="Work on live projects to gain practical experience."
                        icon={<Zap className="w-6 h-6 text-pink-500" />}
                        color="pink"
                    />
                    <BenefitCard
                        title="Global Recognition"
                        description="Earn certificates recognized by top companies worldwide."
                        icon={<Award className="w-6 h-6 text-purple-500" />}
                        color="purple"
                    />
                    <BenefitCard
                        title="Lifetime Support"
                        description="Get access to course updates and mentor support forever."
                        icon={<LifeBuoy className="w-6 h-6 text-blue-500" />}
                        color="blue"
                    />
                </div>
            </div>
        </section>
    );
}

function BenefitCard({ title, description, icon, color }: any) {
    const colorClasses: { [key: string]: string } = {
        pink: "bg-pink-50 border-pink-100 text-pink-600",
        purple: "bg-purple-50 border-purple-100 text-purple-600",
        blue: "bg-blue-50 border-blue-100 text-blue-600",
    }

    return (
        <div className={`flex items-start gap-4 p-6 rounded-xl border ${colorClasses[color]} bg-opacity-50`}>
            <div className="p-2 bg-white rounded-lg shadow-sm">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    )
}
