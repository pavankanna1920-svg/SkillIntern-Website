"use client";

import Link from "next/link";
import { Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0b0c1e] text-gray-400 py-16 border-t border-gray-800 font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Placeholder Logo - keeping existing logic */}
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <span className="text-xl font-bold text-white">Skill Intern</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Transforming careers through industry-expert mentorship, hands-on projects, and guaranteed placement support. Join the future of tech education.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="https://www.instagram.com/skillintern_official/#" />
                            <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/company/skillintern/" />
                            <SocialIcon icon={<Youtube className="w-5 h-5" />} href="https://www.youtube.com/@SKILLINTERNHSR" />
                        </div>
                    </div>

                    {/* Programs Column */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Programs</h3>
                        <ul className="space-y-4 text-sm">
                            <FooterLink href="#">Full Stack Development</FooterLink>
                            <FooterLink href="#">Data Analytics</FooterLink>
                            <FooterLink href="#">Artificial Intelligence</FooterLink>
                            <FooterLink href="#">Android & iOS App Development</FooterLink>
                            <FooterLink href="#">Digital Marketing</FooterLink>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-4 text-sm">
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/certificate">Certificate Verification</FooterLink>
                            <FooterLink href="#">Reviews</FooterLink>
                            <FooterLink href="#">Disclaimer</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Support</h3>
                        <ul className="space-y-4 text-sm">
                            <FooterLink href="#">Help Center</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                            <FooterLink href="#">Terms of Service</FooterLink>
                            <FooterLink href="#">Refund Policy</FooterLink>
                            <FooterLink href="#">Cookie Policy</FooterLink>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm">
                    <div className="text-center md:text-left text-gray-500">
                        © 2025 Skill Intern. All rights reserved. || Developed by Sasikumar
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-center md:text-left">
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors max-w-xs">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>VIDHYAPEET SKILL INTERN PRIVATE LIMITED, Third Floor, Flat No. 434, J R Arcade, 17th Cross, 19th Main, Sector–4, HSR Layout, Bengaluru – 560102</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>+91 8248670255</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span>Operation@skillintern.in</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1 group">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="group-hover:translate-x-1 transition-transform">{children}</span>
            </Link>
        </li>
    );
}
