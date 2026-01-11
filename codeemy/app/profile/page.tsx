"use client";

import { Edit2, BookOpen, Clock, Award, Shield, User, Mail, Phone, Camera, Save, X } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Sasikumar R",
        role: "Student",
        email: "user@example.com",
        phone: "+91 98765 43210",
        avatar: "S"
    });

    const [tempUser, setTempUser] = useState(user);

    const handleEdit = () => {
        setTempUser(user);
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser(tempUser);
        setIsEditing(false);
        // In a real app, here you would make an API call to save the data
    };

    const handleCancel = () => {
        setTempUser(user);
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Banner */}
            <div className="bg-[#437FA4] h-60 relative">
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col justify-center h-full text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
                    <p className="text-blue-100/90 text-lg">Manage your account and track your learning progress.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            <div className="p-8 flex flex-col items-center border-b border-gray-100">
                                <div className="w-32 h-32 rounded-full p-1 bg-white border-2 border-dashed border-gray-200 shadow-sm relative mb-4 flex items-center justify-center group">
                                    <div className="w-full h-full rounded-full bg-blue-50 flex items-center justify-center text-4xl font-bold text-brand-primary overflow-hidden">
                                        {user.avatar}
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2.5 bg-brand-primary text-white rounded-full hover:bg-brand-secondary transition-colors shadow-md cursor-pointer border-2 border-white">
                                        {isEditing ? <Camera className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                                    </button>
                                </div>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={tempUser.name}
                                        onChange={handleChange}
                                        className="text-xl font-bold text-gray-900 text-center border-b-2 border-blue-200 focus:border-brand-primary outline-none bg-transparent px-2 py-1 w-full"
                                    />
                                ) : (
                                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                                )}

                                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-brand-primary text-[11px] font-bold mt-3 uppercase tracking-wider">
                                    {user.role}
                                </span>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="group">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                                    <div className="flex items-center gap-3 text-gray-700 font-semibold group-hover:text-brand-primary transition-colors">
                                        <User className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors flex-shrink-0" />
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={tempUser.name}
                                                onChange={handleChange}
                                                className="w-full border-b border-gray-200 focus:border-brand-primary outline-none text-gray-900 bg-transparent py-0.5"
                                            />
                                        ) : (
                                            <span>{user.name}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                                    <div className="flex items-center gap-3 text-gray-700 font-semibold group-hover:text-brand-primary transition-colors">
                                        <Mail className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors flex-shrink-0" />
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={tempUser.email}
                                                onChange={handleChange}
                                                className="w-full border-b border-gray-200 focus:border-brand-primary outline-none text-gray-900 bg-transparent py-0.5"
                                            />
                                        ) : (
                                            <span>{user.email}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                                    <div className="flex items-center gap-3 text-gray-700 font-semibold group-hover:text-brand-primary transition-colors">
                                        <Phone className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors flex-shrink-0" />
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={tempUser.phone}
                                                onChange={handleChange}
                                                className="w-full border-b border-gray-200 focus:border-brand-primary outline-none text-gray-900 bg-transparent py-0.5"
                                            />
                                        ) : (
                                            <span>{user.phone}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm tracking-wide"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 py-3.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-blue-900/10 text-sm tracking-wide flex justify-center items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" /> Save
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleEdit}
                                        className="w-full py-3.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-blue-900/10 text-sm tracking-wide"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Learning Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Total Courses", value: "2", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
                                { label: "Completed", value: "1", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-50" },
                                { label: "Hours Learned", value: "45", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
                                { label: "Certificates", value: "1", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
                            ].map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-default">
                                    <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* My Courses Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
                                <div className="text-sm font-medium text-gray-400">
                                    0 Courses Enrolled
                                </div>
                            </div>

                            {/* Empty State / Content */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <BookOpen className="w-8 h-8 text-gray-300" />
                                </div>
                                <h4 className="text-gray-900 font-bold text-lg mb-2">No Courses Enrolled Yet</h4>
                                <p className="text-gray-500 max-w-sm mb-8 text-sm leading-relaxed">
                                    Start your learning journey today by exploring our wide range of industry-ready courses.
                                </p>
                                <a href="/courses" className="px-8 py-3 rounded-full border-2 border-gray-200 font-bold text-gray-600 hover:border-brand-primary hover:text-brand-primary transition-all text-sm">
                                    Browse Courses
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
