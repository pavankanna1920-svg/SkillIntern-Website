"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Camera, BookOpen, Clock, Award, CheckCircle, Edit2, LogOut } from "lucide-react";
import ProfileStatCard from "@/components/Profile/ProfileStatCard";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
    // Mock User State
    const [user, setUser] = useState({
        name: "Test User",
        email: "testuser@gmail.com",
        phone: "+91 98765 43210",
        role: "Student",
        avatar: "https://github.com/shadcn.png"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(user);

    const handleSave = () => {
        setUser(editForm);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditForm(user);
        setIsEditing(false);
    };

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-500 mt-1">Manage your profile and track your learning progress.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <section className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
                            {/* Gradient Header */}
                            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                            <div className="px-8 pb-8 -mt-16 text-center">
                                {/* Avatar */}
                                <div className="relative w-32 h-32 mx-auto rounded-full border-[6px] border-white shadow-md overflow-hidden bg-white mb-4">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {!isEditing ? (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                                        <p className="text-gray-500 font-medium mb-8">{user.role}</p>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl text-left">
                                                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-700 font-medium text-sm break-all">{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl text-left">
                                                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                <span className="text-gray-700 font-medium text-sm">{user.phone}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full mt-8 flex items-center justify-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3.5 rounded-full transition-all shadow-lg shadow-purple-200 active:scale-95"
                                        >
                                            <Edit2 className="w-4 h-4" /> Edit Profile
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-4 text-left mt-2">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 ml-1 mb-1.5 block">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-gray-900 text-sm placeholder:text-gray-400"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 ml-1 mb-1.5 block">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={editForm.email}
                                                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-gray-900 text-sm placeholder:text-gray-400"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 ml-1 mb-1.5 block">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={editForm.phone}
                                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-gray-900 text-sm placeholder:text-gray-400"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                onClick={handleSave}
                                                className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-purple-200"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Stats & Courses */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Stats Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <ProfileStatCard
                                icon={BookOpen}
                                label="Total Courses"
                                value="2"
                                color="bg-blue-500"
                            />
                            <ProfileStatCard
                                icon={CheckCircle}
                                label="Completed"
                                value="1"
                                color="bg-green-500"
                            />
                            <ProfileStatCard
                                icon={Clock}
                                label="Hours Learned"
                                value="24"
                                color="bg-orange-500"
                            />
                            <ProfileStatCard
                                icon={Award}
                                label="Certificates"
                                value="1"
                                color="bg-purple-500"
                            />
                        </section>

                        {/* My Courses */}
                        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                                <Link href="/courses" className="text-sm font-bold text-purple-600 hover:text-purple-700">Explore More</Link>
                            </div>

                            <div className="space-y-4">
                                {/* Mock Course Item */}
                                <div className="border border-gray-100 rounded-2xl p-4 flex gap-4 hover:bg-gray-50 transition-colors group">
                                    <div className="w-32 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                                        <Image
                                            src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop"
                                            alt="Course"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">Full Stack Web Development</h3>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                            <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 font-medium">
                                            <span>75% Completed</span>
                                            <span>Last learned 2d ago</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center px-4">
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors">
                                            Continue
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-gray-100 rounded-2xl p-4 flex gap-4 hover:bg-gray-50 transition-colors group">
                                    <div className="w-32 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                                        <Image
                                            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
                                            alt="Course"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">Android & iOS App Development</h3>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                            <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500 font-medium">
                                            <span>0% Completed</span>
                                            <span>Not started</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center px-4">
                                        <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold px-6 py-2 rounded-lg transition-colors">
                                            Start
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
