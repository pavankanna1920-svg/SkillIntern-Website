import { Zap, GraduationCap, Globe, Briefcase } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "AI-Powered Learning",
        description: "Personalized curriculum adapted to your pace",
    },
    {
        icon: GraduationCap,
        title: "Career Acceleration",
        description: "Fast-track to your dream job with mentorship",
    },
    {
        icon: Globe,
        title: "Global Community",
        description: "Connect with learners and experts worldwide",
    },
    {
        icon: Briefcase,
        title: "Real Projects",
        description: "Build portfolio with industry-standard projects",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Why Choose <span className="text-brand-primary">SkillIntern</span> ?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-brand-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group"
                        >
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-brand-primary text-3xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
