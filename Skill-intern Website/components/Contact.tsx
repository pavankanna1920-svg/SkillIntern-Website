"use client";

import { Phone, Mail, MapPin, Globe, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-[#0f1025] relative overflow-hidden min-h-screen flex items-center">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 -z-10"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Contact Us</span> <span className="text-purple-500">–</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Let’s Connect!</span>
                    </h2>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6 shadow-lg shadow-purple-500/50"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side: Contact Info Cards */}
                    <div className="grid gap-8 content-center h-full">
                        <ContactCard
                            icon={<Phone className="w-6 h-6" />}
                            title="Phone"
                            value="+91 8248670255"
                        />
                        <ContactCard
                            icon={<Mail className="w-6 h-6" />}
                            title="Email"
                            value="Operation@skillintern.in"
                        />
                        <ContactCard
                            icon={<MapPin className="w-6 h-6" />}
                            title="Office"
                            value="VIDHYAPEET SKILL INTERN PRIVATE LIMITED, Third Floor, Flat No. 434, J R Arcade, 17th Cross, 19th Main, Sector–4, HSR Layout, Bengaluru – 560102"
                        />
                        <ContactCard
                            icon={<Globe className="w-6 h-6" />}
                            title="Website"
                            value="www.skillintern.in"
                        />
                    </div>

                    {/* Right Side: Glassmorphic Form */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-25"></div>
                        <div className="bg-[#1a1c35]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative z-10">
                            <h3 className="text-3xl font-bold text-white text-center mb-8">Get In Touch</h3>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                                    />
                                    <input
                                        type="text"
                                        placeholder="College Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Year (e.g., 2nd year)"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Interested Domain"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium"
                                    />
                                </div>

                                <div>
                                    <textarea
                                        rows={4}
                                        placeholder="Your Query (Optional)"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>

                                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg shadow-purple-500/25 mt-2">
                                    Submit Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
    return (
        <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
                <p className="text-gray-400 text-sm">{value}</p>
            </div>
        </div>
    )
}
