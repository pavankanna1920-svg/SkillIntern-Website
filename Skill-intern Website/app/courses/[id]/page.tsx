"use client";

import { courses } from "@/lib/data";
import { ArrowLeft, Star, Clock, BookOpen, BarChart, CheckCircle2, ChevronDown, ChevronUp, Globe, Award, Download, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CourseDetailsPage() {
    const params = useParams();
    const course = courses.find((c) => c.id === params.id);

    // State for syllabus and FAQ accordions
    const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
                    <Link href="/courses" className="text-blue-600 hover:text-blue-800 font-medium">
                        &larr; Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    // Color mapping similar to CourseCard
    const colorMap: Record<string, string> = {
        blue: "bg-blue-600",
        purple: "bg-purple-600",
        green: "bg-emerald-600",
        red: "bg-red-600",
        orange: "bg-orange-600",
        indigo: "bg-indigo-600",
    };
    const themeColor = colorMap[course.color] || "bg-purple-600";
    const lightThemeColor = themeColor.replace("600", "50"); // ultra-hacky simpler background derivation if needed, or just use gray-50

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* --- HERO SECTION --- */}
            <div className={`${themeColor} text-white pt-24 pb-32 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Left Content */}
                        <div className="lg:w-2/3">
                            <Link href="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
                            </Link>

                            <div className="flex items-center gap-2 text-white/90 mb-4 text-xs font-bold uppercase tracking-wider">
                                <span className="bg-white/20 px-3 py-1 rounded-full">{course.tag}</span>
                                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {course.language}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last updated: {course.updatedDate}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{course.title}</h1>
                            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/90">
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <span className="text-yellow-400 font-bold text-lg">{course.rating}</span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-white/70">({course.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 opacity-80" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 opacity-80" />
                                    <span>{course.lessons}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart className="w-5 h-5 opacity-80" />
                                    <span>{course.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT LAYOUT --- */}
            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN (Scrollable details) */}
                    <div className="lg:w-2/3 space-y-12">

                        {/* What You'll Learn */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                What you'll learn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.learningOutcomes?.length ? (
                                    course.learningOutcomes.map((outcome, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${themeColor.replace("bg-", "text-")}`} />
                                            <span className="text-gray-700 text-sm leading-relaxed">{outcome}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Detailed learning outcomes coming soon.</p>
                                )}
                            </div>
                        </section>

                        {/* Course Syllabus (Accordion) */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
                            <div className="space-y-4">
                                {course.syllabus?.length ? (
                                    course.syllabus.map((module, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setOpenModuleIndex(openModuleIndex === idx ? null : idx)}
                                                className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                            >
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                                                    <div className="text-xs text-gray-500 mt-1 flex gap-3">
                                                        <span>{module.lessons}</span>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full self-center"></span>
                                                        <span>{module.duration}</span>
                                                    </div>
                                                </div>
                                                {openModuleIndex === idx ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                            </button>

                                            {/* Accordion Content */}
                                            {openModuleIndex === idx && (
                                                <div className="p-5 bg-white border-t border-gray-200">
                                                    <ul className="space-y-3">
                                                        {module.content.map((item, i) => (
                                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                                <PlayCircle className="w-4 h-4 text-gray-400" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Syllabus details coming soon.</p>
                                )}
                            </div>
                        </section>

                        {/* Requirements */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {course.requirements?.length ? (
                                    course.requirements.map((req, idx) => (
                                        <li key={idx} className="pl-2">{req}</li>
                                    ))
                                ) : (
                                    <li className="pl-2 italic text-gray-500">None specified.</li>
                                )}
                            </ul>
                        </section>

                        {/* Certification */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Certification</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Get an industry-recognized certificate upon completion. Add it to your resume and LinkedIn profile to showcase your skills to top recruiters.
                                </p>
                                <button className={`px-6 py-3 rounded-lg font-semibold text-white ${themeColor} hover:opacity-90 transition-opacity`}>
                                    Preview Certificate
                                </button>
                            </div>
                            <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-2 border border-gray-200 shadow-inner">
                                {/* Placeholder for Certificate Image */}
                                <div className="aspect-[4/3] bg-white border border-gray-200 flex flex-col items-center justify-center p-4 text-center">
                                    <Award className={`w-12 h-12 ${themeColor.replace("bg-", "text-")} mb-2`} />
                                    <h4 className="font-serif text-gray-900 font-bold">CERTIFICATE</h4>
                                    <p className="text-[10px] text-gray-500 mt-1">OF COMPLETION</p>
                                </div>
                            </div>
                        </section>

                        {/* FAQs */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {course.faqs?.length ? (
                                    course.faqs.map((faq, idx) => (
                                        <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                            <button
                                                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                                className="w-full flex items-center justify-between py-3 text-left font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                            >
                                                {faq.question}
                                                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </button>
                                            {openFaqIndex === idx && (
                                                <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.answer}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No FAQs available.</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN (Sticky Pricing Card) */}
                    <div className="lg:w-1/3 relative">
                        <div className="sticky top-24 space-y-6">

                            {/* Course Enrollment Card */}
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                {/* Video/Image Area */}
                                <div className="relative h-48 bg-gray-900 group cursor-pointer">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-60 transition-opacity"
                                        style={{ backgroundImage: `url(${course.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PlayCircle className="w-16 h-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-medium text-sm">Preview Course</span>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-end gap-3 mb-2">
                                        <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                                        <span className="text-lg text-gray-400 line-through mb-1 font-medium">{course.originalPrice}</span>
                                        <span className="text-emerald-600 font-bold mb-1 text-sm bg-emerald-50 px-2 py-0.5 rounded">50% OFF</span>
                                    </div>
                                    <p className="text-red-500 text-sm font-medium mb-6 flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Offer ends soon!
                                    </p>

                                    <button className={`w-full ${themeColor} hover:opacity-90 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-purple-200 transition-all transform active:scale-95 mb-4`}>
                                        Enroll Now
                                    </button>
                                    <p className="text-center text-xs text-gray-500 mb-6">If you didn't get access within 3 days, the amount will be refunded.</p>

                                    <div className="space-y-4 pt-6 border-t border-gray-100">
                                        <h4 className="font-bold text-gray-900 text-sm">This Course Includes:</h4>
                                        <ul className="space-y-3 text-sm text-gray-600">
                                            <li className="flex items-center gap-3">
                                                <PlayCircle className="w-4 h-4 text-gray-400" /> {course.duration} on-demand video
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Download className="w-4 h-4 text-gray-400" /> 60 downloadable resources
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Globe className="w-4 h-4 text-gray-400" /> Full lifetime access
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Award className="w-4 h-4 text-gray-400" /> Certificate of completion
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Box */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                                <h4 className="font-bold text-gray-900 mb-2">Have questions?</h4>
                                <p className="text-sm text-gray-500 mb-4">Our support team is just a click away.</p>
                                <button className="text-blue-600 font-semibold text-sm hover:underline">Chat on WhatsApp</button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
