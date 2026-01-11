"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
    {
        question: "What is SkillIntern?",
        answer: "SkillIntern is India’s leading career-focused EdTech platform offering online courses, internships, certification programs, and placement training. Our goal is to bridge the gap between college education and real-world industry skills."
    },
    {
        question: "What kind of courses does SkillIntern offer?",
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
        question: "What is the eligibility to join SkillIntern courses?",
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
        answer: "We support all major payment methods including UPI, Debit/Credit Cards, Net Banking, and major payment gateways. EMI options may also be available for select programs."
    },
    {
        question: "Can I access courses on mobile?",
        answer: "Yes! SkillIntern courses can be accessed via mobile, tablet, or desktop. All you need is a stable internet connection and a browser."
    },
    {
        question: "How do I contact SkillIntern for support?",
        answer: "You can reach out to our support team via email or through the contact form on our website."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-sm text-brand-primary mb-6 font-medium">
                        <MessageCircle className="w-4 h-4 inline-block mr-2" /> Got Questions?
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Frequently Asked <span className="text-brand-primary">Questions</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Find answers to common questions about our platform, courses, and certifications.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-100 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:border-brand-primary/30"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-brand-primary' : 'text-gray-900'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeIndex === index ? "rotate-180 text-brand-primary" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
