import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1F2438] text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <img
                                src="/logo.png"
                                alt="Skill Intern Logo"
                                className="h-8 w-auto"
                                // Resetting filter for dark navy bg which fits the logo naturally if it has white text or adequate contrast
                                // If the logo is dark text only, it might need a white container or filter. 
                                // Assuming the user's logo works on dark or is adapted. 
                                // Adding a slight brightness boost just in case.
                                style={{ filter: "brightness(1.5)" }}
                            />
                        </Link>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Empowering learners with cutting-edge skills in tech. Join our community and master the future of coding today.
                        </p>
                        <div className="flex gap-4">

                            <a href="https://www.instagram.com/skillintern_official/#" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-primary transition-colors hover:text-white text-gray-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/skillintern/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-primary transition-colors hover:text-white text-gray-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.youtube.com/@SKILLINTERNHSR" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-full hover:bg-brand-primary transition-colors hover:text-white text-gray-300">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Programs */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Programs</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Full Stack Development
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Data Analytics
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Android & IOS App Development
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Artificial Intelligence
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/certificate" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Certificate Verification
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Reviews
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-300 hover:text-brand-primary transition-colors">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-300">
                                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                                <span>+91 82486 70255</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                                <span>Operation@skillintern.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700/50 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} SkillIntern. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
