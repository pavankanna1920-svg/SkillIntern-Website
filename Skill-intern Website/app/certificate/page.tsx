"use client";

import Image from "next/image";
import { useState } from "react";
import { Shield, Zap, Award, CheckCircle } from "lucide-react";

export default function CertificatePage() {
    const [certificateId, setCertificateId] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        // Simulate verification delay
        setTimeout(() => {
            setIsVerifying(false);
            alert(`Verifying certificate: ${certificateId}`);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">

                    {/* Left: Certificate Preview */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-500">
                            <div className="relative aspect-[1.414/1] w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                                {/* Placeholder for certificate image */}
                                <Image
                                    src="/images/certificate_cyber_security.jpg"
                                    alt="Certificate Preview"
                                    fill
                                    className="object-cover opacity-80"
                                />

                            </div>
                        </div>
                    </div>

                    {/* Right: Verification Form */}
                    <div className="lg:pl-10">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                                <CheckCircle className="w-4 h-4" />
                                CertifyCheck
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Certificate</h1>
                            <p className="text-gray-500 mb-8">Enter your unique certificate ID to verify authenticity and view credential details.</p>

                            <form onSubmit={handleVerify} className="space-y-4">
                                <div>
                                    <label htmlFor="cert-id" className="block text-sm font-bold text-gray-700 mb-2">Certificate ID</label>
                                    <input
                                        type="text"
                                        id="cert-id"
                                        value={certificateId}
                                        onChange={(e) => setCertificateId(e.target.value)}
                                        placeholder="e.g. CERT-2024-001"
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isVerifying}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isVerifying ? (
                                        <>Verifying...</>
                                    ) : (
                                        <>Verify Certificate <CheckCircle className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                            <div className="mt-6 text-center">
                                <p className="text-xs text-gray-400">Secure • Encrypted • Instant Verification</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-default group">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Verification</h3>
                        <p className="text-gray-500">Our verification process uses 256-bit encryption to ensure data integrity and privacy.</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-default group">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Results</h3>
                        <p className="text-gray-500">Get immediate confirmation of certificate validity with our real-time database check.</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-default group">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Authentic Certification</h3>
                        <p className="text-gray-500">All certificates are digitally signed and trackable to prevent forgery and ensure authenticity.</p>
                    </div>
                </div>

            </div>
        </main>
    );
}
