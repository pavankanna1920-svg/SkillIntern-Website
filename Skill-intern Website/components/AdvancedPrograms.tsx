"use client";

import { motion } from "framer-motion";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AdvancedPrograms() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Advanced Programs</h2>
                    <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="space-y-24">
                    {/* Program 1: Digital Marketing */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
                    >
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-semibold">Popular</span>
                                <span className="text-purple-700 font-bold tracking-wide uppercase text-sm">Digital Marketing</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Master Digital Marketing with Industry Experts
                            </h3>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                Learn SEO, SEM, Social Media Marketing, Content Strategy, and Analytics from industry professionals.
                                Build real campaigns and get hands-on experience with top marketing tools.
                            </p>

                            <div className="flex flex-wrap gap-6 text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-purple-600" /> 3 Months
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" /> 200+ Students
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 4.6 Rating
                                </div>
                            </div>

                            <button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-purple-200">
                                Learn More
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
                                    alt="Digital Marketing"
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-purple-100 rounded-2xl"></div>
                        </div>
                    </motion.div>

                    {/* Program 2: AI */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20"
                    >
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4">
                                <span className="bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-semibold">New</span>
                                <span className="text-purple-700 font-bold tracking-wide uppercase text-sm">Artificial Intelligence (AI)</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Become a Artificial Intelligence Expert
                            </h3>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                Master core AI concepts including neural networks, natural language processing, computer vision, and intelligent systems.
                            </p>

                            <div className="flex flex-wrap gap-6 text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-purple-600" /> 4 Months
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-600" /> 200+ Students
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 4.9 Rating
                                </div>
                            </div>

                            <button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-purple-200">
                                Learn More
                            </button>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
                                    alt="Artificial Intelligence"
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-purple-100 rounded-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
