"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Star, Clock, BookOpen, BarChart, CheckCircle,
    PlayCircle, Globe, Award, Smartphone, MonitorPlay,
    Shield, ChevronDown, ChevronUp
} from "lucide-react";
import { useParams } from "next/navigation";

// Real-world course data
const courses = [
    {
        id: "1",
        title: "Full Stack Web Development",
        description: "Master full stack web development from beginner to advanced with real-world projects in just 4 months.",
        rating: 4.8,
        reviews: "2,450+",
        students: "200+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "50% OFF",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Build responsive websites using HTML5, CSS3, and JavaScript",
            "Create interactive UIs with React.js",
            "Develop backend services with Node.js, Express.js, and MongoDB",
            "Deploy apps using GitHub, Netlify, and Vercel",
            "Build a complete Full Stack portfolio"
        ],
        syllabus: [
            { title: "Module 1: HTML & CSS Basics", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 2: Advanced CSS & Responsive Design", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 3: JavaScript Fundamentals", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Advanced JavaScript (ES6+)", duration: "2 Weeks", lessons: "8 Lessons" },
            { title: "Module 5: React.js Fundamentals", duration: "2 Weeks", lessons: "8 Lessons" },
            { title: "Module 6: State Management & Hooks", duration: "2 Weeks", lessons: "6 Lessons" },
            { title: "Module 7: Backend with Node.js & Express", duration: "2 Weeks", lessons: "8 Lessons" },
            { title: "Module 8: Database Management (MongoDB)", duration: "1 Week", lessons: "4 Lessons" },
            { title: "Module 9: API Development & Authentication", duration: "1 Week", lessons: "4 Lessons" },
            { title: "Module 10: Deployment & DevOps Basics", duration: "1 Week", lessons: "2 Lessons" },
            { title: "Module 11: Capstone Project Phase 1", duration: "1 Week", lessons: "Guided" },
            { title: "Module 12: Capstone Project Phase 2", duration: "1 Week", lessons: "Guided" },
        ]
    },
    {
        id: "2",
        title: "Cyber Security & Ethical Hacking",
        description: "Protect systems and networks by mastering ethical hacking, penetration testing, and modern cybersecurity practices.",
        rating: 4.9,
        reviews: "1,800+",
        students: "850+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Ethical Hacking Methodologies",
            "Network Security & Scanning",
            "Web Application Penetration Testing",
            "System Hacking & Vulnerability Analysis",
            "Cryptography & Security Operations"
        ],
        syllabus: [
            { title: "Module 1: Intro to Ethical Hacking", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 2: Networking Basics", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 3: Information Gathering", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Vulnerability Analysis", duration: "2 Weeks", lessons: "8 Lessons" },
            { title: "Module 5: System Hacking", duration: "2 Weeks", lessons: "8 Lessons" },
            { title: "Module 6: Web App Security", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 7: Wireless Network Hacking", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 8: Cryptography", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 9: Capstone CTF Project", duration: "2 Weeks", lessons: "Guided" }
        ]
    },
    {
        id: "3",
        title: "Android & iOS App Development",
        description: "Build powerful native and cross-platform mobile apps using Java, Kotlin, Swift, and React Native.",
        rating: 4.7,
        reviews: "1,500+",
        students: "950+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Java & Kotlin for Android",
            "Swift for iOS Development",
            "React Native Cross-Platform Dev",
            "Mobile UI/UX Design Principles",
            "App Store Deployment"
        ],
        syllabus: [
            { title: "Module 1: Mobile Dev Fundamentals", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 2: Android with Kotlin", duration: "3 Weeks", lessons: "15 Lessons" },
            { title: "Module 3: iOS with Swift", duration: "3 Weeks", lessons: "15 Lessons" },
            { title: "Module 4: React Native Basics", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 5: Advanced App Features", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 6: Capstone App Project", duration: "1 Week", lessons: "Guided" }
        ]
    },
    {
        id: "4",
        title: "Artificial Intelligence & ML",
        description: "Master core AI concepts including neural networks, natural language processing, computer vision, and intelligent systems.",
        rating: 4.9,
        reviews: "2,100+",
        students: "1,500+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Python for Data Science",
            "Machine Learning Algorithms",
            "Deep Learning & Neural Networks",
            "Natural Language Processing (NLP)",
            "Computer Vision Projects"
        ],
        syllabus: [
            { title: "Module 1: Python for AI", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 2: Statistics & Probability", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 3: Supervised Learning", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Unsupervised Learning", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 5: Deep Learning with TensorFlow", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 6: NLP & Computer Vision", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 7: Capstone AI Project", duration: "1 Week", lessons: "Guided" }
        ]
    },
    {
        id: "5",
        title: "Digital Marketing",
        description: "Learn to grow brands and businesses online through SEO, SEM, social media, content marketing, and analytics.",
        rating: 4.6,
        reviews: "3,000+",
        students: "2,000+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Search Engine Optimization (SEO)",
            "Social Media Marketing (SMM)",
            "Google Ads & PPC",
            "Content Strategy & Copywriting",
            "Email Marketing & Analytics"
        ],
        syllabus: [
            { title: "Module 1: Digital Marketing Landscape", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 2: SEO Mastery", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 3: Social Media Marketing", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Google Ads & SEM", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 5: Content & Email Marketing", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 6: Analytics & Strategy", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 7: Live Campaign Project", duration: "1 Week", lessons: "Guided" }
        ]
    },
    {
        id: "6",
        title: "Data Analytics",
        description: "Analyze, visualize, and interpret complex data using Excel, SQL, Tableau, and Python-based tools.",
        rating: 4.8,
        reviews: "1,800+",
        students: "1,100+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Advanced Excel & Dashboards",
            "SQL for Data Analysis",
            "Data Visualization with Tableau",
            "Python for Data Analytics",
            "Business Intelligence Concepts"
        ],
        syllabus: [
            { title: "Module 1: Excel for Analysts", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 2: SQL Fundamentals", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 3: Tableau Visualization", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Power BI Basics", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 5: Python Pandas & NumPy", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 6: Capstone Analytics Project", duration: "2 Weeks", lessons: "Guided" }
        ]
    },
    {
        id: "7",
        title: "AutoCAD & CATIA",
        description: "Master 2D and 3D design using AutoCAD and CATIA for industrial, architectural, and mechanical applications.",
        rating: 4.7,
        reviews: "900+",
        students: "600+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "2D Drafting with AutoCAD",
            "3D Modeling with AutoCAD",
            "CATIA Part Design",
            "Assembly & Surface Design",
            "Industrial Drafting Standards"
        ],
        syllabus: [
            { title: "Module 1: AutoCAD Interface & 2D", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 2: Advanced 2D & Isometric", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 3: 3D Modeling in AutoCAD", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Intro to CATIA", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 5: CATIA Part & Assembly", duration: "3 Weeks", lessons: "15 Lessons" },
            { title: "Module 6: Design Project", duration: "2 Weeks", lessons: "Guided" }
        ]
    },
    {
        id: "8",
        title: "AWS Cloud Computing",
        description: "Learn cloud fundamentals and develop, deploy, and manage scalable applications on AWS infrastructure.",
        rating: 4.9,
        reviews: "1,600+",
        students: "1,300+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Cloud Computing Concepts",
            "AWS Core Services (EC2, S3, RDS)",
            "IAM & Security",
            "Serverless Architecture (Lambda)",
            "DevOps on AWS"
        ],
        syllabus: [
            { title: "Module 1: Into to Cloud & AWS", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 2: EC2 & Compute", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 3: S3 & Storage", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 4: Databases & RDS", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 5: Networking & VPC", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 6: Serverless & Lambda", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 7: Capstone Cloud Project", duration: "2 Weeks", lessons: "Guided" }
        ]
    },
    {
        id: "9",
        title: "HR Analytics & Recruitment",
        description: "Use data-driven techniques to optimize recruitment, employee performance, and strategic HR decision-making.",
        rating: 4.5,
        reviews: "600+",
        students: "400+",
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        price: "₹14,999",
        originalPrice: "₹24,999",
        discount: "40% OFF",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Fundamentals of HR Analytics",
            "Recruitment Metrics & Strategy",
            "Employee Engagement Analytics",
            "Workforce Planning",
            "HR Data Visualization"
        ],
        syllabus: [
            { title: "Module 1: Intro to HR Analytics", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 2: Data Sources in HR", duration: "1 Week", lessons: "5 Lessons" },
            { title: "Module 3: Recruitment Analytics", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 4: Performance Management", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 5: Retention & Attrition", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 6: Dashboarding for HR", duration: "2 Weeks", lessons: "10 Lessons" },
            { title: "Module 7: Capstone HR Project", duration: "2 Weeks", lessons: "Guided" }
        ]
    }
];

