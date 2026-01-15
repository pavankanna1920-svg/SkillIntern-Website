"use client";

import { Star, Clock, BookOpen, BarChart, PlayCircle, Download, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

interface CourseProps {
    course: {
        id: string; // Added id
        title: string;
        description: string;
        rating: number;
        reviews: string;
        duration: string;
        lessons: string;
        level: string;
        price: string;
        originalPrice: string;
        image: string;
        color: string; // "blue", "purple", "green", etc.
        updatedDate: string;
        language: string;
    }
}

export default function CourseCard({ course }: CourseProps) {
    // Map color names to Tailwind classes
    const colorMap: Record<string, string> = {
        blue: "bg-blue-700 hover:bg-blue-800",
        purple: "bg-purple-700 hover:bg-purple-800",
        green: "bg-emerald-600 hover:bg-emerald-700",
        red: "bg-red-600 hover:bg-red-700",
        orange: "bg-orange-600 hover:bg-orange-700",
        indigo: "bg-indigo-600 hover:bg-indigo-700",
    };

    const btnColor = colorMap[course.color] || colorMap.purple;

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${course.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 font-bold py-1.5 px-4 rounded-full text-sm shadow-lg flex items-center gap-2">
                    <span>{course.price}</span>
                    <span className="text-xs text-gray-400 line-through font-normal">{course.originalPrice}</span>
                </div>

                {/* Logo Overlay Placeholder - assuming CodeEmy logo or similar */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <span className="font-bold text-xs">SI</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                {/* Title & Desc */}
                <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight min-h-[56px]">{course.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {course.description}
                </p>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-700">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="text-gray-400">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>{course.lessons}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <BarChart className="w-4 h-4 text-gray-400" />
                        <span>{course.level}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors border border-gray-100">
                        <PlayCircle className="w-4 h-4" /> Preview
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition-colors border border-gray-100">
                        <Download className="w-4 h-4" /> Syllabus
                    </button>
                </div>

                <Link href={`/courses/${course.id}`} className={`w-full ${btnColor} text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2`}>
                    Know More <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Footer Meta */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                    <span>Updated {course.updatedDate}</span>
                    <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{course.language}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
