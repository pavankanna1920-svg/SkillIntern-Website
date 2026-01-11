"use client";

import { CheckCircle2, Target, Lightbulb, TrendingUp, Users, Award, Briefcase, Globe } from "lucide-react";
import FAQ from "@/components/FAQ";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-blue-50 py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        About <span className="text-brand-primary">SkillIntern</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                        India's #1 Destination for Future-Ready Education
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-20">
                {/* Introduction */}
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        At <span className="font-bold text-brand-primary">SkillIntern</span> (formerly CodeEmy), we believe education is not just a path to a degree — it's the foundation for transformation. We're on a mission to make quality, skill-based education accessible to every learner, no matter where they come from.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <Globe className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Based in Coimbatore</h3>
                            <p className="text-sm text-gray-500">Impacting learners across India</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <CheckCircle2 className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">NEP 2020 Aligned</h3>
                            <p className="text-sm text-gray-500">Digital learning standards</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            <TrendingUp className="w-10 h-10 text-brand-primary mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900 mb-2">Real Outcomes</h3>
                            <p className="text-sm text-gray-500">Focused on results, not just certificates</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 relative overflow-hidden group hover:border-brand-primary/30 transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-brand-primary" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To empower learners across India with career-relevant, future-ready skills through accessible, affordable, and high-quality education. We bridge the gap between academic knowledge and industry expectations through practical training, mentorship, and placement support.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-50 relative overflow-hidden group hover:border-purple-200 transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                <Lightbulb className="w-7 h-7 text-purple-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed">
                                To become India's most trusted and transformative EdTech platform, equipping every learner with the right skills and mindset to succeed in a digital global economy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Offerings Grid */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            Empowering <span className="text-brand-primary">Your Future</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive programs designed to launch your career.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Python Programming",
                                description: "Master Python with hands-on projects and real-world applications.",
                                icon: Award
                            },
                            {
                                title: "Digital Marketing",
                                description: "Comprehensive training and certifications to become an expert.",
                                icon: TrendingUp
                            },
                            {
                                title: "Communication Skills",
                                description: "Improving soft skills essential for professional success.",
                                icon: Users
                            },
                            {
                                title: "Expert Mentorship",
                                description: "Guidance from industry experts and experienced professionals.",
                                icon: Users
                            },
                            {
                                title: "Certifications",
                                description: "Industry-recognized certifications to boost career prospects.",
                                icon: Award
                            },
                            {
                                title: "Placement Support",
                                description: "Assistance to help land dream jobs and career guidance.",
                                icon: Briefcase
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors text-brand-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQ />

                {/* Call to Action */}
                <div className="bg-brand-primary rounded-3xl p-12 text-center text-white relative overflow-hidden mt-20 mb-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                            Join thousands of learners. Whether you're a student, graduate, or professional — we have the right program for you.
                        </p>
                        <button className="bg-white text-brand-primary px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
