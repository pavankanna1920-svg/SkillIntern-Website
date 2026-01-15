"use client";

import { ArrowRight, CheckCircle, Users, Briefcase, TrendingUp } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

export default function Hero() {
    return (
        <section className="relative pt-20 pb-16 overflow-hidden">
            {/* Background Elements if needed */}
            <div className="absolute top-0 right-0 -z-10 opacity-10">
                {/* Placeholder for abstract shape */}
                <div className="w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium border border-purple-100">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            New Batches Starting Soon
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                            Join The <span className="text-primary">Top 1%</span> <br />
                            Master Skills That Matter
                        </h1>

                        <p className="text-lg text-gray-600 max-w-lg">
                            Empower your career with industry-leading courses. Learn from experts, build real-world projects, and get placed in top companies.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/courses" className="inline-flex items-center gap-2 bg-primary hover:bg-purple-700 text-white px-8 py-3.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-purple-200">
                                Explore Courses <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/about" className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-purle-200 hover:bg-purple-50 text-gray-700 px-8 py-3.5 rounded-full font-medium transition-colors">
                                Book a Free Demo
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs overflow-hidden">
                                        {/* Placeholder avatars */}
                                        <span className="bg-gray-300 w-full h-full block"></span>
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by 10,000+ Students</p>
                        </div>
                    </div>

                    {/* Right Image/Graphic */}
                    <div className="relative transform hover:scale-105 transition-transform duration-500 flex justify-center">
                        <div className="relative w-full max-w-lg aspect-[4/3]">
                            <NextImage
                                src="/hero_image_new.png"
                                alt="Student Learning"
                                fill
                                className="object-cover rounded-2xl shadow-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <StatItem number="500+" label="Hiring Partners" icon={<Briefcase className="w-5 h-5 text-primary" />} />
                    <StatItem number="50K+" label="Students Transformed" icon={<Users className="w-5 h-5 text-blue-500" />} />
                    <StatItem number="95%" label="Placement Rate" icon={<CheckCircle className="w-5 h-5 text-green-500" />} />
                    <StatItem number="₹12L" label="Average Salary" icon={<TrendingUp className="w-5 h-5 text-orange-500" />} />
                </div>
            </div>
        </section>
    );
}

function StatItem({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center text-center px-4 py-2 group hover:transform hover:scale-105 transition-transform">
            <div className="mb-2 p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{number}</h3>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
        </div>
    )
}