export default function CourseDetailPage() {
    const params = useParams();
    // Handle potential array param (though simple dynamic route returns string)
    const courseId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const course = courses.find(c => c.id === courseId) || courses[0];

    const [openModule, setOpenModule] = useState<number | null>(0);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Hero Section */}
            <div className="bg-[#0B0518] text-white pt-12 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-sm mb-4">
                            <span className="bg-brand-primary/20 px-3 py-1 rounded-full">Course</span>
                            <span>{course.level}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{course.title}</h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-4 h-4 ${s <= Math.floor(course.rating) ? 'fill-current' : ''}`} />
                                    ))}
                                </div>
                                <span className="text-white font-bold">{course.rating}</span>
                                <span>({course.reviews} ratings)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                <span>English</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Last updated June 2024</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link href="/login" className="px-8 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-full transition-all shadow-lg shadow-brand-primary/25">
                                Enroll Now
                            </Link>
                            <div className="text-2xl font-bold">
                                {course.price} <span className="text-base font-normal text-gray-500 line-through ml-2">{course.originalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Overview Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.whatYouWillLearn.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-600">
                                        <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                                        <span className="leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Syllabus Accordion */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900">Course Syllabus</h2>
                                <p className="text-gray-500 mt-2">{course.lessons} • {course.duration} • {course.level}</p>
                            </div>
                            <div>
                                {course.syllabus.map((module, index) => (
                                    <div key={index} className="border-b border-gray-50 last:border-0">
                                        <button
                                            onClick={() => setOpenModule(openModule === index ? null : index)}
                                            className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${openModule === index ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className={`font-bold transition-colors ${openModule === index ? 'text-brand-primary' : 'text-gray-900'}`}>{module.title}</h3>
                                                    <p className="text-xs text-gray-400 mt-1">{module.duration}</p>
                                                </div>
                                            </div>
                                            {openModule === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                        </button>

                                        {openModule === index && (
                                            <div className="px-6 pb-6 pt-2 ml-14">
                                                <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                                    <PlayCircle className="w-4 h-4 text-brand-primary" />
                                                    {module.lessons}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                <li>No prior programming experience required.</li>
                                <li>A computer with internet access.</li>
                                <li>Willingness to learn and practice.</li>
                            </ul>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* Video Preview / Main Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="h-48 relative flex items-center justify-center group cursor-pointer overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform relative z-10">
                                        <PlayCircle className="w-8 h-8 text-white fill-current" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white text-center text-sm font-bold bg-black/40 py-2 rounded-lg backdrop-blur-sm relative z-10">
                                        Preview this course
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-end gap-3 mb-6">
                                        <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                                        <span className="text-lg text-gray-400 line-through mb-1">{course.originalPrice}</span>
                                        <span className="text-sm font-bold text-red-500 mb-1.5">{course.discount}</span>
                                    </div>

                                    <Link href="/login" className="block w-full py-3.5 bg-brand-primary hover:bg-brand-secondary text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-primary/20 text-center mb-4">
                                        Enroll Now
                                    </Link>
                                    <button className="block w-full py-3.5 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-xl hover:border-brand-primary hover:text-brand-primary transition-all text-center">
                                        Download Syllabus
                                    </button>

                                    <div className="mt-8 space-y-4">
                                        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">This course includes:</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <MonitorPlay className="w-5 h-5 text-gray-400" />
                                                <span>{course.duration} of on-demand video</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <BookOpen className="w-5 h-5 text-gray-400" />
                                                <span>{course.lessons}</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <Smartphone className="w-5 h-5 text-gray-400" />
                                                <span>Access on Mobile and TV</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <Award className="w-5 h-5 text-gray-400" />
                                                <span>Certificate of completion</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                                <Shield className="w-5 h-5 text-gray-400" />
                                                <span>24/7 Support access</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Author Card (Simplified) */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4">Training Partner</h4>
                                <div className="flex items-center gap-4">
                                    <img src="/logo.png" alt="SkillIntern" className="h-10 w-auto" />
                                    <div>
                                        <div className="font-bold text-sm">SkillIntern Academy</div>
                                        <div className="text-xs text-gray-500">Official Partner</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
