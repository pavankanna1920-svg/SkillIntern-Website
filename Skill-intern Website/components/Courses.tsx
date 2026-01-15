"use client";

import { courses } from "@/lib/data";
import CourseCard from "@/components/Courses/CourseCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Courses() {
    // Show only the first 6 courses on the homepage
    const homeCourses = courses.slice(0, 6);

    return (
        <section className="py-24 bg-[#fef6ff]"> {/* Light purple background */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Most Popular Courses</h2>
                        <p className="text-gray-600 max-w-2xl text-lg">
                            Join thousands of students mastering the skills that matter most in today's job market
                        </p>
                    </div>
                    <Link href="/courses" className="hidden md:flex items-center gap-2 text-purple-700 font-bold hover:gap-3 transition-all">
                        View All Courses <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {homeCourses.map((course, index) => (
                        <div key={index} className="h-full">
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/courses" className="inline-flex items-center gap-2 text-purple-700 font-bold hover:gap-3 transition-all">
                        View All Courses <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

