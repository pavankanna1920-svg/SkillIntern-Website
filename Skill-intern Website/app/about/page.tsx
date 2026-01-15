"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Users, Target, Trophy, Clock, CheckCircle2,
    Code, Megaphone, MessageSquare, Award, Briefcase,
    ChevronDown, ChevronUp, ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is Skill Intern?",
            answer: "Skill Intern is India’s leading career-focused EdTech platform offering online courses, internships, certification programs, and placement training. Our goal is to bridge the gap between college education and real-world industry skills."
        },
        {
            question: "What kind of courses does Skill Intern offer?",
            answer: "We offer job-oriented courses in Python Programming, Digital Marketing, Soft Skills, Interview Preparation, and more. All programs are designed to meet industry standards and boost employability."
        },
        {
            question: "Are the courses live or recorded?",
            answer: "We offer a blend of live and recorded classes to give learners flexibility and real-time interaction. You can attend live sessions, access recordings anytime, and learn at your own pace."
        },
        {
            question: "Do I get a certificate after completing a course?",
            answer: "Yes, every learner receives a verified digital certificate upon successful course completion. This certificate can be used to enhance your resume or LinkedIn profile."
        },
        {
            question: "Is there any placement or internship support?",
            answer: "Absolutely. We provide internship opportunities, placement training, resume building, mock interviews, and soft skills sessions to help you become job-ready."
        },
        {
            question: "What is the eligibility to join Skill Intern courses?",
            answer: "Anyone above the age of 17 can join. Our programs are best suited for college students, fresh graduates, job seekers, and working professionals who wish to upskill."
        },
        {
            question: "How do I register for a course?",
            answer: "Visit our website, choose your desired course, and click on Enroll Now. You can also contact our support team for assistance."
        },
        {
            question: "Is there a free demo class available?",
            answer: "Yes, we provide free demo sessions or trial classes for most programs. It helps you understand the teaching style and course structure before committing."
        },
        {
            question: "What are the payment options?",
            answer: "We support all major payment methods including UPI, Debit/Credit Cards, Net Banking, and popular wallets. EMI options may also be available for select programs."
        },
        {
            question: "Can I access courses on mobile?",
            answer: "Yes! Skill Intern courses can be accessed via mobile, tablet, or desktop. All you need is a stable internet connection and a browser."
        },
        {
            question: "How do I contact Skill Intern for support?",
            answer: "You can reach out to our support team via email at info@skillintern.in or use the live chat feature on our website."
        }
    ];

    const features = [
        {
            icon: <Code className="w-8 h-8 text-blue-600" />,
            title: "Python Programming",
            description: "Master the language of the future with comprehensive modules from basics to advanced AI applications."
        },
        {
            icon: <Megaphone className="w-8 h-8 text-purple-600" />,
            title: "Digital Marketing",
            description: "Learn SEO, SEM, and social media strategies to become a top-tier digital marketer."
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-green-600" />,
            title: "Communication Skills",
            description: "Enhance your corporate communication, soft skills, and personality development."
        },
        {
            icon: <Users className="w-8 h-8 text-orange-600" />,
            title: "Expert Mentorship",
            description: "Get guided by industry veterans with real-world experience and personalized feedback."
        },
        {
            icon: <Award className="w-8 h-8 text-red-600" />,
            title: "Certifications",
            description: "Earn globally recognized certificates that validate your skills and boost your resume."
        },
        {
            icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
            title: "Placement Support",
            description: "Dedicated placement assistance with resume building, mock interviews, and job referrals."
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50">

            {/* --- HERO SECTION --- */}
            <section className="relative bg-gradient-to-br from-[#1a1c2e] to-[#0d0f1a] text-white pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2 space-y-6">
                        <div className="inline-block bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-300 mb-2">
                            Transforming Education
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skill Intern</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                            India's #1 Destination for Future-Ready Education. we bridge the gap between academic learning and industry demands.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span> Learn
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-blue-400"></span> Grow
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-purple-400"></span> Get Placed
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        {/* Placeholder for AI Illustration - Using a generic tech team image for now */}
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                                alt="Team Collaboration"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-xl flex items-center gap-3 z-20 animate-bounce-slow">
                            <div className="bg-yellow-100 p-2 rounded-lg">
                                <Users className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">10,000+</div>
                                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Learners</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="py-12 -mt-8 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Based in", value: "Coimbatore", icon: <Target className="w-6 h-6 text-red-500" />, desc: "Heart of Innovation" },
                            { title: "Curriculum", value: "NEP 2020 Aligned", icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, desc: "Future-Ready" },
                            { title: "Focus on", value: "Real Outcomes", icon: <Trophy className="w-6 h-6 text-yellow-500" />, desc: "Career Growth" },
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6 hover:translate-y-[-4px] transition-transform">
                                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.title}</p>
                                    <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
                                    <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MISSION SECTION --- */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">
                                <Target className="w-5 h-5" /> Our Mission
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Empowering the Next Generation of Tech Leaders</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                At Skill Intern, our mission is to democratize access to high-quality technology education. We believe that everyone deserves the chance to master the skills that will define the future.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We are committed to providing hands-on, project-based learning experiences that bridge the gap between theory and practice, ensuring our students are job-ready from day one.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
                                    alt="Our Mission"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-xl">Building Futures</p>
                                    <p className="text-sm opacity-80">One student at a time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VISION SECTION --- */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 text-purple-600 font-bold uppercase tracking-wider text-sm mb-4">
                                <Trophy className="w-5 h-5" /> Our Vision
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">To Be the Most Trusted & Transformative EdTech Platform</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                We envision a world where geography and background are no longer barriers to success. Our vision is to create a global community of lifelong learners who are equipped to tackle the world's most pressing challenges through technology.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Innovation in every lesson.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Inclusivity in our community.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Integrity in our certification.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                <img
                                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
                                    alt="Our Vision"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-xl">Global Impact</p>
                                    <p className="text-sm opacity-80">Connecting minds worldwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Empowering Your Future</h2>
                        <p className="text-gray-600 text-lg">
                            We provide a comprehensive ecosystem for learning and growth, covering everything from technical skills to career development.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-default">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                                    <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 text-lg">Got questions? We've got answers.</p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-300">
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                    className={`w-full flex items-center justify-between p-6 text-left font-semibold text-lg transition-colors ${openFaqIndex === idx ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                                >
                                    {faq.question}
                                    {openFaqIndex === idx ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
                                </button>
                                {openFaqIndex === idx && (
                                    <div className="p-6 pt-0 bg-blue-50 text-gray-600 leading-relaxed border-t border-blue-100">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Future?</h2>
                            <p className="text-xl text-blue-100 mb-10">
                                Join thousands of learners who are already building their dream careers with Skill Intern.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/courses" className="bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                                    Explore Courses
                                </Link>
                                <Link href="/#contact" className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
