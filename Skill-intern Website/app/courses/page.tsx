"use client";

import { useState } from "react";
import CourseHero from "@/components/Courses/CourseHero";
import SearchAndFilter from "@/components/Courses/SearchAndFilter";
import CourseCard from "@/components/Courses/CourseCard";
import { courses } from "@/lib/data";

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.tag === selectedCategory ||
            (selectedCategory === "Programming" && ["Web Design", "App Dev", "Cloud"].includes(course.tag || "")) ||
            (selectedCategory === "Technology" && ["Cloud", "Security", "AI", "Data"].includes(course.tag || "")) ||
            (selectedCategory === "Data Science" && ["Data", "AI", "Marketing"].includes(course.tag || "")) ||
            (selectedCategory === "AI & ML" && ["AI", "Data"].includes(course.tag || "")) ||
            (selectedCategory === "Mobile Dev" && ["App Dev"].includes(course.tag || ""));

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-gray-50">
            <CourseHero />
            <SearchAndFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-xl text-gray-600">No courses found matching your criteria.</h3>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
