"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Search, Filter } from "lucide-react";

// Real-world course data from codeemy.in
const courses = [
    {
        id: "1",
        title: "Full Stack Web Development",
        category: "Programming",
        rating: 4.8,
        students: 1200,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "2",
        title: "Cyber Security & Ethical Hacking",
        category: "Technology",
        rating: 4.9,
        students: 850,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "3",
        title: "Android & iOS App Development",
        category: "Mobile Dev",
        rating: 4.7,
        students: 950,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "4",
        title: "Artificial Intelligence (AI)",
        category: "AI & ML",
        rating: 4.9,
        students: 1500,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "5",
        title: "Digital Marketing",
        category: "Technology",
        rating: 4.6,
        students: 2000,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "6",
        title: "Data Analytics",
        category: "Data Science",
        rating: 4.8,
        students: 1100,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "7",
        title: "AutoCAD & CATIA",
        category: "Design",
        rating: 4.7,
        students: 600,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "8",
        title: "AWS Cloud Computing",
        category: "Cloud",
        rating: 4.9,
        students: 1300,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    },
    {
        id: "9",
        title: "HR Analytics & Recruitment",
        category: "Management",
        rating: 4.5,
        students: 400,
        duration: "120 Hours",
        lessons: "60 Lessons",
        level: "Beginner to Advanced",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        price: "₹14,999",
        originalPrice: "₹25,000"
    }
];

const categories = ["All", "Programming", "Technology", "AI & ML", "Data Science", "Mobile Dev", "Cloud", "Design", "Management"];

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Explore Our <span className="text-brand-primary">Courses</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Master in-demand skills with our industry-designed courses. From coding to management, we have everything you need to succeed.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary sm:text-sm shadow-sm transition-all hover:shadow-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category Filter (Desktop) */}
                    <div className="hidden md:flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === category
                                    ? "bg-brand-primary text-white shadow-md shadow-blue-500/30"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Filter (Mobile) */}
                <div className="md:hidden overflow-x-auto pb-4 mb-6 -mx-4 px-4 flex gap-2 no-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === category
                                ? "bg-brand-primary text-white shadow-md"
                                : "bg-white text-gray-600 border border-gray-100"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>


                {/* Courses Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
                            <Filter className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                            className="mt-6 text-brand-primary font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
