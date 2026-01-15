"use client";

import { Rocket, BookOpen } from "lucide-react";

export default function TransformCareer() {
    return (
        <section className="py-20 bg-[#0f1025] flex justify-center">
            <div className="container mx-auto px-4 md:px-6">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 p-12 md:p-16 text-center shadow-2xl">
                    {/* Background Texture/Effects */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Career?
                        </h2>
                        <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
                            Join 50,000+ successful professionals who chose Skill Intern for their career transformation.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="flex items-center gap-2 bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg">
                                <Rocket className="w-5 h-5" />
                                Start Your Journey
                            </button>
                            <button className="flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-lg font-bold transition-all">
                                <BookOpen className="w-5 h-5" />
                                Explore Courses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
