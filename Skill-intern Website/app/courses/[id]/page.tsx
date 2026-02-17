"use client";

import { courses } from "@/lib/data";
import { ArrowLeft, Star, Clock, BookOpen, BarChart, CheckCircle2, ChevronDown, ChevronUp, Globe, Award, Download, PlayCircle, MonitorPlay, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    // Color mapping
    const colorMap: Record<string, string> = {
        blue: "bg-blue-600",
        purple: "bg-purple-600",
        green: "bg-emerald-600",
        red: "bg-red-600",
        orange: "bg-orange-600",
        indigo: "bg-indigo-600",
        pink: "bg-pink-600",
    };
    const themeColor = colorMap[course.color] || "bg-purple-600";
    const themeColorHex = themeColor.replace("bg-", "text-"); // Hacky but works for text classes
    const lightThemeBg = themeColor.replace("600", "50");

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* --- HERO SECTION --- */}
            <div className={`relative pt-28 pb-32 overflow-hidden ${themeColor}`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-black/10 blur-3xl"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="lg:w-2/3">
                        <Link href="/courses" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Courses
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 text-white/90 mb-6 text-xs font-bold uppercase tracking-wider">
                            <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">{course.tag}</span>
                            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {course.language}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated: {course.updatedDate}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">{course.title}</h1>
                        <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl font-light">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm font-medium text-white/90">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10">
                                <span className="text-yellow-400 font-bold text-lg">{course.rating}</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span className="text-white/70 ml-1">({course.reviews})</span>
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

            {/* --- MAIN CONTENT LAYOUT --- */}
            <div className="container mx-auto px-4 md:px-6 relative z-20 -mt-16 md:-mt-24">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* LEFT COLUMN (Scrollable details) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-2/3 space-y-8"
                    >

                        {/* What You'll Learn (Card Grid) */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-hidden">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <CheckCircle2 className={`w-6 h-6 ${themeColorHex}`} />
                                What you'll learn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                {course.learningOutcomes?.length ? (
                                    course.learningOutcomes.map((outcome, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`mt-1 min-w-[1.25rem] h-5 rounded-full ${lightThemeBg} flex items-center justify-center`}>
                                                <CheckCircle2 className={`w-3.5 h-3.5 ${themeColorHex}`} />
                                            </div>
                                            <span className="text-gray-700 text-sm leading-relaxed">{outcome}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic col-span-2">Detailed learning outcomes coming soon.</p>
                                )}
                            </div>
                        </section>

                        {/* Course Syllabus */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen className={`w-6 h-6 ${themeColorHex}`} />
                                Course Syllabus
                            </h2>
                            <div className="space-y-4">
                                {course.syllabus?.length ? (
                                    course.syllabus.map((module, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-sm bg-white">
                                            <button
                                                onClick={() => setOpenModuleIndex(openModuleIndex === idx ? null : idx)}
                                                className={`w-full flex items-center justify-between p-5 transition-colors text-left ${openModuleIndex === idx ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${openModuleIndex === idx ? `${themeColor} text-white` : 'bg-gray-100 text-gray-500'}`}>
                                                        {idx + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className={`font-semibold text-lg ${openModuleIndex === idx ? 'text-gray-900' : 'text-gray-700'}`}>{module.title}</h3>
                                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                                                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {module.lessons}</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {openModuleIndex === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                            </button>

                                            <AnimatePresence>
                                                {openModuleIndex === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    >
                                                        <div className="p-5 border-t border-gray-200 bg-white">
                                                            <ul className="space-y-3">
                                                                {module.content.map((item, i) => (
                                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group">
                                                                        <MonitorPlay className="w-4 h-4 text-gray-400 mt-0.5 group-hover:text-blue-500 transition-colors" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Syllabus details coming soon.</p>
                                )}
                            </div>
                        </section>

                        {/* Requirements */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                            <ul className="grid gap-3">
                                {course.requirements?.length ? (
                                    course.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-700 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                            {req}
                                        </li>
                                    ))
                                ) : (
                                    <li className="italic text-gray-500">None specified.</li>
                                )}
                            </ul>
                        </section>

                        {/* Certification Preview */}
                        <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-md p-8 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                            {/* Decorative Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="flex-1 relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Award className="w-8 h-8 text-yellow-500" />
                                    <h2 className="text-2xl font-bold">Official Certification</h2>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed text-sm lg:text-base">
                                    Earn a verified certificate of accomplishment upon completing the course. Share it on LinkedIn and add it to your resume to stand out.
                                </p>
                                <button className={`px-6 py-3 rounded-lg font-bold text-white ${themeColor} shadow-lg hover:brightness-110 transition-all text-sm`}>
                                    Preview Certificate
                                </button>
                            </div>
                            <div className="w-full md:w-1/3 relative z-10">
                                <div className="bg-white p-1.5 rounded shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    {course.certificateImage ? (
                                        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden rounded border border-gray-200">
                                            <img
                                                src={course.certificateImage}
                                                alt={`${course.title} Certificate`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-[4/3] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center p-4 text-center">
                                            <Award className={`w-12 h-12 text-gray-300 mb-2`} />
                                            <p className="text-xs text-gray-400">Image not available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* FAQs */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {course.faqs?.length ? (
                                    course.faqs.map((faq, idx) => (
                                        <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                                className={`w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors ${openFaqIndex === idx ? 'bg-gray-50' : ''}`}
                                            >
                                                {faq.question}
                                                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                                            </button>
                                            <AnimatePresence>
                                                {openFaqIndex === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                    >
                                                        <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed bg-gray-50">
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No FAQs available.</p>
                                )}
                            </div>
                        </section>
                    </motion.div>

                    {/* RIGHT COLUMN (Sticky Pricing Card) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:w-1/3 relative"
                    >
                        <div className="sticky top-24 space-y-6">

                            {/* Course Enrollment Card */}
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 ring-1 ring-black/5">
                                {/* Video/Image Area */}
                                <div className="relative h-48 bg-gray-900 group cursor-pointer overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:opacity-75 transition-opacity duration-300 group-hover:scale-105 transform"
                                        style={{ backgroundImage: `url(${course.image})` }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <PlayCircle className="w-14 h-14 text-white drop-shadow-md" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-medium">Preview Course</span>
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="flex items-baseline gap-3 mb-2">
                                        <span className="text-3xl font-extrabold text-gray-900">{course.price}</span>
                                        <span className="text-lg text-gray-400 line-through font-medium">{course.originalPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wide">50% OFF</span>
                                        <span className="text-red-500 text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Offer ends soon!</span>
                                    </div>

                                    <button className={`w-full ${themeColor} hover:brightness-110 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-purple-900/10 transition-all transform active:scale-[0.98] mb-4`}>
                                        Enroll Now
                                    </button>
                                    <p className="text-center text-xs text-gray-500 mb-6">30-Day Money-Back Guarantee</p>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h4 className="font-bold text-gray-900 text-sm mb-4">This Course Includes:</h4>
                                        <ul className="space-y-3 text-sm text-gray-600">
                                            <li className="flex items-center gap-3">
                                                <PlayCircle className="w-4 h-4 text-gray-400" /> {course.duration} on-demand video
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Download className="w-4 h-4 text-gray-400" /> {course.lessons}
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

                            {/* Training for Business */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h4 className="font-bold text-gray-900 mb-2">Training 5 or more people?</h4>
                                <p className="text-sm text-gray-500 mb-4">Get your team access to SkillIntern's top 2,000+ courses anytime, anywhere.</p>
                                <button className="w-full border border-gray-300 text-gray-700 font-semibold text-sm py-2 rounded-lg hover:bg-gray-50 text-center">
                                    Get SkillIntern Business
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
