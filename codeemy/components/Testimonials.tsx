"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const testimonials = [
    {
        quote: "The AI and machine learning courses here are absolutely world-class. Transformed my understanding completely.",
        name: "Ranjith",
        role: "AI Engineer at TechNow",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ranjith" // Placeholder avatar
    },
    {
        quote: "The hands-on projects gave me the confidence to crack my dream interview. Highly recommended!",
        name: "Priya Sharma",
        role: "Frontend Developer at Amazon",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
        quote: "Best platform to upskill. The mentorship provided was invaluable for my career growth.",
        name: "Rahul Verma",
        role: "Data Scientist at Google",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center text-gray-900">
                <h2 className="text-3xl md:text-5xl font-bold mb-12">
                    What Our Students Say
                </h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* Background Decorative Blobs */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px] -translate-x-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px] translate-x-1/2"></div>

                    <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-xl border border-white/50">
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-xl md:text-2xl text-gray-700 italic font-medium mb-8 leading-relaxed">
                            "{testimonials[activeIndex].quote}"
                        </p>

                        {/* User Info */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-primary p-0.5">
                                <div className="w-full h-full rounded-full bg-gray-100 relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={testimonials[activeIndex].image}
                                        alt={testimonials[activeIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900">
                                    {testimonials[activeIndex].name}
                                </h4>
                                <p className="text-brand-primary font-medium">
                                    {testimonials[activeIndex].role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-brand-primary" : "w-3 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
