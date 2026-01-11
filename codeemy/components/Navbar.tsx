"use client";

import Link from "next/link";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo.png"
                        alt="Skill Intern Logo"
                        className="h-10 w-auto group-hover:opacity-90 transition-opacity"
                    />
                    <span className="sr-only">SkillIntern</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
                    <Link href="/" className="hover:text-brand-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/courses" className="hover:text-brand-primary transition-colors">
                        Courses
                    </Link>
                    <Link href="/profile" className="hover:text-brand-primary transition-colors">
                        My Learning
                    </Link>
                    <Link href="/certificate" className="hover:text-brand-primary transition-colors">
                        Certificate
                    </Link>
                    <Link href="/about" className="hover:text-brand-primary transition-colors">
                        About
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <AnimatePresence mode="wait">
                        {isSearchOpen ? (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "auto", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 mr-2 overflow-hidden"
                            >
                                <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                                <input
                                    className="bg-transparent border-none focus:outline-none text-sm w-48 text-gray-700 placeholder:text-gray-400"
                                    placeholder="Search courses..."
                                    autoFocus
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3 text-gray-500" />
                                </button>
                            </motion.div>
                        ) : (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        )}
                    </AnimatePresence>
                    <Link
                        href="/login"
                        className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-medium transition-all shadow-[0_4px_14px_0_rgba(67,127,164,0.39)] hover:shadow-[0_6px_20px_rgba(67,127,164,0.23)] hover:-translate-y-0.5"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4 text-gray-600 font-medium">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary/20"
                                />
                            </div>
                            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-brand-primary">
                                Home
                            </Link>
                            <Link href="/courses" onClick={() => setIsOpen(false)} className="hover:text-brand-primary">
                                Courses
                            </Link>
                            <Link href="/profile" onClick={() => setIsOpen(false)} className="hover:text-brand-primary">
                                My Learning
                            </Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-brand-primary">
                                About
                            </Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-brand-primary">
                                Contact
                            </Link>
                            <hr className="border-gray-100" />
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center px-5 py-2 bg-brand-primary text-white rounded-full font-medium shadow-lg shadow-brand-primary/20"
                            >
                                Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
