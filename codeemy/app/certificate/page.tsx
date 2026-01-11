"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, CheckCircle, Award, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CertificatePage() {
    const [certificateId, setCertificateId] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        // Simulate verification delay
        setTimeout(() => setIsVerifying(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

                    {/* Left Column: Certificate Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                            {/* Certificate Mockup Visual */}
                            <div className="border-4 border-double border-blue-50 relative rounded-xl overflow-hidden aspect-[1.414/1] bg-white p-8 flex flex-col justify-between">
                                {/* Watermark Background */}
                                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                                    <Award className="w-96 h-96" />
                                </div>

                                {/* Header */}
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-brand-primary text-lg leading-tight">SkillIntern</h3>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Excellence in Education</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-16 bg-yellow-400 rounded-b-lg shadow-sm flex items-end justify-center pb-2">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center space-y-4 relative z-10 my-auto">
                                    <h2 className="text-3xl font-serif text-gray-900">Certificate of Completion</h2>
                                    <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full"></div>
                                    <p className="text-gray-500 text-sm">Proudly Presented to</p>
                                    <h1 className="text-4xl font-serif text-brand-primary italic">Sasikumar R</h1>
                                    <p className="text-xs text-center text-gray-600 max-w-sm mx-auto leading-relaxed mt-4">
                                        This is to certify that the above mentioned Candidate has successfully Completed his/her course in <span className="font-bold text-brand-primary">Full Stack Development</span> from 2025-01-15. During this course he/she showed diligence and consistency.
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-end relative z-10 pt-8">
                                    <div className="text-center">
                                        <div className="w-32 border-b border-gray-300 mb-2"></div>
                                        <p className="text-xs font-bold text-gray-800">Director</p>
                                        <p className="text-[10px] text-gray-500">SkillIntern Academy</p>
                                    </div>
                                    <div className="border-2 border-gray-900 p-1 bg-white">
                                        <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
                                            <span className="text-[8px] text-white text-center leading-tight">QR CODE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Verification Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-primary text-sm font-medium mb-6">
                            <Shield className="w-4 h-4" /> CertifyCheck
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Verify Your Certificate
                        </h1>
                        <p className="text-gray-500 mb-8 text-lg">
                            Check certificate authenticity instantly by entering the certificate ID.
                        </p>

                        <form onSubmit={handleVerify} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="certId" className="block text-sm font-medium text-gray-700">
                                    Certificate Number
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        id="certId"
                                        type="text"
                                        placeholder="e.g., CERT-2024-001"
                                        value={certificateId}
                                        onChange={(e) => setCertificateId(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-4 focus:ring-blue-50 outline-none transition-all text-gray-900 bg-gray-50 focus:bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isVerifying}
                                className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                {isVerifying ? (
                                    <>Verifying...</>
                                ) : (
                                    <>Verify Certificate <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-primary">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Verification</h3>
                        <p className="text-gray-500">
                            Advanced encryption ensures your certificate data is protected and tamper-proof.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-primary">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Results</h3>
                        <p className="text-gray-500">
                            Get immediate verification status for your certificates anytime, anywhere.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-primary">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Certificates</h3>
                        <p className="text-gray-500">
                            Verify only genuine certificates directly issued from our authorized institution.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
